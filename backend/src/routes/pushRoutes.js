const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { saveSubscription } = require('../services/pushService')

const router = express.Router()

router.post('/subscribe', authMiddleware, async (req, res) => {
  await saveSubscription(req.user.id, req.body)
  res.status(201).json({ message: 'Assinatura salva' })
})

module.exports = router