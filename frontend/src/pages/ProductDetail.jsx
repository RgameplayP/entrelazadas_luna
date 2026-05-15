import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ArtisanButton from '../components/ArtisanButton';

function ProductDetail() {
  const { id } = useParams();
  const { tema } = useTheme();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [imagenActual, setImagenActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    fetch(`${API_URL}/api/productos/${id}`)
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
    const precioLimpio = producto?.precio ? producto.precio.replace('€', '').trim() : producto?.precio;
    const mensaje = `Hola, me interesa el producto: ${producto?.nombre} - ${precioLimpio} Bs`;
    window.open(`https://wa.me/59170000000?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const siguienteImagen = () => {
    if (producto && producto.imagenes) {
      setImagenActual((prev) => (prev + 1) % producto.imagenes.length);
    }
  };

  const anteriorImagen = () => {
    if (producto && producto.imagenes) {
      setImagenActual((prev) => (prev - 1 + producto.imagenes.length) % producto.imagenes.length);
    }
  };

  const formatearTexto = (texto) => {
    if (!texto) return null;
    
    const lineas = texto.split('\n');
    const elementos = [];
    let enLista = false;
    let itemsLista = [];

    lineas.forEach((linea, idx) => {
      if (linea.trim().startsWith('- ') || linea.trim().startsWith('• ')) {
        const contenido = linea.trim().substring(2);
        if (!enLista) {
          enLista = true;
          itemsLista = [];
        }
        itemsLista.push(contenido);
      } 
      else if (linea.trim().startsWith('## ')) {
        if (enLista) {
          elementos.push(
            <div key={`div-${idx}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', margin: '15px 0' }}>
              {itemsLista.map((item, i) => (
                <div key={i} style={{ 
                  flex: '1 1 calc(50% - 15px)',
                  minWidth: '200px',
                  padding: '12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#FFD700', fontSize: '20px' }}>✦</span>
                  <span style={{ flex: 1 }}>{item}</span>
                </div>
              ))}
            </div>
          );
          enLista = false;
          itemsLista = [];
        }
        const titulo = linea.trim().substring(3);
        elementos.push(
          <h3 key={`h3-${idx}`} style={{ 
            color: '#FFD700', 
            fontSize: 'clamp(18px, 5vw, 22px)', 
            marginTop: '20px', 
            marginBottom: '12px',
            fontFamily: 'Georgia, serif',
            textAlign: 'center',
            letterSpacing: '2px'
          }}>
            {titulo}
          </h3>
        );
      }
      else {
        if (enLista) {
          elementos.push(
            <div key={`div-${idx}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', margin: '15px 0' }}>
              {itemsLista.map((item, i) => (
                <div key={i} style={{ 
                  flex: '1 1 calc(50% - 15px)',
                  minWidth: '200px',
                  padding: '12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ color: '#FFD700', fontSize: '20px' }}>✦</span>
                  <span style={{ flex: 1 }}>{item}</span>
                </div>
              ))}
            </div>
          );
          enLista = false;
          itemsLista = [];
        }
        if (linea.trim()) {
          elementos.push(
            <p key={idx} style={{ 
              marginBottom: '10px', 
              lineHeight: '1.7',
              fontSize: 'clamp(12px, 4vw, 14px)',
              textAlign: 'center'
            }}>
              {linea}
            </p>
          );
        }
      }
    });

    if (enLista) {
      elementos.push(
        <div key="div-final" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', margin: '15px 0' }}>
          {itemsLista.map((item, i) => (
            <div key={i} style={{ 
              flex: '1 1 calc(50% - 15px)',
              minWidth: '200px',
              padding: '12px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ color: '#FFD700', fontSize: '20px' }}>✦</span>
              <span style={{ flex: 1 }}>{item}</span>
            </div>
          ))}
        </div>
      );
    }

    return <div>{elementos}</div>;
  };

  if (cargando) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: tema === 'dark' ? '#1a1a1a' : '#F5F0E8' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 'clamp(30px, 8vw, 40px)', height: 'clamp(30px, 8vw, 40px)', border: '3px solid #8B5A2B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <p style={{ marginTop: '15px', color: tema === 'dark' ? '#E8DCC8' : '#8B5A2B', fontSize: 'clamp(12px, 4vw, 14px)' }}>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: tema === 'dark' ? '#1a1a1a' : '#F5F0E8', minHeight: '100vh' }}>
        <h2 style={{ color: tema === 'dark' ? '#E8DCC8' : '#8B5A2B', fontSize: 'clamp(18px, 5vw, 24px)' }}>Producto no encontrado</h2>
      </div>
    );
  }

  const precioLimpio = producto.precio ? producto.precio.replace('€', '').trim() : producto.precio;

  return (
    <div style={{ backgroundColor: tema === 'dark' ? '#1a1a1a' : '#F5F0E8', minHeight: '100vh', padding: 'clamp(10px, 4vw, 20px) clamp(10px, 5vw, 15px)' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        backgroundColor: tema === 'dark' ? '#2d2d2d' : 'white', 
        borderRadius: 'clamp(15px, 5vw, 20px)', 
        overflow: 'hidden', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
      }}>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(15px, 5vw, 40px)',
          padding: 'clamp(15px, 5vw, 40px)'
        }} className="product-grid">
          
          <div>
            <div style={{ 
              position: 'relative', 
              marginBottom: '20px', 
              backgroundColor: tema === 'dark' ? '#1a1a1a' : '#FAF6F0', 
              borderRadius: 'clamp(12px, 4vw, 15px)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <img
                src={producto.imagenes && producto.imagenes[imagenActual]}
                alt={producto.nombre}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'contain',
                  borderRadius: 'clamp(12px, 4vw, 15px)', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  aspectRatio: '1/1',
                  maxHeight: 'clamp(300px, 50vw, 500px)'
                }}
                onClick={() => setModalAbierto(true)}
              />
              
              {producto.imagenes && producto.imagenes.length > 1 && (
                <>
                  <button onClick={anteriorImagen} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: 'clamp(30px, 8vw, 40px)', height: 'clamp(30px, 8vw, 40px)', cursor: 'pointer', fontSize: 'clamp(16px, 5vw, 20px)' }}>◀</button>
                  <button onClick={siguienteImagen} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: 'clamp(30px, 8vw, 40px)', height: 'clamp(30px, 8vw, 40px)', cursor: 'pointer', fontSize: 'clamp(16px, 5vw, 20px)' }}>▶</button>
                </>
              )}
            </div>

            {producto.imagenes && producto.imagenes.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', justifyContent: 'center', padding: '5px' }}>
                {producto.imagenes.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setImagenActual(index)}
                    style={{
                      width: 'clamp(50px, 15vw, 80px)',
                      height: 'clamp(50px, 15vw, 80px)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: imagenActual === index ? '3px solid #8B5A2B' : '2px solid transparent',
                      backgroundColor: tema === 'dark' ? '#1a1a1a' : '#FAF6F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img src={img} alt={`${producto.nombre} - ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <span style={{ color: tema === 'dark' ? '#FFD700' : '#6B7B3A', fontSize: 'clamp(11px, 3vw, 14px)', textTransform: 'uppercase', letterSpacing: '2px' }}>{producto.categoria}</span>
            <h1 style={{ color: tema === 'dark' ? '#FFD700' : '#5C3A1E', fontSize: 'clamp(20px, 6vw, 32px)', marginTop: '8px', marginBottom: '15px', fontFamily: 'Georgia, serif' }}>{producto.nombre}</h1>
            <p style={{ color: tema === 'dark' ? '#aaa' : '#666', lineHeight: '1.8', marginBottom: '15px', fontSize: 'clamp(13px, 4vw, 15px)' }}>{producto.descripcion}</p>
            
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: 'clamp(24px, 7vw, 32px)', fontWeight: 'bold', color: '#A0522D' }}>{precioLimpio} Bs</span>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E', fontSize: 'clamp(13px, 4vw, 15px)' }}>Cantidad</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} style={{ width: 'clamp(32px, 10vw, 40px)', height: 'clamp(32px, 10vw, 40px)', borderRadius: '10px', border: '1px solid #D2B48C', backgroundColor: tema === 'dark' ? '#1a1a1a' : 'white', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E', cursor: 'pointer', fontSize: 'clamp(16px, 5vw, 20px)' }}>-</button>
                <span style={{ fontSize: 'clamp(16px, 5vw, 20px)', minWidth: '40px', textAlign: 'center', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E' }}>{cantidad}</span>
                <button onClick={() => setCantidad(cantidad + 1)} style={{ width: 'clamp(32px, 10vw, 40px)', height: 'clamp(32px, 10vw, 40px)', borderRadius: '10px', border: '1px solid #D2B48C', backgroundColor: tema === 'dark' ? '#1a1a1a' : 'white', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E', cursor: 'pointer', fontSize: 'clamp(16px, 5vw, 20px)' }}>+</button>
              </div>
            </div>

            <ArtisanButton onClick={handleWhatsApp}>
              📱 Consultar por WhatsApp
            </ArtisanButton>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '15px' }}>
              <h3 style={{ color: tema === 'dark' ? '#FFD700' : '#5C3A1E', marginBottom: '12px', fontSize: 'clamp(14px, 4vw, 18px)' }}>✨ Características</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 3vw, 14px)', backgroundColor: tema === 'dark' ? '#3a2a1a' : '#F5F0E8', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E', padding: '6px 12px', borderRadius: '25px' }}>🇧🇴 Hecho en Bolivia</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 3vw, 14px)', backgroundColor: tema === 'dark' ? '#3a2a1a' : '#F5F0E8', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E', padding: '6px 12px', borderRadius: '25px' }}>🌿 Artesanal</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'clamp(11px, 3vw, 14px)', backgroundColor: tema === 'dark' ? '#3a2a1a' : '#F5F0E8', color: tema === 'dark' ? '#E8DCC8' : '#5C3A1E', padding: '6px 12px', borderRadius: '25px' }}>💎 Piedra natural</div>
              </div>
            </div>
          </div>
        </div>

        {producto.descripcion_larga && (
          <div style={{
            margin: '0 clamp(10px, 5vw, 40px) clamp(15px, 5vw, 40px) clamp(10px, 5vw, 40px)',
            background: 'linear-gradient(135deg, #8B5A2B 0%, #6B3A1B 100%)',
            borderRadius: 'clamp(12px, 4vw, 20px)',
            padding: 'clamp(15px, 5vw, 35px)',
            position: 'relative',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            border: '1px solid #D2B48C'
          }}>
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontSize: 'clamp(20px, 6vw, 30px)',
              color: 'rgba(210,180,140,0.3)'
            }}>✦</div>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: 'clamp(20px, 6vw, 30px)',
              color: 'rgba(210,180,140,0.3)'
            }}>✦</div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              fontSize: 'clamp(20px, 6vw, 30px)',
              color: 'rgba(210,180,140,0.3)'
            }}>✦</div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              fontSize: 'clamp(20px, 6vw, 30px)',
              color: 'rgba(210,180,140,0.3)'
            }}>✦</div>
            
            <div style={{
              width: 'clamp(60px, 20vw, 100px)',
              height: '2px',
              background: '#D2B48C',
              margin: '0 auto 20px auto'
            }}></div>
            
            <h3 style={{ 
              color: '#FFD700', 
              marginBottom: '20px', 
              fontSize: 'clamp(18px, 5vw, 24px)',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px'
            }}>
              ✿ Descripción ✿
            </h3>
            
            <div style={{ 
              fontSize: 'clamp(12px, 4vw, 15px)', 
              lineHeight: '1.8', 
              color: '#F5F0E8',
              fontFamily: 'Georgia, "Times New Roman", serif',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {formatearTexto(producto.descripcion_larga)}
            </div>
            
            <div style={{
              width: 'clamp(60px, 20vw, 100px)',
              height: '2px',
              background: '#D2B48C',
              margin: '20px auto 0 auto'
            }}></div>
          </div>
        )}

        {modalAbierto && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalAbierto(false)}>
            <button onClick={() => setModalAbierto(false)} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'white', border: 'none', borderRadius: '50%', width: 'clamp(35px, 10vw, 45px)', height: 'clamp(35px, 10vw, 45px)', cursor: 'pointer', fontSize: 'clamp(16px, 5vw, 20px)' }}>✕</button>
            {producto.imagenes && producto.imagenes.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); anteriorImagen(); }} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: 'clamp(35px, 10vw, 50px)', height: 'clamp(35px, 10vw, 50px)', cursor: 'pointer', fontSize: 'clamp(18px, 5vw, 24px)' }}>◀</button>
                <button onClick={(e) => { e.stopPropagation(); siguienteImagen(); }} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: 'clamp(35px, 10vw, 50px)', height: 'clamp(35px, 10vw, 50px)', cursor: 'pointer', fontSize: 'clamp(18px, 5vw, 24px)' }}>▶</button>
              </>
            )}
            <img src={producto.imagenes && producto.imagenes[imagenActual]} alt={producto.nombre} style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
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