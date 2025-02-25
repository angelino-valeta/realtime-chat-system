const WebSocket = require('ws')
const redis = require('redis')
const jwt = require('jsonwebtoken')
const { isMember } = require('./roomService')
const { saveMessage } = require('./messageService')
const { notifyRoomMembers } = require('./pushService')

const redisPublisher = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
const redisSubscriber = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws, req) => {
    const token = req.url.split('token=')[1]
    let user
    try {
      user = jwt.verify(token, process.env.JWT_SECRET)
    } catch {
      ws.close(1008, 'Token inválido')
      return
    }
    ws.user = user

    ws.on('message', async (message) => {
      const data = JSON.parse(message)
      const { roomId, content } = data

      if (!(await isMember(roomId, user.id))) return

      const savedMessage = await saveMessage(roomId, user.id, content)
      const msg = {
        type: 'chat',
        username: user.username,
        content,
        roomId,
        timestamp: savedMessage.created_at.toISOString(),
      };
      await redisPublisher.publish(`chat:${roomId}`, JSON.stringify(msg))

      // Notificar membros via push
      await notifyRoomMembers(roomId, user.id, {
        title: `${user.username} enviou uma mensagem`,
        body: content,
      })
    })

    ws.on('close', () => console.log(`${user.username} desconectado`))
  })

  redisSubscriber.on('message', (channel, message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  redisSubscriber.psubscribe('chat:*')
}

module.exports = { setupWebSocket }