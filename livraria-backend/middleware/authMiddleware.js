// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Verifica se o token está presente no cabeçalho Authorization
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  // Verifica se o token é válido
  try {
    const decodedToken = jwt.verify(token.split(' ')[1], 'secreta'); // 'secreta' é a chave secreta usada para assinar o token
    req.userData = decodedToken; // Adiciona os dados do usuário decodificados ao objeto de solicitação para uso posterior
    next(); // Permite que a requisição prossiga para o próximo middleware ou controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
}

module.exports = authenticateToken;
