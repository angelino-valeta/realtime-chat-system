const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, hashedPassword]
  )
  return result.rows[0]
}


const login = async (username, password) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
  const user = result.rows[0]
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas')
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return { token, user: { id: user.id, username: user.username } }
}

module.exports = { register, login }