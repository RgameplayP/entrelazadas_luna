import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const cargarProductos = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/productos`);
      const data = await response.json();
      setProductos(data);
      setCargando(false);
    } catch (error) {
      console.error('Error:', error);
      setCargando(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      // 🔧 FIX: Definir API_URL dentro de esta función
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      console.log('🔍 Cargando categorías desde:', `${API_URL}/api/categorias`);
      const response = await fetch(`${API_URL}/api/categorias`);
      const data = await response.json();
      console.log('✅ Categorías cargadas:', data);
      setCategorias(data);
    } catch (error) {
      console.error('❌ Error cargando categorías:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin';
  };

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      {/* Header del Admin */}
      <div style={{
        backgroundColor: '#5C3A1E',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h2 style={{ margin: 0 }}>Panel de Administración - Entrelazadas de Luna</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#A0522D',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {/* Formulario para agregar/editar productos */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#5C3A1E', marginBottom: '20px' }}>
            {editandoProducto ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
          </h3>
          <ProductForm
            productoEdit={editandoProducto}
            categorias={categorias}
            onSave={() => {
              setEditandoProducto(null);
              cargarProductos();
            }}
            onCancel={() => setEditandoProducto(null)}
          />
        </div>

        {/* Lista de productos */}
        <div>
          <h3 style={{ color: '#5C3A1E', marginBottom: '20px' }}>
            📦 Productos Existentes ({productos.length})
          </h3>
          {cargando ? (
            <p>Cargando productos...</p>
          ) : (
            <ProductList
              productos={productos}
              onEdit={(producto) => setEditandoProducto(producto)}
              onDelete={() => cargarProductos()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;