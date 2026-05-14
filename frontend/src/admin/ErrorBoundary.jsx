import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en el panel de administración:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5f5f5',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          zIndex: 999999,
          overflow: 'auto'
        }}>
          <h1>Error en el panel de administración</h1>
          <p>Hubo un problema al cargar el panel. Por favor, intenta nuevamente.</p>
          <details>
            <summary>Detalles del error</summary>
            <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuth');
              window.location.href = '/admin';
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Volver al inicio de sesión
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;