import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

// Importaciones del admin
import AdminLogin from './admin/pages/AdminLogin.jsx';
import AdminPanel from './admin/pages/AdminPanel.jsx';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsAdminAuthenticated(status);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de cliente (con modo oscuro) */}
        <Route path="/" element={
          <>
            <Header />
            <main style={{ minHeight: '70vh' }}>
              <HomePage />
            </main>
            <Footer />
            <ThemeToggle />
          </>
        } />
        
        <Route path="/categoria/:categoryName" element={
          <>
            <Header />
            <main style={{ minHeight: '70vh' }}>
              <CategoryPage />
            </main>
            <Footer />
            <ThemeToggle />
          </>
        } />
        
        <Route path="/producto/:id" element={
          <>
            <Header />
            <main style={{ minHeight: '70vh' }}>
              <ProductDetail />
            </main>
            <Footer />
            <ThemeToggle />
          </>
        } />
        
        {/* Ruta de administración (SIN modo oscuro) */}
        <Route path="/admin" element={
          isAdminAuthenticated ? <AdminPanel /> : <AdminLogin onLogin={handleLogin} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
