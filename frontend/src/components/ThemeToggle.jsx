import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef } from 'react';

function ThemeToggle() {
  const { tema, toggleTema } = useTheme();
  const checkboxRef = useRef(null);

  // Sincronizar checkbox con el tema actual
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = tema === 'dark';
    }
  }, [tema]);

  // No mostrar en admin
  if (window.location.pathname.includes('/admin')) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
    }}>
      <label className="theme-switch">
        <input
          ref={checkboxRef}
          type="checkbox"
          onChange={toggleTema}
          aria-label="Cambiar tema"
        />
        <div className="theme-slider">
          <div className="theme-sun-moon">
            {/* Luna - Modo oscuro */}
            <svg className="moon-dot moon-dot-1" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#D4A843" />
            </svg>
            <svg className="moon-dot moon-dot-2" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#D4A843" />
            </svg>
            <svg className="moon-dot moon-dot-3" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#D4A843" />
            </svg>
            
            {/* Rayos de sol - Modo claro */}
            <svg className="light-ray light-ray-1" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#6B3E1B" />
            </svg>
            <svg className="light-ray light-ray-2" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#6B3E1B" />
            </svg>
            <svg className="light-ray light-ray-3" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#6B3E1B" />
            </svg>

            {/* Nubes */}
            <svg className="cloud-dark cloud-1" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#8B7355" />
            </svg>
            <svg className="cloud-dark cloud-2" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#8B7355" />
            </svg>
            <svg className="cloud-dark cloud-3" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#8B7355" />
            </svg>
            <svg className="cloud-light cloud-4" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#EDE0D0" />
            </svg>
            <svg className="cloud-light cloud-5" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#EDE0D0" />
            </svg>
            <svg className="cloud-light cloud-6" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#EDE0D0" />
            </svg>
          </div>
          
          {/* Estrellas */}
          <div className="theme-stars">
            <svg className="star star-1" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" fill="#FFD700" />
            </svg>
            <svg className="star star-2" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" fill="#FFD700" />
            </svg>
            <svg className="star star-3" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" fill="#FFD700" />
            </svg>
            <svg className="star star-4" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" fill="#FFD700" />
            </svg>
          </div>
        </div>
      </label>

      <style>{`
        .theme-switch {
          position: relative;
          display: inline-block;
          width: 70px;
          height: 38px;
          cursor: pointer;
        }

        .theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .theme-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #8B7355 0%, #A0825A 100%);
          border-radius: 38px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          border: 2px solid #D4A843;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1);
        }

        .theme-sun-moon {
          position: absolute;
          content: "";
          height: 30px;
          width: 30px;
          left: 4px;
          bottom: 4px;
          background: radial-gradient(circle at 30% 30%, #F5EDE0, #EDE0D0);
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        input:checked + .theme-slider {
          background: linear-gradient(135deg, #1a1210 0%, #2a1f1a 100%);
          border-color: #D4A843;
        }

        input:checked + .theme-slider .theme-sun-moon {
          transform: translateX(32px);
          background: radial-gradient(circle at 30% 30%, #D4A843, #B8922E);
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        /* Elementos decorativos */
        .moon-dot, .light-ray, .cloud-dark, .cloud-light {
          position: absolute;
          transition: opacity 0.3s ease;
        }

        .moon-dot {
          opacity: 0;
          fill: #D4A843;
        }

        .light-ray {
          opacity: 0;
          fill: #6B3E1B;
        }

        .cloud-dark, .cloud-light {
          fill: #8B7355;
        }

        input:checked + .theme-slider .moon-dot {
          opacity: 1;
        }

        input:not(:checked) + .theme-slider .light-ray {
          opacity: 1;
        }

        /* Posiciones de los elementos */
        .moon-dot-1 { left: 10px; top: 3px; width: 6px; height: 6px; }
        .moon-dot-2 { left: 2px; top: 10px; width: 10px; height: 10px; }
        .moon-dot-3 { left: 16px; top: 18px; width: 4px; height: 4px; }

        .light-ray-1 { left: -8px; top: -8px; width: 43px; height: 43px; opacity: 0.15; }
        .light-ray-2 { left: -50%; top: -50%; width: 55px; height: 55px; opacity: 0.1; }
        .light-ray-3 { left: -18px; top: -18px; width: 60px; height: 60px; opacity: 0.12; }

        .cloud-1 { left: 30px; top: 15px; width: 40px; animation: cloud-move 6s infinite; opacity: 0.3; }
        .cloud-2 { left: 44px; top: 10px; width: 20px; animation: cloud-move 6s infinite 1s; opacity: 0.25; }
        .cloud-3 { left: 18px; top: 24px; width: 30px; animation: cloud-move 6s infinite 0.5s; opacity: 0.2; }
        .cloud-4 { left: 36px; top: 18px; width: 40px; animation: cloud-move 6s infinite; opacity: 0; }
        .cloud-5 { left: 48px; top: 14px; width: 20px; animation: cloud-move 6s infinite 1s; opacity: 0; }
        .cloud-6 { left: 22px; top: 26px; width: 30px; animation: cloud-move 6s infinite 0.5s; opacity: 0; }

        input:checked + .theme-slider .cloud-dark { opacity: 0; }
        input:checked + .theme-slider .cloud-light { opacity: 0.25; }

        /* Estrellas */
        .theme-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translateY(-38px);
          opacity: 0;
          transition: all 0.4s ease;
          pointer-events: none;
        }

        input:checked + .theme-slider .theme-stars {
          transform: translateY(0);
          opacity: 1;
        }

        .star {
          position: absolute;
          fill: #FFD700;
          animation: star-twinkle 2s infinite;
        }

        .star-1 { width: 20px; top: 2px; left: 3px; animation-delay: 0.3s; }
        .star-2 { width: 6px; top: 16px; left: 5px; animation-delay: 0s; }
        .star-3 { width: 12px; top: 20px; left: 12px; animation-delay: 0.6s; }
        .star-4 { width: 18px; top: 0px; left: 20px; animation-delay: 1.3s; }

        @keyframes cloud-move {
          0% { transform: translateX(0px); }
          40% { transform: translateX(3px); }
          80% { transform: translateX(-3px); }
          100% { transform: translateX(0px); }
        }

        @keyframes star-twinkle {
          0% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.2); opacity: 0.7; }
          80% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ThemeToggle;
