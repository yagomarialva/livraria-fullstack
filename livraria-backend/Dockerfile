# Use a imagem oficial do Node.js
FROM node:latest

# Crie e defina o diretório de trabalho da aplicação
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Instale o pacote 'cors'
RUN npm install cors


# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que o servidor da aplicação está rodando
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
