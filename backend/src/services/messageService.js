const pool = require('../config/db');

const saveMessage = async (roomId, userId, content) => {
  const result = await pool.query(
    'INSERT INTO messages (room_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
    [roomId, userId, content]
  );
  return result.rows[0];
};

const getMessages = async (roomId) => {
  const result = await pool.query(
    'SELECT m.content, u.username, m.created_at FROM messages m JOIN users u ON m.user_id = u.id WHERE m.room_id = $1 ORDER BY m.created_at',
    [roomId]
  );
  return result.rows;
};

module.exports = { saveMessage, getMessages };