import React from 'react';

const ArtisanButton = ({ children, onClick, className, style }) => {
  return (
    <button
      className={`artisan-btn ${className || ''}`}
      onClick={onClick}
      style={style}
    >
      <span>{children}</span>
    </button>
  );
};

export default ArtisanButton;