const pool = require('../config/db')

const createRoom = async (name, isPrivate, userId) => {
  const result = await pool.query('INSERT INTO rooms (name, is_private) VALUES ($1, $2) RETURNING *', [name, isPrivate])
  const room = result.rows[0]
  await pool.query('INSERT INTO room_members (room_id, user_id) VALUES ($1, $2)', [room.id, userId])
  return room
}

const joinRoom = async (roomId, userId) => {
  const room = await pool.query('SELECT * FROM rooms WHERE id = $1', [roomId])
  if (!room.rows[0]) throw new Error('Sala não encontrada')
  await pool.query('INSERT INTO room_members (room_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [roomId, userId])
  return room.rows[0]
}

const getRooms = async (userId) => {
  const result = await pool.query(
    'SELECT r.* FROM rooms r LEFT JOIN room_members rm ON r.id = rm.room_id WHERE r.is_private = FALSE OR rm.user_id = $1',
    [userId]
  );
  return result.rows;
};

const isMember = async (roomId, userId) => {
  const result = await pool.query('SELECT 1 FROM room_members WHERE room_id = $1 AND user_id = $2', [roomId, userId]);
  return result.rows.length > 0;
};

module.exports = { createRoom, joinRoom, getRooms, isMember }