import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    const guardado = localStorage.getItem('tema');
    return guardado || 'light';
  });

  const toggleTema = () => {
    const nuevoTema = tema === 'light' ? 'dark' : 'light';
    setTema(nuevoTema);
    localStorage.setItem('tema', nuevoTema);
  };

  useEffect(() => {
    if (tema === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
