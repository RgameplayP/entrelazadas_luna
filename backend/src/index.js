const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== RUTAS DE PRUEBA =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando' });
});

// ===== RUTAS DE CATEGORÍAS =====
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== RUTAS DE PRODUCTOS =====

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria 
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      ORDER BY p.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria 
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos por categoría
app.get('/api/productos/categoria/:categoria', async (req, res) => {
  const { categoria } = req.params;
  try {
    const result = await pool.query(`
      SELECT p.* FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE c.nombre = $1
    `, [categoria]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
});

// Crear producto (con descripcion_larga)
app.post('/api/productos', async (req, res) => {
  const { nombre, categoria_id, precio, descripcion, descripcion_larga, imagenes } = req.body;
  console.log('📝 Creando producto:', { nombre, categoria_id, precio, descripcion, descripcion_larga: descripcion_larga ? 'SÍ' : 'NO' });
  try {
    const result = await pool.query(
      `INSERT INTO productos (nombre, categoria_id, precio, descripcion, descripcion_larga, imagenes) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, categoria_id, precio, descripcion, descripcion_larga || '', imagenes || []]
    );
    console.log('✅ Producto creado:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar producto (con descripcion_larga)
app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria_id, precio, descripcion, descripcion_larga, imagenes } = req.body;
  console.log('✏️ Actualizando producto ID:', id, 'descripcion_larga:', descripcion_larga ? 'SÍ' : 'NO');
  try {
    const result = await pool.query(
      `UPDATE productos 
       SET nombre=$1, categoria_id=$2, precio=$3, descripcion=$4, descripcion_larga=$5, imagenes=$6 
       WHERE id=$7 RETURNING *`,
      [nombre, categoria_id, precio, descripcion, descripcion_larga || '', imagenes || [], id]
    );
    console.log('✅ Producto actualizado:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM productos WHERE id=$1', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
