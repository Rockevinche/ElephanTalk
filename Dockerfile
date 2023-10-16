# Use la imagen oficial de Node.js 14
FROM node:14

# Establezca el directorio de trabajo en el contenedor
WORKDIR /app

# Copie el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instale las dependencias
RUN npm install

# Copie todos los archivos de la aplicación al contenedor
COPY . .

# Construya la aplicación
RUN npm run build

# Comando para iniciar la aplicación
CMD ["npm", "start"]
