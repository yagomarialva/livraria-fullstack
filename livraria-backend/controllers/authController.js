// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Função para fazer login
async function login(req, res) {
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
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
}

module.exports = { login };
