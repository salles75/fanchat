const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir o index.html direto na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Caminho do arquivo de log
const logPath = path.join(__dirname, 'chat.log');
const usuariosConectados = new Set();

function registrarMensagem(usuario, mensagem) {
  const now = new Date();
  const timestamp = now.toLocaleString('pt-BR', {
    timeZone: 'America/Bahia',
    hour12: false
  }).replace(',', '');
  const linha = `[${timestamp}] ${usuario}: ${mensagem}\n`;
  fs.appendFileSync(logPath, linha, 'utf8');
}

io.on('connection', (socket) => {
  let nomeUsuario = '';

  socket.on('validar_nome', (nome) => {
    if (!nome.trim()) {
      socket.emit('nome_invalido', 'Nome de usuário não pode ser vazio.');
    } else if (usuariosConectados.has(nome)) {
      socket.emit('nome_invalido', 'Nome de usuário já está em uso.');
    } else {
      nomeUsuario = nome;
      usuariosConectados.add(nome);
      socket.emit('nome_valido', '✅ Nome aceito.');
      io.emit('usuario_entrou', nomeUsuario);
    }
  });

  socket.on('mensagem', (mensagem) => {
    if (nomeUsuario) {
      registrarMensagem(nomeUsuario, mensagem);
      io.emit('mensagem', { usuario: nomeUsuario, mensagem });
    }
  });

  socket.on('disconnect', () => {
    if (nomeUsuario) {
      usuariosConectados.delete(nomeUsuario);
      io.emit('usuario_saiu', nomeUsuario);
    }
  });
});

server.listen(3000, () => {
  console.log('✅ Servidor rodando em http://localhost:3000');
});