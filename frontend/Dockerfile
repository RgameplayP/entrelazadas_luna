# Etapa 1: Construcción - USAR NODE 20
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (nginx)
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]