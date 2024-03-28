const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Rota para registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
    // Cria um novo usuário
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      // Verifica se o usuário existe
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      // Verifica se a senha está correta
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      // Gera um token JWT
      const token = jwt.sign({ id: user.id }, 'secreta', { expiresIn: '1h' });
      // Envie o token JWT de volta para o cliente
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao fazer login' });
    }
  });

module.exports = router;
