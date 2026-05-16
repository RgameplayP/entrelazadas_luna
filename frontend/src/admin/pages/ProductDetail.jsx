import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WhatsApp, X, ChevronLeft, ChevronRight } from 'lucide-react';

function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [imagenActual, setImagenActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5001/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setCargando(false);
      });
  }, [id]);

  const handleWhatsApp = () => {
    const mensaje = `Hola, me interesa el producto: ${producto?.nombre} - ${producto?.precio}. ¿Podrías darme más información?`;
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % producto.imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + producto.imagenes.length) % producto.imagenes.length);
  };

  if (cargando) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F0E8' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid #8B5A2B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <p style={{ marginTop: '20px', color: '#8B5A2B' }}>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        
        {/* Grid de dos columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '40px' }}>
          
          {/* Columna izquierda - Galería de imágenes */}
          <div>
            {/* Imagen principal */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <img
                src={producto.imagenes[imagenActual]}
                alt={producto.nombre}
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '15px', cursor: 'pointer' }}
                onClick={() => setModalAbierto(true)}
              />
              
              {/* Botones de navegación */}
              {producto.imagenes.length > 1 && (
                <>
                  <button
                    onClick={anteriorImagen}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={siguienteImagen}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas */}
            {producto.imagenes.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                {producto.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${producto.nombre} - ${index + 1}`}
                    onClick={() => setImagenActual(index)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: imagenActual === index ? '2px solid #8B5A2B' : '1px solid #ddd'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha - Información del producto */}
          <div>
            <span style={{ color: '#6B7B3A', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {producto.categoria}
            </span>
            <h1 style={{ color: '#5C3A1E', fontSize: '32px', marginTop: '10px', marginBottom: '20px' }}>
              {producto.nombre}
            </h1>
            
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
              {producto.descripcion}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#8B5A2B' }}>
                {producto.precio}
              </span>
              <span style={{ color: '#666', fontSize: '14px', marginLeft: '10px' }}>EUR</span>
            </div>

            {/* Selector de cantidad */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#5C3A1E' }}>
                Cantidad
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    border: '1px solid #D2B48C',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '18px', minWidth: '40px', textAlign: 'center' }}>{cantidad}</span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    border: '1px solid #D2B48C',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón de WhatsApp */}
            <button
              onClick={handleWhatsApp}
              style={{
                width: '100%',
                backgroundColor: '#25D366',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}
            >
              <WhatsApp size={24} />
              Consultar por WhatsApp
            </button>

            {/* Características */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <h3 style={{ color: '#5C3A1E', marginBottom: '15px' }}>Características</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div><span style={{ fontWeight: 'bold' }}>✨ Artesanal:</span> Hecho a mano</div>
                <div><span style={{ fontWeight: 'bold' }}>💎 Material:</span> Piedra natural</div>
                <div><span style={{ fontWeight: 'bold' }}>🇪🇸 Envío:</span> 24-48h</div>
              </div>
            </div>

            {/* Envío gratis */}
            <div style={{ backgroundColor: '#F5F0E8', padding: '15px', borderRadius: '10px', marginTop: '20px' }}>
            </div>
          </div>
        </div>

        {/* Sección de propiedades (solo para anillos) */}
        {producto.categoria === 'Anillos' && (
          <div style={{ padding: '40px', backgroundColor: '#F5F0E8', borderTop: '1px solid #eee' }}>
            <h2 style={{ color: '#5C3A1E', marginBottom: '20px', textAlign: 'center' }}>
              ¿Cuáles son las propiedades energéticas?
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
              Este anillo de piedra natural es reconocido por sus propiedades únicas.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#8B5A2B' }}>🧠 Claridad Mental</h3>
                <p>Ayuda a mejorar la concentración y la toma de decisiones.</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#8B5A2B' }}>⚖️ Equilibrio y Armonía</h3>
                <p>Fomenta la paz interior y el equilibrio emocional.</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#8B5A2B' }}>🛡️ Protección Energética</h3>
                <p>Protege contra energías negativas.</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#8B5A2B' }}>🔮 Intuición</h3>
                <p>Estimula la intuición y la conexión espiritual.</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal de imagen completa */}
        {modalAbierto && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }} onClick={() => setModalAbierto(false)}>
            <button
              onClick={() => setModalAbierto(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            <img
              src={producto.imagenes[imagenActual]}
              alt={producto.nombre}
              style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;