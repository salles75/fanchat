# 💬 FanChat - com Node.js

# Funcionalidades Implementadas

# Atividade 1 – Registro de Mensagens (`chat.log`)

- Todas as mensagens enviadas pelos usuários são registradas em um arquivo `.txt`;
- Formato dos registros:
  ```
  [YYYY-MM-DD HH:MM:SS] NomeDoUsuário: Mensagem
  ```
- As mensagens são adicionadas ao final do arquivo (`append`);
- Foi criada uma função dedicada para o registro automático.

# Atividade 2 – Validação de Nomes de Usuário

- Impede nomes de usuário vazios;
- Bloqueia nomes já utilizados por outro usuário conectado;
- Retorna mensagens informando se o nome foi aceito ou rejeitado;
- Remove o nome da lista de usuários ativos ao desconectar.

## 🛠️ Como Executar o Projeto

1. **Clone este repositório:**

   git clone https://github.com/seu-usuario/fanchat.git
   cd fanchat

2. **Instale as dependências:**

   No terminal:
   npm install express socket.io

3. **Inicie o servidor:**

   No Terminal:
   node server.js

4. **Acesse o chat pelo navegador:**
   - Vá até `http://localhost:3000`
   - Digite um nome válido para entrar
   - Envie e visualize mensagens em tempo real
