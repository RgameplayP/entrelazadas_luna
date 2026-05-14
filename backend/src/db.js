const { Pool } = require('pg');
require('dotenv').config();

// Configuración que funciona en desarrollo local y producción
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: process.env.DB_HOST || 'postgres',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'tienda_artesanal',
        port: 5432,
      }
);

module.exports = pool;