import { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F0E8'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ color: '#5C3A1E', textAlign: 'center', marginBottom: '30px' }}>
          Panel de Administración
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              border: '1px solid #D2B48C',
              borderRadius: '8px',
              fontSize: '16px'
            }}
          />
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#8B5A2B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Ingresar
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#666' }}>
          Contraseña: admin123
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;