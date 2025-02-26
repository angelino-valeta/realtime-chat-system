const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createRoom, joinRoom, getRooms } = require('../services/roomService')
const { getMessages } = require('../services/messageService')

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { name, isPrivate } = req.body;
  const room = await createRoom(name, isPrivate, req.user.id);
  res.json(room);
});

router.post('/:id/join', authMiddleware, async (req, res) => {
  const room = await joinRoom(req.params.id, req.user.id);
  res.json({ message: 'Entrou na sala', room });
});

router.get('/', authMiddleware, async (req, res) => {
  const rooms = await getRooms(req.user.id);
  res.json(rooms);
});

router.get('/:id/messages', authMiddleware, async (req, res) => {
  const messages = await getMessages(req.params.id);
  res.json(messages);
});

module.exports = router;