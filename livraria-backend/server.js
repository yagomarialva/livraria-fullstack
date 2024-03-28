// server.js

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const livrosRoutes = require('./routes/livrosRoutes');
const sequelize = require('./config/database');
const cors = require('cors'); // Importe o pacote 'cors'


const app = express();

// Configurar o middleware CORS para permitir solicitações de qualquer origem
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use('/livros', livrosRoutes);
app.use('/api/auth', authRoutes);
// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Livraria!'); // Envie uma mensagem de boas-vindas
});

// Sincroniza o modelo com o banco de dados e inicia o servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
