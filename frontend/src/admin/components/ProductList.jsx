import { useState } from 'react';
import '../admin.css';

function ProductList({ productos, onEdit, onDelete }) {
  const [eliminando, setEliminando] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setEliminando(id);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const response = await fetch(`${API_URL}/api/productos/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          onDelete();
        } else {
          alert('Error al eliminar');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
      }
      setEliminando(null);
    }
  };

  if (productos.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        textAlign: 'center',
        color: '#666'
      }}>
        No hay productos aún. ¡Crea tu primer producto!
      </div>
    );
  }

  return (
    <div className="admin-products-grid">
      {productos.map(producto => (
        <div key={producto.id} className="admin-product-card">
          {producto.imagenes && producto.imagenes[0] && (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Sin+imagen';
              }}
            />
          )}
          <div className="admin-product-card-content">
            <h4>{producto.nombre}</h4>
            <p className="price">{producto.categoria} - {producto.precio} Bs</p>
            <p className="description">
              {producto.descripcion && producto.descripcion.substring(0, 80)}...
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onEdit(producto)}
                className="admin-button-edit"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(producto.id)}
                disabled={eliminando === producto.id}
                className="admin-button-delete"
              >
                {eliminando === producto.id ? '...' : '🗑️ Eliminar'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;