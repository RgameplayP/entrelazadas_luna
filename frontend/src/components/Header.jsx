import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { tema } = useTheme();

  // Logo según el tema (tus logos actuales que funcionan)
  const logoSrc = tema === 'dark' 
    ? 'https://res.cloudinary.com/dzc5gormw/image/upload/v1778554724/ChatGPT_Image_11_may_2026_10_55_20_p.m._kjl5r5.png'
    : 'https://res.cloudinary.com/dzc5gormw/image/upload/v1777090179/Fondo_de_ChatGPT_Image_25_abr_2026_12_03_04_a.m._eliminado_qhrcrd.png';

  return (
    <div className={tema === 'dark' ? 'dark-content' : ''}>
      {/* Hero Section */}
      <div style={{
        background: tema === 'dark'     
          ? 'linear-gradient(135deg, #2a1f1a 0%, #1a1210 100%)' 
          : 'linear-gradient(135deg, #F5EDE0 0%, #EDE0D0 100%)',
        textAlign: 'center',
        padding: '50px 20px 40px',
        borderBottom: tema === 'dark' ? '1px solid #6B3E1B' : '1px solid #D4A843'
      }}>
        {/* Logo interactivo - click para ir al inicio, hover para agrandar */}
        <Link to="/" style={{ display: 'inline-block' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: '20px',
            transition: 'transform 0.3s ease-in-out',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}>
            <img 
              key={tema}
              src={logoSrc}
              alt="Entrelazadas de Luna"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'contain',
                filter: tema === 'dark' ? 'brightness(0.95)' : 'none',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: 1,
                animation: 'fadeInScale 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
        </Link>
        
        <h1 style={{ 
          fontSize: '48px', 
          color: tema === 'dark' ? '#D4A843' : '#6B3E1B', 
          margin: 0, 
          fontFamily: 'Georgia, serif',
          transition: 'color 0.3s ease'
        }}>
          Entrelazadas de Luna
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
          fontStyle: 'italic', 
          marginTop: '10px',
          transition: 'color 0.3s ease'
        }}>
          Joyería artesanal en macramé - Bolivia
        </p>
        <p style={{ 
          marginTop: '15px', 
          color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B',
          transition: 'color 0.3s ease'
        }}>
          Piezas únicas hechas a mano con amor
        </p>
      </div>

      {/* Navbar Artesanal con efecto de borde - NUEVO ORDEN */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '60px',
        marginTop: '0'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: tema === 'dark' ? '#2a1f1a' : '#F5EDE0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0.5em',
          boxShadow: tema === 'dark' ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.05)',
          transition: 'background 0.3s ease'
        }}>
          {/* 1. Todos (al principio) */}
          <Link to="/categoria/todos" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            Todos
          </Link>
          {/* 2. Collares */}
          <Link to="/categoria/collares" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            Collares
          </Link>
          {/* 3. Manillas */}
          <Link to="/categoria/manillas" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            Manillas
          </Link>
          {/* 4. Inicio (al medio) */}
          <Link to="/" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#D4A843' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}>
            Inicio
          </Link>
          {/* 5. Brazaletes */}
          <Link to="/categoria/brazaletes" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            Brazaletes
          </Link>
          {/* 6. Aretes */}
          <Link to="/categoria/aretes" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            Aretes
          </Link>
          {/* 7. Anillos */}
          <Link to="/categoria/anillos" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '0.5em 1.5em', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '25px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            Anillos
          </Link>
        </div>
        
        {/* SVG decorativo con efecto de borde */}
        <svg
          className="outline"
          overflow="visible"
          width="100%"
          height="60"
          viewBox="0 0 100% 60"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            width: '100%',
            height: '60px'
          }}
        >
          <rect
            className="rect"
            pathLength="100"
            x="0"
            y="0"
            width="100%"
            height="60"
            fill="transparent"
            strokeWidth="2"
            stroke={tema === 'dark' ? '#D4A843' : '#6B3E1B'}
            rx="4"
          />
        </svg>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .nav-btn {
          position: relative;
          z-index: 2;
        }
        .nav-btn:hover {
          background: ${tema === 'dark' ? 'rgba(212, 168, 67, 0.15)' : 'rgba(107, 62, 27, 0.08)'};
          transform: translateY(-2px);
        }
        .outline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          width: 100%;
          height: 60px;
        }
        .rect {
          stroke-dashoffset: 5;
          stroke-dasharray: 0 0 10 40 10 40;
          transition: 0.5s;
        }
        .nav:hover ~ .outline .rect {
          transition: 999999s;
          stroke-dashoffset: 1;
          stroke-dasharray: 0;
        }
        /* Efectos para cada botón (ahora con 7 botones) */
        .nav-btn:nth-child(1):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 2 8 73.3 8 10.7;
        }
        .nav-btn:nth-child(2):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 12.6 9.5 49.3 9.5 31.6;
        }
        .nav-btn:nth-child(3):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 24.5 8.5 27.5 8.5 55.5;
        }
        .nav-btn:nth-child(4):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 34.7 6.9 10.2 6.9 76;
        }
        .nav-btn:nth-child(5):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 44 5 21 5 66;
        }
        .nav-btn:nth-child(6):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 53 4 10 4 83;
        }
        .nav-btn:nth-child(7):hover ~ svg .rect {
          stroke-dashoffset: 0;
          stroke-dasharray: 0 62 3 10 3 90;
        }
      `}</style>
    </div>
  );
}

export default Header;