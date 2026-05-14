import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

function Footer() {
  const { tema } = useTheme();

  // Logo según el tema (30% más grande: 120px * 1.3 = 156px)
  const logoSrc = tema === 'dark' 
    ? 'https://res.cloudinary.com/dzc5gormw/image/upload/v1778554724/ChatGPT_Image_11_may_2026_10_55_20_p.m._kjl5r5.png'
    : 'https://res.cloudinary.com/dzc5gormw/image/upload/v1777090179/Fondo_de_ChatGPT_Image_25_abr_2026_12_03_04_a.m._eliminado_qhrcrd.png';

  return (
    <footer className={tema === 'dark' ? 'dark-content' : ''} style={{
      background: tema === 'dark' 
        ? 'linear-gradient(135deg, #1a1210 0%, #0f0a08 100%)' 
        : 'linear-gradient(135deg, #6B3E1B 0%, #4A2A0E 100%)',
      color: '#F5EDE0',
      textAlign: 'center',
      padding: '40px 20px',
      marginTop: '60px',
      borderTop: tema === 'dark' ? '5px solid #D4A843' : '5px solid #A05A2C',
      transition: 'background 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-block' }}>
          <div style={{ 
            marginBottom: '15px',
            transition: 'transform 0.3s ease-in-out',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}>
            <img 
              key={tema}
              src={logoSrc}
              alt="Entrelazadas de Luna"
              style={{
                width: '156px',
                height: '156px',
                objectFit: 'contain',
                filter: 'brightness(1.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: 1,
                animation: 'fadeInScale 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
        </Link>
        <p style={{ 
          margin: '10px 0', 
          fontSize: '18px',
          transition: 'color 0.3s ease'
        }}>
          ✨ Hecho a mano en Bolivia con amor ✨
        </p>
        <div style={{
          width: '100px',
          height: '2px',
          backgroundColor: tema === 'dark' ? '#D4A843' : '#A05A2C',
          margin: '25px auto',
          transition: 'background-color 0.3s ease'
        }}></div>
        <div style={{ marginTop: '20px' }}>
          <a 
            href="https://wa.me/59170000000" 
            target="_blank" 
            style={{
              color: '#F5EDE0',
              textDecoration: 'none',
              fontSize: '32px',
              display: 'inline-block',
              transition: 'transform 0.3s ease, color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="28" 
              height="28" 
              fill="currentColor"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.23c-1.46 0-2.88-.39-4.12-1.12l-.3-.17-3.12.82.83-3.04-.19-.31c-.81-1.3-1.24-2.8-1.24-4.33 0-4.49 3.66-8.15 8.15-8.15s8.15 3.66 8.15 8.15-3.66 8.15-8.16 8.15zm4.47-6.12c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.57.13-.17.26-.66.81-.81.98-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.38-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.38-.78-1.89-.21-.51-.42-.44-.57-.45-.15 0-.32-.02-.49-.02-.17 0-.45.06-.68.3-.23.25-.89.87-.89 2.13 0 1.26.91 2.47 1.04 2.64.13.17 1.79 2.74 4.34 3.84.61.26 1.08.42 1.45.53.61.19 1.17.16 1.62.1.49-.06 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.11-.22-.17-.47-.3z"/>
            </svg>
          </a>
        </div>
        <p style={{ 
          marginTop: '30px', 
          fontSize: '13px', 
          opacity: 0.8,
          transition: 'color 0.3s ease'
        }}>
          Entrelazadas de Luna - Piezas únicas hechas a mano con ❤️ en Bolivia
        </p>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;