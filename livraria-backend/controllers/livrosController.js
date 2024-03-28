// controllers/livrosController.js

const Livro = require('../models/Livro');

exports.listarLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (error) {
    console.error('Erro ao listar os livros', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.adicionarLivro = async (req, res) => {
  const { titulo, autor, ano } = req.body;
  try {
    const livro = await Livro.create({ titulo, autor, ano });
    res.status(201).json(livro);
  } catch (error) {
    console.error('Erro ao adicionar o livro', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.atualizarLivro = async (req, res) => {
  const { id } = req.params; // Obtém o ID do livro a ser atualizado
  const { titulo, autor, ano } = req.body; // Obtém os novos dados do livro
  try {
    // Busca o livro pelo ID
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    // Atualiza o livro com os novos dados
    livro.titulo = titulo;
    livro.autor = autor;
    livro.ano = ano;
    await livro.save(); // Salva as alterações no banco de dados
    res.json(livro); // Retorna o livro atualizado
  } catch (error) {
    console.error('Erro ao atualizar o livro', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
