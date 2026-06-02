# Etapa 1: Construcción
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variables de entorno para el build
ARG VITE_API_URL
ARG VITE_CLOUD_NAME
ARG VITE_ENABLE_LOGS
ARG VITE_ENABLE_DEBUG

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLOUD_NAME=$VITE_CLOUD_NAME
ENV VITE_ENABLE_LOGS=$VITE_ENABLE_LOGS
ENV VITE_ENABLE_DEBUG=$VITE_ENABLE_DEBUG

RUN npm run build

# Etapa 2: Servir con nginx (SIN proxy al backend)
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Configuración simple de nginx - solo sirve archivos estáticos
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]