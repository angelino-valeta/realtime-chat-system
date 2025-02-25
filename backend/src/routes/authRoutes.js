const express = require('express')
const { register, login } = require('../server/authService')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body.username, req.body.password)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.password)
    res.json(result)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

module.exports = router