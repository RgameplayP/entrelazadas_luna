import { useState, useEffect } from 'react';
import { logger } from '../../utils/logger';

function ImageUploader({ imagenes = [], onImagesUploaded, onOrderChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagenesLocales, setImagenesLocales] = useState([]);
  const [error, setError] = useState('');

  // Sincronizar con las props
  useEffect(() => {
    if (imagenes && Array.isArray(imagenes)) {
      setImagenesLocales(imagenes);
    }
  }, [imagenes]);

  // Configuración de Cloudinary
  const CLOUD_NAME = 'dzc5gormw';
  const UPLOAD_PRESET = 'entrelazadas_preset';

  // Subir imagen a Cloudinary
  const uploadToCloudinary = async (file) => {
    setUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Error al subir la imagen');
      }
      
      return data.secure_url;
    } catch (error) {
      logger.error('Error al subir imagen:', error);
      setError(`Error: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Manejar múltiples archivos
  const handleFiles = async (files) => {
    const fileList = Array.isArray(files) ? files : [files];
    const nuevasUrls = [];
    
    for (const file of fileList) {
      if (!file.type.startsWith('image/')) {
        setError(`❌ ${file.name} no es una imagen válida`);
        continue;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError(`❌ ${file.name} es muy grande (máx 5MB)`);
        continue;
      }
      
      const url = await uploadToCloudinary(file);
      if (url) nuevasUrls.push(url);
    }
    
    if (nuevasUrls.length > 0) {
      const nuevasImagenes = [...imagenesLocales, ...nuevasUrls];
      setImagenesLocales(nuevasImagenes);
      if (onImagesUploaded) {
        onImagesUploaded(nuevasUrls);
      }
    }
  };

  // FUNCIÓN PARA MOVER IMÁGENES
  const moveImage = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) return;
    
    const nuevasImagenes = [...imagenesLocales];
    const [imagenMovida] = nuevasImagenes.splice(dragIndex, 1);
    nuevasImagenes.splice(hoverIndex, 0, imagenMovida);
    
    setImagenesLocales(nuevasImagenes);
    
    if (onOrderChange) {
      onOrderChange(nuevasImagenes);
    }
  };

  // Eliminar imagen
  const removeImage = (index) => {
    const nuevasImagenes = imagenesLocales.filter((_, i) => i !== index);
    setImagenesLocales(nuevasImagenes);
    if (onOrderChange) {
      onOrderChange(nuevasImagenes);
    }
  };

  return (
    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #D2B48C' }}>
      <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', fontSize: '16px' }}>
        📁 Subir imágenes desde tu dispositivo
      </label>

      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '8px',
          marginBottom: '15px'
        }}>
          ❌ {error}
          <button onClick={() => setError('')} style={{ float: 'right', background: 'none', border: 'none', color: '#c62828', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Área de subida */}
      <div
        style={{
          border: `2px dashed ${dragActive ? '#8B5A2B' : '#D2B48C'}`,
          borderRadius: '12px',
          padding: '30px',
          textAlign: 'center',
          backgroundColor: dragActive ? 'rgba(139,90,43,0.05)' : '#FAF6F0',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const files = Array.from(e.dataTransfer.files);
          if (files.length > 0) {
            handleFiles(files);
          }
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>📷</div>
        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Arrastra imágenes o haz clic para seleccionar</p>
        <p style={{ fontSize: '12px', color: '#666' }}>JPG, PNG, WEBP, GIF (máx 5MB)</p>
        <p style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>
          📱 En móvil: Mantén presionada una imagen por 1 segundo y luego arrastra
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(Array.from(e.target.files))}
        />
        {uploading && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ width: '30px', height: '30px', border: '2px solid #D2B48C', borderTopColor: '#8B5A2B', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <p style={{ marginTop: '10px', fontSize: '12px' }}>Subiendo imagen...</p>
          </div>
        )}
      </div>

      {/* Galería de imágenes reordenables - Con soporte táctil */}
      {imagenesLocales.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
            🖱️ <strong>Arrastra las imágenes</strong> para reordenarlas (la primera es la principal)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {imagenesLocales.map((url, index) => (
              <DraggableImage
                key={`${url}-${index}`}
                url={url}
                index={index}
                isFirst={index === 0}
                onMove={moveImage}
                onRemove={removeImage}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// COMPONENTE CON SOPORTE PARA MÓVIL Y PC - CORREGIDO
function DraggableImage({ url, index, isFirst, onMove, onRemove }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [touchStartIndex, setTouchStartIndex] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);

  // ========== EVENTOS PARA PC (MOUSE) ==========
  const handleDragStart = (e) => {
    setDragIndex(index);
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    setDragIndex(null);
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (!isNaN(draggedIndex) && draggedIndex !== index) {
      onMove(draggedIndex, index);
    }
    setDragIndex(null);
  };

  // ========== EVENTOS PARA MÓVIL (TOUCH) ==========
  const handleTouchStart = (e) => {
    // Verificar si el toque fue en el botón
    const target = e.target;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return; // No hacer nada si tocó el botón
    }
    
    const element = e.currentTarget;
    
    // Cambiar cursor visual
    element.style.opacity = '0.7';
    element.style.transform = 'scale(1.05)';
    
    // Iniciar timer para long press
    const timer = setTimeout(() => {
      setTouchStartIndex(index);
      element.style.opacity = '0.5';
      element.style.transform = 'scale(0.95)';
      
      // Vibrar si el dispositivo lo soporta
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }, 500);
    
    setLongPressTimer(timer);
  };

  const handleTouchMove = (e) => {
    if (touchStartIndex === null) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const elementosEnPunto = document.elementsFromPoint(touch.clientX, touch.clientY);
    
    // Buscar el elemento imagen más cercano
    for (let elemento of elementosEnPunto) {
      const elementoImagen = elemento.closest?.('.draggable-image');
      if (elementoImagen && elementoImagen !== e.currentTarget) {
        const targetIndex = parseInt(elementoImagen.dataset.index);
        if (!isNaN(targetIndex) && targetIndex !== touchStartIndex) {
          onMove(touchStartIndex, targetIndex);
          setTouchStartIndex(targetIndex);
          break;
        }
      }
    }
  };

  const handleTouchEnd = (e) => {
    // Limpiar timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    // Resetear estilos
    const element = e.currentTarget;
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
    
    setTouchStartIndex(null);
  };

  // ========== MANEJADOR DEL BOTÓN ELIMINAR ==========
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove(index);
  };

  const handleRemoveTouch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove(index);
  };

  return (
    <div
      className="draggable-image"
      data-index={index}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        borderRadius: '10px',
        overflow: 'hidden',
        border: isFirst ? '3px solid #FFD700' : '2px solid #D2B48C',
        cursor: 'grab',
        backgroundColor: '#f5f5f5',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        touchAction: 'pan-y', // Permite scroll vertical
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <img
        src={url}
        alt={`Imagen ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none'
        }}
      />
      <button
        type="button"
        onClick={handleRemoveClick}
        onTouchStart={handleRemoveTouch}
        onTouchEnd={(e) => {
          e.stopPropagation();
        }}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          touchAction: 'manipulation',
          pointerEvents: 'auto'
        }}
      >
        ✕
      </button>
      {isFirst && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: '#FFD700',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 'bold',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          ★ Principal
        </div>
      )}
    </div>
  );
}

export default ImageUploader;