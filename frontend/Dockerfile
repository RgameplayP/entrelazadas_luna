# Etapa 1: Construcción
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Pasar la variable de entorno al build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de nginx (si tienes)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]