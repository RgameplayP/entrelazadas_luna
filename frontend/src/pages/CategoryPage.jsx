import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useTheme } from '../context/ThemeContext';

function CategoryPage() {
  const { categoryName } = useParams();
  const { tema } = useTheme();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  let categoryCapitalized = '';
  if (categoryName === 'todos') {
    categoryCapitalized = 'Todos los Productos';
  } else {
    categoryCapitalized = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  }

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    fetch(`${API_URL}/api/productos`)
      .then(res => res.json())
      .then(data => {
        let filtered;
        if (categoryName === 'todos') {
          filtered = data;
        } else {
          filtered = data.filter(p => p.categoria.toLowerCase() === categoryName.toLowerCase());
        }
        setFilteredProducts(filtered);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setCargando(false);
      });
  }, [categoryName]);

  const handleWhatsApp = (producto) => {
    const precioLimpio = producto.precio ? producto.precio.replace('€', '').trim() : producto.precio;
    const mensaje = `Hola, me interesa: ${producto.nombre} - ${precioLimpio} Bs`;
    window.open(`https://wa.me/59170000000?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: 'clamp(20px, 10vw, 40px)', backgroundColor: tema === 'dark' ? '#1a1a1a' : '#F5F0E8' }}>
        <div style={{ width: 'clamp(30px, 8vw, 40px)', height: 'clamp(30px, 8vw, 40px)', border: '3px solid #8B5A2B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'clamp(15px, 5vw, 30px) clamp(15px, 4vw, 20px)', maxWidth: '1400px', margin: '0 auto', backgroundColor: tema === 'dark' ? '#1a1a1a' : '#F5F0E8', minHeight: '70vh' }}>
      <h2 style={{ textAlign: 'center', color: tema === 'dark' ? '#FFD700' : '#5C3A1E', fontSize: 'clamp(20px, 6vw, 32px)', marginBottom: 'clamp(15px, 5vw, 30px)', fontFamily: 'Georgia, serif' }}>
        {categoryCapitalized}
      </h2>
      
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center', padding: 'clamp(20px, 10vw, 40px)', color: tema === 'dark' ? '#aaa' : '#666', fontSize: 'clamp(14px, 4vw, 16px)' }}>No hay productos en esta categoría.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 40vw, 320px), 1fr))',
          gap: 'clamp(15px, 4vw, 30px)',
          justifyItems: 'center'
        }}>
          {filteredProducts.map(producto => (
            <ProductCard key={producto.id} producto={producto} onConsultar={handleWhatsApp} />
          ))}
        </div>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default CategoryPage;