import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingChatWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // Hide widget if already on /cyber-ai page
  if (location.pathname === '/cyber-ai') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 9999
    }}>
      <button
        onClick={() => navigate('/cyber-ai')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: 'white',
          border: 'none',
          borderRadius: isHovered ? '24px' : '50%',
          width: isHovered ? 'auto' : '60px',
          height: '60px',
          padding: isHovered ? '0 20px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontWeight: '700',
          fontSize: '0.92rem'
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>🤖</span>
        {isHovered && (
          <span style={{ whiteSpace: 'nowrap', animation: 'fadeIn 0.2s ease-in' }}>
            CyberShield AI Assistant
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingChatWidget;
