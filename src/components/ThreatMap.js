import React, { useState, useEffect } from 'react';

const ThreatMap = () => {
  const [activeState, setActiveState] = useState(null);
  const [threatData, setThreatData] = useState({});

  const indianStates = [
    { name: 'Maharashtra', cases: 15420, trending: 'up', risk: 'high' },
    { name: 'Delhi', cases: 12300, trending: 'up', risk: 'critical' },
    { name: 'Karnataka', cases: 11800, trending: 'stable', risk: 'high' },
    { name: 'Tamil Nadu', cases: 9650, trending: 'down', risk: 'medium' },
    { name: 'Gujarat', cases: 8900, trending: 'up', risk: 'high' },
    { name: 'Uttar Pradesh', cases: 8500, trending: 'stable', risk: 'medium' },
    { name: 'West Bengal', cases: 7200, trending: 'up', risk: 'medium' },
    { name: 'Rajasthan', cases: 6800, trending: 'down', risk: 'medium' },
    { name: 'Telangana', cases: 6500, trending: 'up', risk: 'high' },
    { name: 'Punjab', cases: 5400, trending: 'stable', risk: 'medium' }
  ];

  const fraudHotspots = [
    { city: 'Mumbai', type: 'UPI Fraud', cases: 3200, lat: 19.0760, lng: 72.8777 },
    { city: 'Delhi', type: 'OTP Scam', cases: 2800, lat: 28.7041, lng: 77.1025 },
    { city: 'Bangalore', type: 'Investment Scam', cases: 2400, lat: 12.9716, lng: 77.5946 },
    { city: 'Hyderabad', type: 'Job Fraud', cases: 1900, lat: 17.3850, lng: 78.4867 },
    { city: 'Chennai', type: 'Shopping Scam', cases: 1600, lat: 13.0827, lng: 80.2707 },
    { city: 'Pune', type: 'Phishing', cases: 1400, lat: 18.5204, lng: 73.8567 }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#059669';
      default: return '#6b7280';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setThreatData(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString('en-IN')
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="threat-map-container">
      <div className="card premium-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>🗺️ Live Threat Intelligence Map</h2>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            Last updated: {threatData.lastUpdated || 'Just now'}
          </div>
        </div>

        {/* India Map Visualization */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* State-wise Data */}
          <div>
            <h3 style={{ marginBottom: '20px' }}>📊 State-wise Fraud Cases</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {indianStates.map((state, index) => (
                <div 
                  key={state.name}
                  style={{
                    padding: '12px 16px',
                    background: activeState === state.name ? 'rgba(37, 99, 235, 0.1)' : '#f8fafc',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${activeState === state.name ? '#2563eb' : 'transparent'}`
                  }}
                  onClick={() => setActiveState(activeState === state.name ? null : state.name)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{state.name}</strong>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {state.cases.toLocaleString()} cases
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{getTrendIcon(state.trending)}</span>
                      <span 
                        className="badge"
                        style={{ 
                          background: getRiskColor(state.risk),
                          color: 'white',
                          fontSize: '0.75rem'
                        }}
                      >
                        {state.risk}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Hotspots */}
          <div>
            <h3 style={{ marginBottom: '20px' }}>🔥 Current Fraud Hotspots</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {fraudHotspots.map((hotspot, index) => (
                <div 
                  key={hotspot.city}
                  className="warning-card"
                  style={{ 
                    padding: '16px',
                    animation: `pulse 2s infinite ${index * 0.2}s`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: '0 0 8px 0' }}>📍 {hotspot.city}</h4>
                      <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                        <strong>Type:</strong> {hotspot.type}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#dc2626', fontWeight: 'bold' }}>
                        {hotspot.cases} active cases
                      </div>
                    </div>
                    <div style={{ 
                      background: '#dc2626',
                      color: 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      🚨
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Statistics */}
        <div className="info-card" style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>📈 Real-time Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
                {indianStates.reduce((sum, state) => sum + state.cases, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.9rem' }}>Total Cases This Month</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea580c' }}>
                {indianStates.filter(s => s.trending === 'up').length}
              </div>
              <div style={{ fontSize: '0.9rem' }}>States with Rising Cases</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
                {indianStates.filter(s => s.trending === 'down').length}
              </div>
              <div style={{ fontSize: '0.9rem' }}>States Improving</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0891b2' }}>
                24/7
              </div>
              <div style={{ fontSize: '0.9rem' }}>Monitoring Active</div>
            </div>
          </div>
        </div>

        {/* Alert Section */}
        <div className="danger-card" style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>⚠️ High-Risk Alerts</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ 
              padding: '12px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '6px',
              borderLeft: '4px solid #dc2626'
            }}>
              <strong>Delhi NCR:</strong> Surge in fake OTP calls targeting senior citizens
            </div>
            <div style={{ 
              padding: '12px',
              background: 'rgba(234, 88, 12, 0.1)',
              borderRadius: '6px',
              borderLeft: '4px solid #ea580c'
            }}>
              <strong>Mumbai:</strong> New UPI fraud pattern detected in financial district
            </div>
            <div style={{ 
              padding: '12px',
              background: 'rgba(217, 119, 6, 0.1)',
              borderRadius: '6px',
              borderLeft: '4px solid #d97706'
            }}>
              <strong>Bangalore:</strong> Investment scam targeting IT professionals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
