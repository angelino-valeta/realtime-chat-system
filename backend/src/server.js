const express = require('express');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const pushRoutes = require('./routes/pushRoutes');
const { setupWebSocket } = require('./services/websocketService');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('../frontend/dist')); // Servir frontend

app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/push', pushRoutes);

// setupWebSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});