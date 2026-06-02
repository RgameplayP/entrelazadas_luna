import { useState, useEffect } from 'react';

function ProductForm({ productoEdit, categorias, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria_id: '',
    precio: '',
    descripcion: '',
    descripcion_larga: '',
    imagenes: [''] // Comenzamos con un campo vacío
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (productoEdit) {
      setFormData({
        nombre: productoEdit.nombre,
        categoria_id: productoEdit.categoria_id,
        precio: productoEdit.precio,
        descripcion: productoEdit.descripcion || '',
        descripcion_larga: productoEdit.descripcion_larga || '',
        imagenes: productoEdit.imagenes && productoEdit.imagenes.length ? [...productoEdit.imagenes] : ['']
      });
    }
  }, [productoEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (index, value) => {
    const nuevasImagenes = [...formData.imagenes];
    nuevasImagenes[index] = value;
    setFormData({ ...formData, imagenes: nuevasImagenes });
  };

  // Agregar nuevo campo de imagen
  const agregarCampoImagen = () => {
    setFormData({
      ...formData,
      imagenes: [...formData.imagenes, '']
    });
  };

  // Eliminar campo de imagen
  const eliminarCampoImagen = (index) => {
    if (formData.imagenes.length <= 1) return; // Mantener al menos 1 campo
    const nuevasImagenes = formData.imagenes.filter((_, i) => i !== index);
    setFormData({ ...formData, imagenes: nuevasImagenes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    const imagenesFiltradas = formData.imagenes.filter(img => img.trim() !== '');

    if (imagenesFiltradas.length === 0) {
      setMensaje('❌ Agrega al menos una URL de imagen');
      setCargando(false);
      return;
    }

    const producto = {
      nombre: formData.nombre,
      categoria_id: parseInt(formData.categoria_id),
      precio: formData.precio,
      descripcion: formData.descripcion,
      descripcion_larga: formData.descripcion_larga,
      imagenes: imagenesFiltradas
    };

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    try {
      let response;
      if (productoEdit) {
        response = await fetch(`${API_URL}/api/productos/${productoEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(producto)
        });
      } else {
        response = await fetch(`${API_URL}/api/productos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(producto)
        });
      }

      if (response.ok) {
        setMensaje(productoEdit ? '✅ Producto actualizado!' : '✅ Producto creado!');
        setTimeout(() => {
          setMensaje('');
          if (!productoEdit) {
            setFormData({
              nombre: '',
              categoria_id: '',
              precio: '',
              descripcion: '',
              descripcion_larga: '',
              imagenes: ['']
            });
          }
          onSave();
        }, 1500);
      } else {
        const error = await response.text();
        console.error('Error respuesta:', error);
        setMensaje('❌ Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error de conexión');
    }
    setCargando(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {mensaje && (
        <div style={{
          padding: '10px',
          backgroundColor: mensaje.includes('✅') ? '#e8f5e9' : '#ffebee',
          color: mensaje.includes('✅') ? '#2e7d32' : '#c62828',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          {mensaje}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Producto *</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D2B48C', borderRadius: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categoría *</label>
          <select name="categoria_id" value={formData.categoria_id} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D2B48C', borderRadius: '8px' }}>
            <option value="">Seleccionar categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Precio (ej: €25.00) *</label>
          <input type="text" name="precio" value={formData.precio} onChange={handleChange} placeholder="€25.00" required style={{ width: '100%', padding: '10px', border: '1px solid #D2B48C', borderRadius: '8px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción Corta *</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required rows="2" style={{ width: '100%', padding: '10px', border: '1px solid #D2B48C', borderRadius: '8px' }} />
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción Larga (Propiedades, materiales, etc.)</label>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
          Usa guiones (-) para crear listas. Ejemplo: <br />
          - Claridad Mental: Ayuda a mejorar la concentración<br />
          - Equilibrio y Armonía: Fomenta la paz interior
        </p>
        <textarea 
          name="descripcion_larga" 
          value={formData.descripcion_larga} 
          onChange={handleChange} 
          rows="8" 
          style={{ width: '100%', padding: '10px', border: '1px solid #D2B48C', borderRadius: '8px', fontFamily: 'monospace' }} 
          placeholder="Escribe aquí la descripción larga del producto..."
        />
      </div>

      {/* URLs de Imágenes DINÁMICAS */}
      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URLs de Imágenes</label>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
          💡 Usa Cloudinary o cualquier servicio de imágenes. Puedes agregar cuantas quieras.
        </p>
        
        {formData.imagenes.map((url, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
            <input 
              type="url" 
              placeholder={`URL de imagen ${index + 1}`} 
              value={url} 
              onChange={(e) => handleImageChange(index, e.target.value)} 
              style={{ flex: 1, padding: '10px', border: '1px solid #D2B48C', borderRadius: '8px' }} 
            />
            {formData.imagenes.length > 1 && (
              <button
                type="button"
                onClick={() => eliminarCampoImagen(index)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={agregarCampoImagen}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          + Agregar otra imagen
        </button>
        <p style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>
          Puedes agregar tantas imágenes como quieras
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" disabled={cargando} style={{ padding: '12px 24px', backgroundColor: '#8B5A2B', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {cargando ? 'Guardando...' : (productoEdit ? 'Actualizar Producto' : 'Crear Producto')}
        </button>
        {productoEdit && (
          <button type="button" onClick={onCancel} style={{ padding: '12px 24px', backgroundColor: '#999', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;