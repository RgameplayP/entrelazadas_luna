# Etapa 1: Construcción
FROM node:20-alpine as build

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Variables de entorno para el build (se pasan desde docker-compose)
ARG VITE_API_URL
ARG VITE_CLOUD_NAME
ARG VITE_ENABLE_LOGS
ARG VITE_ENABLE_DEBUG

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLOUD_NAME=$VITE_CLOUD_NAME
ENV VITE_ENABLE_LOGS=$VITE_ENABLE_LOGS
ENV VITE_ENABLE_DEBUG=$VITE_ENABLE_DEBUG

# Construir la app
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de nginx para SPA (evita errores 404)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api { \
        proxy_pass http://backend:5000; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]