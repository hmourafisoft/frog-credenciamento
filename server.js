const express = require('express');
const path = require('path');
const app = express();

// Serve os arquivos estáticos da pasta dist/demo1
app.use(express.static(path.join(__dirname, 'dist/demo1')));

// Redireciona todas as requisições para o arquivo index.html com tratamento de erros
app.get('*', (req, res, next) => {
  const filePath = path.join(__dirname, 'dist/demo1/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Erro ao servir index.html:', err);
      res.status(500).send('Erro interno do servidor');
    }
  });
});

// Define a porta e ambiente
const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  console.log('Ambiente de desenvolvimento');
} else {
  console.log('Ambiente de produção');
}

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
