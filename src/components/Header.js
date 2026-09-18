import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/cyber-ai', label: 'AI Assistant', icon: '🤖' },
    { path: '/dashboard', label: 'Live Dashboard', icon: '📊' },
    { path: '/user-types', label: 'User Profiles', icon: '👥' },
    { path: '/fraud-types', label: 'Fraud Types', icon: '🚨' },
    { path: '/transaction-check', label: 'Check Transaction', icon: '💳' },
    { path: '/spam-check', label: 'Spam Detection', icon: '📧' },
    { path: '/quiz', label: 'Security Quiz', icon: '🧠' },
    { path: '/resources', label: 'Resources', icon: '📚' }
  ];

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`} style={{
      background: isScrolled 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s ease',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.05)'
    }}>
      <div className="nav-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 20px',
        height: '70px'
      }}>
        <Link to="/" className="logo" style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          minWidth: '200px',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🛡️</span>
          <span style={{ 
            fontWeight: '800',
            fontSize: '1.6rem',
            letterSpacing: '-0.5px'
          }}>
            CyberShield
          </span>
          <span style={{ 
            fontSize: '0.65rem', 
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '2px 7px',
            borderRadius: '8px',
            fontWeight: '700',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
            letterSpacing: '0.5px'
          }}>
            INDIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          marginLeft: '20px', 
          marginRight: '20px' 
        }}>
          <ul className="nav-links" style={{
            display: 'flex',
            gap: '12px',
            listStyle: 'none',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px',
                    padding: '11px 18px',
                    height: '46px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: location.pathname === item.path ? '#2563eb' : '#4b5563',
                    background: location.pathname === item.path 
                      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.1))' 
                      : 'rgba(249, 250, 251, 0.95)',
                    border: location.pathname === item.path 
                      ? '2px solid rgba(37, 99, 235, 0.5)' 
                      : '2px solid rgba(229, 231, 235, 0.8)',
                    boxShadow: location.pathname === item.path 
                      ? '0 4px 14px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(37, 99, 235, 0.08))';
                      e.target.style.color = '#2563eb';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.borderColor = 'rgba(37, 99, 235, 0.4)';
                      e.target.style.boxShadow = '0 6px 18px rgba(37, 99, 235, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.background = 'rgba(249, 250, 251, 0.95)';
                      e.target.style.color = '#4b5563';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.borderColor = 'rgba(229, 231, 235, 0.8)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>{item.icon}</span>
                  <span style={{ lineHeight: 1 }}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(37, 99, 235, 0.1)',
            border: '2px solid rgba(37, 99, 235, 0.2)',
            borderRadius: '10px',
            color: '#2563eb',
            padding: '10px 14px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            minWidth: '48px',
            height: '44px'
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Clerk Authentication */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  height: '46px',
                  fontSize: '0.88rem',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  border: '2px solid rgba(37, 99, 235, 0.5)',
                  borderRadius: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 22px rgba(37, 99, 235, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                }}
              >
                <span>🔐</span>
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              height: '46px',
              padding: '0 12px',
              background: 'rgba(37, 99, 235, 0.1)',
              borderRadius: '12px',
              border: '2px solid rgba(37, 99, 235, 0.25)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className="mobile-menu"
        style={{
          display: isMenuOpen ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          background: 'rgba(31, 41, 55, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px',
          zIndex: 1000,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '10px' }}>
              <Link 
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  background: location.pathname === item.path ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: location.pathname === item.path ? '2px solid rgba(37, 99, 235, 0.5)' : '2px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                <span style={{ fontWeight: '600' }}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @media (max-width: 1600px) {
          .nav-links {
            gap: 11px !important;
          }
          
          .nav-link {
            padding: 11px 17px !important;
            font-size: 0.86rem !important;
          }
        }
        
        @media (max-width: 1400px) {
          .nav-links {
            gap: 10px !important;
          }
          
          .nav-link {
            padding: 10px 16px !important;
            font-size: 0.84rem !important;
            gap: 6px !important;
          }
          
          .logo {
            min-width: 190px !important;
          }
          
          .logo span:nth-child(2) {
            font-size: 1.5rem !important;
          }
        }
        
        @media (max-width: 1200px) {
          .nav-links {
            gap: 9px !important;
          }
          
          .nav-link {
            padding: 10px 15px !important;
            font-size: 0.82rem !important;
            gap: 6px !important;
          }
          
          .logo {
            min-width: 180px !important;
          }
        }
        
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-toggle {
            display: flex !important;
          }
          
          .logo span:last-child {
            display: none;
          }
        }
        
        @media (max-width: 576px) {
          .nav-container {
            padding: 0 16px !important;
            height: 64px !important;
          }
          
          .logo {
            min-width: auto !important;
          }
          
          .logo span:nth-child(2) {
            font-size: 1.4rem !important;
          }
        }
        
        @media (min-width: 993px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
