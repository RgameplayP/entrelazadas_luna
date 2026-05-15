import { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { useTheme } from '../context/ThemeContext';

function HomePage() {
  const { tema } = useTheme();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [slideActual, setSlideActual] = useState(0);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const carruselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const scrollInterval = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const carruselSlides = [
    {
      imagen: 'https://res.cloudinary.com/dzc5gormw/image/upload/q_auto,f_auto,w_800/v1778556512/ChatGPT_Image_11_may_2026_11_28_21_p.m._iffwmm.png',
      titulo: 'Collares de Macramé',
      subtitulo: 'Artesanía Natural y Sostenible'
    },
    {
      imagen: 'https://res.cloudinary.com/dzc5gormw/image/upload/q_auto,f_auto,w_800/v1778556248/ChatGPT_Image_11_may_2026_11_23_36_p.m._tmboi6.png',
      titulo: 'Manillas de Macramé',
      subtitulo: 'Piezas únicas'
    },
    {
      imagen: 'https://res.cloudinary.com/dzc5gormw/image/upload/q_auto,f_auto,w_800/v1778560858/ChatGPT_Image_12_may_2026_12_40_42_a.m._mm5l3o.png',
      titulo: 'Brazaletes de Macramé',
      subtitulo: 'Hechas a mano con amor'
    },
    {
      imagen: 'https://res.cloudinary.com/dzc5gormw/image/upload/q_auto,f_auto,w_800/v1778561969/ChatGPT_Image_12_may_2026_12_59_17_a.m._ex13ru.png',
      titulo: 'Aretes de Macramé',
      subtitulo: 'Elegancia que te conecta contigo misma'
    },
    {
      imagen: 'https://res.cloudinary.com/dzc5gormw/image/upload/q_auto,f_auto,w_800/v1778561551/ChatGPT_Image_12_may_2026_12_51_30_a.m._omlpcl.png',
      titulo: 'Anillos de Macramé',
      subtitulo: 'Detalles únicos para tu estilo'
    },
    {
      imagen: 'https://res.cloudinary.com/dzc5gormw/image/upload/q_auto,f_auto,w_800/v1778562058/ChatGPT_Image_11_may_2026_11_33_23_p.m._gskefu.png',
      titulo: 'Belleza Artesanal',
      subtitulo: 'Piezas que conectan con tu alma'
    }
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    fetch(`${API_URL}/api/productos`)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        let productosInfinitos = [];
        for (let i = 0; i < 10; i++) {
          productosInfinitos = [...productosInfinitos, ...shuffled];
        }
        setProductosDestacados(productosInfinitos);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % carruselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!carruselRef.current || productosDestacados.length === 0) return;

    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (!isHovering && carruselRef.current) {
          const container = carruselRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScroll - 5) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollLeft += 1.5;
          }
        }
      }, 25);
    };

    startAutoScroll();

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isHovering, productosDestacados]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      siguienteSlide();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      anteriorSlide();
    }
  };

  const siguienteSlide = () => {
    setSlideActual((prev) => (prev + 1) % carruselSlides.length);
  };

  const anteriorSlide = () => {
    setSlideActual((prev) => (prev - 1 + carruselSlides.length) % carruselSlides.length);
  };

  const handleWhatsApp = (producto) => {
    const precioLimpio = producto.precio ? producto.precio.replace('€', '').trim() : producto.precio;
    const mensaje = `Hola, me interesa: ${producto.nombre} - ${precioLimpio} Bs`;
    window.open(`https://wa.me/59170000000?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  if (cargando) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: tema === 'dark' ? '#1a1a1a' : '#F5EDE0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 'clamp(40px, 10vw, 60px)', height: 'clamp(40px, 10vw, 60px)', border: '3px solid #D4A843', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <p style={{ marginTop: '20px', color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', fontSize: 'clamp(14px, 4vw, 16px)' }}>Cargando tesoros artesanales...</p>
          <p style={{ marginTop: '10px', fontSize: 'clamp(11px, 3vw, 13px)', color: '#A0522D' }}>✨ La primera carga puede tardar unos segundos ✨</p>
          <p style={{ marginTop: '5px', fontSize: 'clamp(10px, 3vw, 12px)', color: '#8B7355' }}>Las imágenes se optimizan automáticamente</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: tema === 'dark' ? '#1a1210' : '#F5EDE0', minHeight: '100vh' }}>
      {/* Carrusel principal - Responsivo */}
      <div
        style={{ position: 'relative', height: 'clamp(300px, 50vw, 500px)', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
        onTouchEnd={handleTouchEnd}
      >
        {carruselSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: slideActual === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', padding: '0 20px', width: '100%' }}>
              <h2 style={{ fontSize: 'clamp(20px, 6vw, 42px)', marginBottom: '10px' }}>{slide.titulo}</h2>
              <p style={{ fontSize: 'clamp(14px, 4vw, 20px)', marginBottom: '20px' }}>{slide.subtitulo}</p>
              <button
                style={{
                  padding: 'clamp(8px, 3vw, 12px) clamp(16px, 5vw, 32px)',
                  backgroundColor: '#6B3E1B',
                  color: 'white',
                  border: '1px solid #D4A843',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  fontSize: 'clamp(12px, 4vw, 16px)',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Georgia, serif'
                }}
                onClick={() => {
                  const categoriasMap = {
                    'Collares de Macramé': '/categoria/collares',
                    'Manillas de Macramé': '/categoria/manillas',
                    'Brazaletes de Macramé': '/categoria/brazaletes',
                    'Aretes de Macramé': '/categoria/aretes',
                    'Anillos de Macramé': '/categoria/anillos',
                    'Belleza Artesanal': '/categoria/todos'
                  };
                  const destino = categoriasMap[carruselSlides[slideActual].titulo] || '/categoria/todos';
                  window.location.href = destino;
                }}
              >
                Ver colección
              </button>
            </div>
          </div>
        ))}

        {/* Botón anterior - SVG profesional */}
        <button 
          onClick={anteriorSlide} 
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(35px, 8vw, 45px)',
            height: 'clamp(35px, 8vw, 45px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Botón siguiente - SVG profesional */}
        <button 
          onClick={siguienteSlide} 
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(35px, 8vw, 45px)',
            height: 'clamp(35px, 8vw, 45px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
          {carruselSlides.map((_, index) => (
            <div 
              key={index} 
              onClick={() => setSlideActual(index)} 
              style={{ 
                width: 'clamp(6px, 3vw, 10px)', 
                height: 'clamp(6px, 3vw, 10px)', 
                borderRadius: '50%', 
                backgroundColor: slideActual === index ? '#D4A843' : 'rgba(255,255,255,0.5)', 
                cursor: 'pointer', 
                transition: 'all 0.2s ease' 
              }} 
            />
          ))}
        </div>
      </div>

      {/* Sección de colecciones destacadas */}
      <div style={{ backgroundColor: tema === 'dark' ? '#1a1210' : '#F5EDE0', padding: 'clamp(30px, 8vw, 60px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: tema === 'dark' ? '#D4A843' : '#6B3E1B', fontSize: 'clamp(24px, 6vw, 36px)', marginBottom: '15px', fontFamily: 'Georgia, serif' }}>Colecciones Destacadas</h2>
          <p style={{ textAlign: 'center', color: tema === 'dark' ? '#aaa' : '#7A5A3A', marginBottom: 'clamp(20px, 6vw, 40px)', fontSize: 'clamp(12px, 4vw, 16px)' }}>Descubre nuestras piezas artesanales únicas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(15px, 4vw, 30px)' }}>
            {[
              { nombre: 'Collares de Macramé', imagen: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400', link: '/categoria/collares', descripcion: 'Piezas tejidas a mano con hilos naturales' },
              { nombre: 'Manillas Artesanales', imagen: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', link: '/categoria/manillas', descripcion: 'Pulseras con mostacillas y dijes únicos' },
              { nombre: 'Aretes Colgantes', imagen: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400', link: '/categoria/aretes', descripcion: 'Diseños ligeros y elegantes' },
              { nombre: 'Anillos de Minerales', imagen: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', link: '/categoria/anillos', descripcion: 'Piedras naturales con propiedades únicas' }
            ].map((coleccion, index) => (
              <div key={index} style={{ backgroundColor: tema === 'dark' ? '#2a1f1a' : 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.3s' }} onClick={() => window.location.href = coleccion.link}>
                <img src={coleccion.imagen} alt={coleccion.nombre} style={{ width: '100%', height: 'clamp(180px, 30vw, 220px)', objectFit: 'cover' }} />
                <div style={{ padding: 'clamp(12px, 4vw, 20px)', textAlign: 'center' }}>
                  <h3 style={{ color: tema === 'dark' ? '#D4A843' : '#6B3E1B', marginBottom: '10px', fontSize: 'clamp(14px, 4vw, 18px)' }}>{coleccion.nombre}</h3>
                  <p style={{ color: tema === 'dark' ? '#aaa' : '#7A5A3A', fontSize: 'clamp(11px, 3vw, 14px)' }}>{coleccion.descripcion}</p>
                  <button style={{ marginTop: '15px', padding: '6px 16px', backgroundColor: '#6B3E1B', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: 'clamp(11px, 3vw, 14px)' }}>Ver más</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carrusel de Novedades */}
      <div style={{ backgroundColor: tema === 'dark' ? '#1a1210' : '#F5EDE0', padding: 'clamp(30px, 8vw, 60px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <h2 style={{ textAlign: 'center', color: tema === 'dark' ? '#D4A843' : '#6B3E1B', fontSize: 'clamp(24px, 6vw, 36px)', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>✨ Novedades ✨</h2>
          <p style={{ textAlign: 'center', color: tema === 'dark' ? '#aaa' : '#7A5A3A', marginBottom: 'clamp(20px, 6vw, 40px)', fontSize: 'clamp(12px, 4vw, 16px)' }}>Descubre nuestras últimas creaciones</p>
          <div style={{ position: 'relative' }}>
            <div
              ref={carruselRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                gap: 'clamp(15px, 4vw, 25px)',
                padding: '15px 5px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {productosDestacados.map((producto, index) => (
                <div key={`${producto.id}-${index}`} style={{ flex: '0 0 auto', width: 'clamp(260px, 70vw, 300px)' }}>
                  <ProductCard producto={producto} onConsultar={handleWhatsApp} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <a href="/categoria/todos" style={{ color: '#8B5A2B', textDecoration: 'none', fontSize: 'clamp(12px, 4vw, 16px)', borderBottom: '2px solid #8B5A2B', paddingBottom: '5px' }}>Ver todos los productos →</a>
          </div>
        </div>
      </div>

      {/* Banner de promoción */}
      <div style={{ background: 'linear-gradient(135deg, #6B3E1B 0%, #4A2A0E 100%)', color: 'white', textAlign: 'center', padding: 'clamp(30px, 8vw, 60px) 20px' }}>
        <h2 style={{ fontSize: 'clamp(20px, 6vw, 32px)', marginBottom: '10px' }}>✨ Envío a todo Bolivia ✨</h2>
        <p style={{ fontSize: 'clamp(12px, 4vw, 18px)', marginBottom: '15px' }}>Pregunta por nuestros métodos de envío</p>
        <button onClick={() => window.location.href = '/categoria/anillos'} style={{ padding: 'clamp(8px, 3vw, 12px) clamp(16px, 5vw, 30px)', backgroundColor: 'white', color: '#6B3E1B', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: 'clamp(12px, 4vw, 16px)', fontWeight: 'bold' }}>Ver productos</button>
      </div>

      {/* Testimonios */}
      <div style={{ backgroundColor: tema === 'dark' ? '#1a1210' : '#F5EDE0', padding: 'clamp(30px, 8vw, 60px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: tema === 'dark' ? '#D4A843' : '#6B3E1B', fontSize: 'clamp(24px, 6vw, 36px)', marginBottom: '15px' }}>Lo que dicen nuestros clientes</h2>
          <p style={{ color: tema === 'dark' ? '#aaa' : '#7A5A3A', marginBottom: 'clamp(20px, 6vw, 40px)', fontSize: 'clamp(12px, 4vw, 16px)' }}>Artesanía que conquista corazones</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { nombre: 'María G.', texto: 'Las piezas son hermosas, se nota la calidad artesanal. ¡Volveré a comprar!', rating: 5 },
              { nombre: 'Carlos R.', texto: 'El collar de macramé que compré es único, me encanta su estilo boho.', rating: 5 },
              { nombre: 'Laura M.', texto: 'Atención excelente y productos de alta calidad. Muy recomendable.', rating: 5 }
            ].map((testimonio, index) => (
              <div key={index} style={{ backgroundColor: tema === 'dark' ? '#2a1f1a' : 'white', padding: 'clamp(15px, 5vw, 25px)', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#FFD700', fontSize: 'clamp(16px, 5vw, 20px)', marginBottom: '10px' }}>{'★'.repeat(testimonio.rating)}</div>
                <p style={{ color: tema === 'dark' ? '#aaa' : '#666', lineHeight: '1.6', marginBottom: '15px', fontSize: 'clamp(12px, 4vw, 14px)', fontStyle: 'italic' }}>"{testimonio.texto}"</p>
                <h4 style={{ color: tema === 'dark' ? '#D4A843' : '#6B3E1B', fontSize: 'clamp(12px, 4vw, 14px)' }}>- {testimonio.nombre}</h4>
              </div>
            ))}
          </div>
        </div>
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

export default HomePage;