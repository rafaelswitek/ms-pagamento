# Use uma imagem base Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Exponha a porta que sua aplicação Node.js está usando (substitua a porta conforme necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
