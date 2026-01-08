import React, { useState, useEffect } from 'react';

const RealTimeAlerts = ({ enabled, setEnabled }) => {
  const [alerts, setAlerts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (enabled) {
      // Simulated real-time alerts
      const fraudAlerts = [
        {
          id: 1,
          type: 'UPI Scam',
          message: 'New UPI scam detected: Fake Swiggy delivery agents asking for OTP',
          severity: 'High',
          timestamp: new Date(),
          location: 'Mumbai, Delhi, Bangalore'
        },
        {
          id: 2,
          type: 'Phishing Alert',
          message: 'Fake SBI website circulating with URL sbi-secure.com',
          severity: 'Critical',
          timestamp: new Date(),
          location: 'Pan India'
        },
        {
          id: 3,
          type: 'Investment Scam',
          message: 'Fake cryptocurrency platform "CryptoEarn" promising 50% monthly returns',
          severity: 'High',
          timestamp: new Date(),
          location: 'Pune, Hyderabad'
        },
        {
          id: 4,
          type: 'Job Scam',
          message: 'Fake Amazon work-from-home jobs asking for registration fees',
          severity: 'Medium',
          timestamp: new Date(),
          location: 'Chennai, Kolkata'
        },
        {
          id: 5,
          type: 'OTP Scam',
          message: 'Fraudsters calling as Airtel customer care asking for OTP',
          severity: 'High',
          timestamp: new Date(),
          location: 'North India'
        }
      ];

      const interval = setInterval(() => {
        // Simulate receiving a new alert
        const randomAlert = fraudAlerts[Math.floor(Math.random() * fraudAlerts.length)];
        const newAlert = {
          ...randomAlert,
          id: Date.now(),
          timestamp: new Date()
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]); // Keep only latest 5 alerts
        setShowAlert(true);
        
        // Auto-hide alert after 5 seconds
        setTimeout(() => setShowAlert(false), 5000);
      }, 15000); // New alert every 15 seconds

      return () => clearInterval(interval);
    }
  }, [enabled]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#d63031';
      case 'High': return '#e17055';
      case 'Medium': return '#fdcb6e';
      default: return '#74b9ff';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div>
      {/* Alert Banner */}
      {showAlert && alerts.length > 0 && (
        <div className="alert-banner">
          🚨 NEW FRAUD ALERT: {alerts[0].message}
          <button 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              float: 'right',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
            onClick={() => setShowAlert(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* Enable/Disable Alerts */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000 
      }}>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`btn ${enabled ? 'btn-primary' : 'btn-secondary'}`}
          style={{
            borderRadius: '50px',
            padding: '15px 20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          🔔 {enabled ? 'Alerts ON' : 'Enable Alerts'}
        </button>
      </div>

      {/* Alert History Panel */}
      {enabled && alerts.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          width: '350px',
          maxHeight: '400px',
          overflowY: 'auto',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          zIndex: 999
        }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            🚨 Recent Fraud Alerts
            <span style={{ 
              marginLeft: 'auto', 
              background: '#ff6b6b', 
              color: 'white', 
              borderRadius: '50%', 
              width: '25px', 
              height: '25px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '0.8rem' 
            }}>
              {alerts.length}
            </span>
          </h3>
          
          {alerts.map((alert, index) => (
            <div 
              key={alert.id} 
              style={{
                marginBottom: '15px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '10px',
                borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <strong style={{ color: getSeverityColor(alert.severity) }}>
                  {alert.type}
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                  {formatTime(alert.timestamp)}
                </span>
              </div>
              
              <p style={{ 
                fontSize: '0.9rem', 
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>
                {alert.message}
              </p>
              
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                📍 {alert.location}
              </div>
            </div>
          ))}
          
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button 
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
              onClick={() => setAlerts([])}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeAlerts;
