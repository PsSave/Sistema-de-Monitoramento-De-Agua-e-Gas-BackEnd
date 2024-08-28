# Use a imagem base Node.js 22.5.0
FROM node:22.5.0-alpine

# Set the working directory
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação vai rodar (por exemplo, 3000)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
