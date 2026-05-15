import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { tema } = useTheme();

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
        padding: 'clamp(30px, 8vw, 50px) 20px clamp(20px, 5vw, 30px)',
        borderBottom: tema === 'dark' ? '1px solid #6B3E1B' : '1px solid #D4A843'
      }}>
        {/* Logo con efectos de hover y transición suave */}
        <Link to="/" style={{ display: 'inline-block' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: '15px',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                width: 'clamp(180px, 40vw, 300px)',
                height: 'auto',
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
          fontSize: 'clamp(28px, 6vw, 48px)', 
          color: tema === 'dark' ? '#D4A843' : '#6B3E1B', 
          margin: 0, 
          fontFamily: 'Georgia, serif',
          transition: 'color 0.3s ease'
        }}>
          Entrelazadas de Luna
        </h1>
        <p style={{ 
          fontSize: 'clamp(14px, 4vw, 18px)', 
          color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
          fontStyle: 'italic', 
          marginTop: '8px',
          transition: 'color 0.3s ease'
        }}>
          Joyería artesanal en macramé - Bolivia
        </p>
        <p style={{ 
          marginTop: '10px', 
          color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B',
          fontSize: 'clamp(12px, 3vw, 16px)',
          transition: 'color 0.3s ease'
        }}>
          Piezas únicas hechas a mano con amor
        </p>
      </div>

      {/* Navbar responsiva */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '50px',
        marginTop: '0'
      }}>
        <div style={{
          position: 'relative',
          inset: 0,
          background: tema === 'dark' ? '#2a1f1a' : '#F5EDE0',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          gap: '8px',
          boxShadow: tema === 'dark' ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.05)',
          transition: 'background 0.3s ease'
        }}>
          <Link to="/categoria/todos" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Todos
          </Link>
          <Link to="/categoria/collares" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Collares
          </Link>
          <Link to="/categoria/manillas" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Manillas
          </Link>
          <Link to="/" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#D4A843' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Inicio
          </Link>
          <Link to="/categoria/brazaletes" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Brazaletes
          </Link>
          <Link to="/categoria/aretes" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Aretes
          </Link>
          <Link to="/categoria/anillos" className="nav-btn" style={{ 
            textDecoration: 'none', 
            padding: '8px 12px', 
            color: tema === 'dark' ? '#E8DCC8' : '#6B3E1B', 
            cursor: 'pointer', 
            transition: '0.1s',
            borderRadius: '20px',
            fontWeight: '500',
            fontSize: 'clamp(12px, 3vw, 14px)',
            whiteSpace: 'nowrap'
          }}>
            Anillos
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.92);
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
        
        /* Responsive para móvil */
        @media (max-width: 768px) {
          .nav-btn {
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;