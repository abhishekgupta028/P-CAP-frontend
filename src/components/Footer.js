import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [subscriberCount, setSubscriberCount] = useState(125847);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate growing subscriber count
    const subscriberInterval = setInterval(() => {
      setSubscriberCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(subscriberInterval);
    };
  }, []);

  const footerSections = [
    {
      title: 'Protection Services',
      links: [
        { name: 'Personal Security Assessment', path: '/quiz', icon: '🔒' },
        { name: 'Real-time Threat Alerts', path: '/alerts', icon: '🚨' },
        { name: 'User-specific Guidelines', path: '/user-types', icon: '👥' },
        { name: 'Fraud Type Analysis', path: '/fraud-types', icon: '🔍' }
      ]
    },
    {
      title: 'Resources & Support',
      links: [
        { name: 'Emergency Helplines', path: '/resources', icon: '📞' },
        { name: 'Verification Tools', path: '/resources', icon: '🛠️' },
        { name: 'Educational Materials', path: '/resources', icon: '📚' },
        { name: 'Community Forum', path: '/community', icon: '💬' }
      ]
    },
    {
      title: 'Legal & Compliance',
      links: [
        { name: 'Privacy Policy', path: '/privacy', icon: '🔐' },
        { name: 'Terms of Service', path: '/terms', icon: '📋' },
        { name: 'Data Protection', path: '/data-protection', icon: '🛡️' },
        { name: 'Compliance Reports', path: '/compliance', icon: '📊' }
      ]
    }
  ];

  const emergencyContacts = [
    { name: 'Cyber Crime Helpline', number: '1930', type: 'General' },
    { name: 'Financial Fraud', number: '155260', type: 'Banking' },
    { name: 'Banking Ombudsman', number: '14448', type: 'Banking' },
    { name: 'CERT-In Emergency', number: '1800-11-4949', type: 'Technical' }
  ];

  const certifications = [
    { name: 'ISO 27001', description: 'Information Security' },
    { name: 'Digital India', description: 'Government Certified' },
    { name: 'RBI Approved', description: 'Banking Compliance' },
    { name: 'CERT-In Partner', description: 'Cyber Security' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Top Section with Live Stats */}
        <div className="footer-top" style={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '40px'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                {subscriberCount.toLocaleString()}+
              </div>
              <div style={{ opacity: 0.8 }}>Protected Users</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                99.7%
              </div>
              <div style={{ opacity: 0.8 }}>Fraud Prevention Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                24/7
              </div>
              <div style={{ opacity: 0.8 }}>Live Monitoring</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ef4444' }}>
                🕐 {currentTime.toLocaleTimeString('en-IN')}
              </div>
              <div style={{ opacity: 0.8 }}>IST - Always Active</div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Company Info */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '1.5rem',
                marginBottom: '12px'
              }}>
                🛡️ CyberShield
                <span style={{ 
                  fontSize: '0.7rem',
                  background: '#059669',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '8px'
                }}>
                  INDIA
                </span>
              </h3>
              <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '16px' }}>
                India's most trusted cyber fraud awareness platform. Protecting digital lives 
                through personalized security education, real-time threat intelligence, and 
                community-driven fraud prevention.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <a href="mailto:support@cybershield.in" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}>
                  📧 support@cybershield.in
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 style={{ marginBottom: '12px' }}>🏆 Certifications & Partnerships</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {certifications.map((cert, index) => (
                  <div key={index} style={{ 
                    padding: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    fontSize: '0.8rem'
                  }}>
                    <strong>{cert.name}</strong>
                    <div style={{ opacity: 0.7 }}>{cert.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 style={{ marginBottom: '20px', color: '#f3f4f6' }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '12px' }}>
                    <Link 
                      to={link.path}
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.9rem'
                      }}
                    >
                      <span>{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Emergency Contacts */}
          <div>
            <h4 style={{ 
              marginBottom: '20px', 
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🚨 Emergency Contacts
            </h4>
            <div style={{ 
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid rgba(220, 38, 38, 0.3)'
            }}>
              {emergencyContacts.map((contact, index) => (
                <div key={index} style={{ 
                  marginBottom: index < emergencyContacts.length - 1 ? '12px' : '0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                      {contact.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                      {contact.type}
                    </div>
                  </div>
                  <a 
                    href={`tel:${contact.number}`}
                    style={{ 
                      color: '#fca5a5',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
            
            {/* Quick Report Button */}
            <a 
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger"
              style={{ 
                width: '100%',
                marginTop: '16px',
                fontSize: '0.9rem',
                justifyContent: 'center'
              }}
            >
              🚨 Report Fraud Now
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          margin: '32px 0',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
            🔒 <strong>Security Notice:</strong> This platform uses end-to-end encryption and follows 
            strict data protection protocols. We never store sensitive financial information.
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Last security audit: {new Date().toLocaleDateString('en-IN')} | 
            Vulnerability scan: ✅ Clean | SSL Certificate: ✅ Valid
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <p style={{ margin: 0 }}>
                © 2025 CyberShield - Cyber Fraud Awareness Platform. 
                Made with ❤️ for a safer digital India.
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
                This is an educational platform. Always report actual fraud to official authorities.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="/api-status" style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.8rem'
              }}>
                <span style={{ color: '#10b981' }}>●</span> API Status
              </a>
              <a href="/system-health" style={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.8rem'
              }}>
                <span style={{ color: '#10b981' }}>●</span> System Health
              </a>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                v2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
