CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id),
    precio VARCHAR(20) NOT NULL,
    descripcion TEXT,
    imagenes TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías
INSERT INTO categorias (nombre) VALUES 
('Collares'), 
('Manillas'), 
('Brazaletes'), 
('Aretes')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, categoria_id, precio, descripcion, imagenes) VALUES 
(
    'Collar de Macramé con Ámbar', 
    1, 
    '€25', 
    'Hermoso collar artesanal hecho con nudos macramé y piedra de ámbar natural',
    ARRAY['https://via.placeholder.com/400x400?text=Collar']
),
(
    'Manilla Artesanal Beige', 
    2, 
    '€12', 
    'Pulsera tejida a mano con hilo de algodón natural',
    ARRAY['https://via.placeholder.com/400x400?text=Manilla']
),
(
    'Brazalete Étnico', 
    3, 
    '€18', 
    'Brazalete ancho con patrones geométricos',
    ARRAY['https://via.placeholder.com/400x400?text=Brazalete']
),
(
    'Aretes de Macramé', 
    4, 
    '€15', 
    'Aretes colgantes tejidos con hilo de colores',
    ARRAY['https://via.placeholder.com/400x400?text=Aretes']
);