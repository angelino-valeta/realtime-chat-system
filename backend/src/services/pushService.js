const webPush = require('web-push')
const pool = require('../config/db')
require('dotenv').config()

webPush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const saveSubscription = async (userId, subscription) => {
  await pool.query(
    'INSERT INTO push_subscriptions (user_id, subscription) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET subscription = $2',
    [userId, JSON.stringify(subscription)]
  )
}

const sendPushNotification = async (userId, payload) => {
  const result = await pool.query('SELECT subscription FROM push_subscriptions WHERE user_id = $1', [userId])
  const subscription = result.rows[0]?.subscription
  if (subscription) {
    await webPush.sendNotification(subscription, JSON.stringify(payload)).catch(console.error)
  }
};

const notifyRoomMembers = async (roomId, excludeUserId, payload) => {
  const members = await pool.query('SELECT user_id FROM room_members WHERE room_id = $1 AND user_id != $2', [roomId, excludeUserId])
  members.rows.forEach((member) => sendPushNotification(member.user_id, payload))
};

module.exports = { saveSubscription, sendPushNotification, notifyRoomMembers }