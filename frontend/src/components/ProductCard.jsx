import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function ProductCard({ producto, onConsultar }) {
  const navigate = useNavigate();
  const { tema } = useTheme();

  const handleVerMas = () => {
    navigate(`/producto/${producto.id}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const precioLimpio = producto.precio ? producto.precio.replace('€', '').trim() : producto.precio;

  const cardBg = tema === 'dark' ? '#2a1f1a' : '#ffffff';
  const cardAccent = tema === 'dark' ? '#D4A843' : '#6B3E1B';
  const cardText = tema === 'dark' ? '#E8DCC8' : '#1e293b';
  const imageBg = tema === 'dark' ? '#1a1210' : '#FAF0E6';
  const badgeBg = '#10b981';

  // Optimizar URL de imagen con Cloudinary
  const optimizarImagen = (url) => {
    if (!url) return 'https://via.placeholder.com/400x400?text=Producto';
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/q_auto,f_auto,w_400/');
    }
    return url;
  };

  const imagenOptimizada = optimizarImagen(producto.imagenes[0]);

  return (
    <div
      className="product-card"
      style={{
        '--card-bg': cardBg,
        '--card-accent': cardAccent,
        '--card-text': cardText,
        '--card-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '320px',
        minWidth: '280px',
        height: 'auto',
        minHeight: '380px',
        background: cardBg,
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: 'var(--card-shadow)',
        border: `1px solid ${tema === 'dark' ? 'rgba(212, 168, 67, 0.2)' : 'rgba(107, 62, 27, 0.1)'}`,
        fontFamily: 'Georgia, "Times New Roman", serif',
        cursor: 'pointer',
        margin: '0 auto'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.borderColor = 'rgba(107, 62, 27, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
        e.currentTarget.style.borderColor = tema === 'dark' ? 'rgba(212, 168, 67, 0.2)' : 'rgba(107, 62, 27, 0.1)';
      }}
    >
      <div
        className="card__shine"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,${tema === 'dark' ? '0.15' : '0.8'}) 50%, rgba(255,255,255,0) 60%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      />
      
      <div
        className="card__glow"
        style={{
          position: 'absolute',
          inset: '-10px',
          background: `radial-gradient(circle at 50% 0%, ${cardAccent}30 0%, ${cardAccent}00 70%)`,
          opacity: 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }}
      />

      <div className="card__content" style={{ padding: '1.25em', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75em', position: 'relative', zIndex: 2 }}>
        <div className="card__badge" style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: badgeBg,
          color: 'white',
          padding: '0.25em 0.75em',
          borderRadius: '999px',
          fontSize: '0.7em',
          fontWeight: '600',
          transform: 'scale(0.8)',
          opacity: 0,
          transition: 'all 0.4s ease 0.1s',
          zIndex: 3
        }}>
          NUEVO
        </div>

        {/* Imagen optimizada con placeholder y lazy loading */}
        <div
          className="card__image"
          style={{
            width: '100%',
            height: '220px',
            background: imageBg,
            borderRadius: '12px',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Placeholder de carga */}
          <div className="image-placeholder" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: imageBg,
            zIndex: 1
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              border: '2px solid #D2B48C',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
          <img
            src={imagenOptimizada}
            alt={producto.nombre}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'transform 0.5s ease',
              padding: '10px',
              position: 'relative',
              zIndex: 2,
              opacity: 0
            }}
            onClick={handleVerMas}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Producto';
              e.target.previousSibling.style.display = 'none';
            }}
            onLoad={(e) => {
              e.target.style.opacity = '1';
              if (e.target.previousSibling) {
                e.target.previousSibling.style.display = 'none';
              }
            }}
          />
        </div>

        <div className="card__text" style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          <p className="card__title" style={{
            color: cardText,
            fontSize: '1.1em',
            margin: 0,
            fontWeight: '700',
            transition: 'all 0.3s ease',
            lineHeight: '1.3'
          }}>
            {producto.nombre}
          </p>
          <p className="card__description" style={{
            color: cardText,
            fontSize: '0.8em',
            margin: 0,
            opacity: 0.7,
            transition: 'all 0.3s ease',
            lineHeight: '1.4'
          }}>
            {producto.descripcion ? producto.descripcion.substring(0, 80) : ''}...
          </p>
        </div>

        <div className="card__footer" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '10px'
        }}>
          <div className="card__price" style={{
            color: cardText,
            fontWeight: '700',
            fontSize: '1.2em',
            transition: 'all 0.3s ease'
          }}>
            {precioLimpio} Bs
          </div>
          <button
            onClick={handleVerMas}
            className="card__button"
            style={{
              width: '36px',
              height: '36px',
              background: cardAccent,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(0.9)',
              border: 'none'
            }}
          >
            <svg height="18" width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12H20M12 4V20" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover .card__shine {
          opacity: 1;
          animation: shine 3s infinite;
        }
        .product-card:hover .card__glow {
          opacity: 1;
        }
        .product-card:hover .card__badge {
          transform: scale(1);
          opacity: 1;
        }
        .product-card:hover .card__image img {
          transform: translateY(-5px) scale(1.03);
        }
        .product-card:hover .card__title {
          color: var(--card-accent);
          transform: translateX(2px);
        }
        .product-card:hover .card__description {
          opacity: 1;
          transform: translateX(2px);
        }
        .product-card:hover .card__price {
          color: var(--card-accent);
          transform: translateX(2px);
        }
        .product-card:hover .card__button {
          transform: scale(1);
          box-shadow: 0 0 0 4px rgba(107, 62, 27, 0.2);
        }
        .product-card:hover .card__button svg {
          animation: pulse 1.5s infinite;
        }
        .product-card:active {
          transform: translateY(-5px) scale(0.98);
        }
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ProductCard;