// routes/livrosRoutes.js

const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para listar livros (requer autenticação)
router.get('/', authMiddleware, livrosController.listarLivros);

// Rota para adicionar livro (requer autenticação)
router.post('/', authMiddleware, livrosController.adicionarLivro);

// Rota para adicionar livro (requer autenticação)
router.post('/', authMiddleware, livrosController.atualizarLivro);

module.exports = router;
