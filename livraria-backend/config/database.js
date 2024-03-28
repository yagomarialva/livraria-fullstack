const { Sequelize } = require('sequelize');

module.exports = new Sequelize('livraria', 'admin', 'admin', {
  host: 'postgres', // Este deve ser o nome do serviço do contêiner do PostgreSQL no Docker Compose
  dialect: 'postgres',
});
