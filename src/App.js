import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import UserTypes from './components/UserTypes';
import FraudTypes from './components/FraudTypes';
import QuizComponent from './components/QuizComponent';
import RealTimeAlerts from './components/RealTimeAlerts';
import Resources from './components/Resources';
import ThreatMap from './components/ThreatMap';
import TransactionCheck from './components/TransactionCheck';
import SpamCheck from './components/SpamCheck';
import LiveDashboard from './components/LiveDashboard';
import Footer from './components/Footer';

function App() {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    theme: 'default',
    language: 'en',
    notifications: true,
    riskLevel: 'medium'
  });

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        // Load user preferences from localStorage
        const savedPreferences = localStorage.getItem('cyberShieldPreferences');
        if (savedPreferences) {
          setUserPreferences(JSON.parse(savedPreferences));
        }

        const savedUserType = localStorage.getItem('cyberShieldUserType');
        if (savedUserType) {
          setSelectedUserType(savedUserType);
        }

        const savedAlertsEnabled = localStorage.getItem('cyberShieldAlerts');
        if (savedAlertsEnabled !== null) {
          setAlertsEnabled(JSON.parse(savedAlertsEnabled));
        }

        // Simulate API loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    // Save user preferences to localStorage
    localStorage.setItem('cyberShieldPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  useEffect(() => {
    // Save user type to localStorage
    if (selectedUserType) {
      localStorage.setItem('cyberShieldUserType', selectedUserType);
    }
  }, [selectedUserType]);

  useEffect(() => {
    // Save alerts preference
    localStorage.setItem('cyberShieldAlerts', JSON.stringify(alertsEnabled));
  }, [alertsEnabled]);

  useEffect(() => {
    // Real-time threat monitoring
    if (alertsEnabled) {
      const interval = setInterval(() => {
        // This would connect to a real fraud detection API
        console.log('🔍 Monitoring for new fraud alerts...');
        
        // Check for location-based threats (mock implementation)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(`📍 Monitoring threats for location: ${position.coords.latitude}, ${position.coords.longitude}`);
            },
            (error) => {
              console.log('Location access denied, using general threat monitoring');
            }
          );
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    }
  }, [alertsEnabled]);

  // Loading screen
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--gradient-primary)',
        color: 'white'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🛡️</div>
        <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>CyberShield</h1>
        <p style={{ marginBottom: '32px', opacity: 0.8 }}>Initializing fraud protection systems...</p>
        <div className="loading-spinner"></div>
        <div style={{ marginTop: '24px', fontSize: '0.9rem', opacity: 0.7 }}>
          Connecting to threat intelligence network...
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <RealTimeAlerts 
        enabled={alertsEnabled} 
        setEnabled={setAlertsEnabled}
        userType={selectedUserType}
        preferences={userPreferences}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/user-types" 
          element={
            <UserTypes 
              selectedUserType={selectedUserType}
              setSelectedUserType={setSelectedUserType}
              preferences={userPreferences}
              setPreferences={setUserPreferences}
            />
          } 
        />
        <Route 
          path="/fraud-types" 
          element={
            <FraudTypes 
              userType={selectedUserType}
              preferences={userPreferences}
            />
          } 
        />
        <Route 
          path="/quiz" 
          element={
            <QuizComponent 
              userType={selectedUserType}
              preferences={userPreferences}
              setPreferences={setUserPreferences}
            />
          } 
        />
        <Route 
          path="/resources" 
          element={
            <Resources 
              userType={selectedUserType}
              preferences={userPreferences}
            />
          } 
        />
        <Route 
          path="/threat-map" 
          element={
            <ThreatMap 
              userType={selectedUserType}
              preferences={userPreferences}
            />
          } 
        />
        <Route 
          path="/transaction-check" 
          element={
            <TransactionCheck 
              userType={selectedUserType}
              preferences={userPreferences}
            />
          } 
        />
        <Route 
          path="/spam-check" 
          element={
            <SpamCheck 
              userType={selectedUserType}
              preferences={userPreferences}
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <LiveDashboard 
              userType={selectedUserType}
              preferences={userPreferences}
            />
          } 
        />
        
        {/* Additional Routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/data-protection" element={<DataProtection />} />
        <Route path="/api-status" element={<APIStatus />} />
        <Route path="/system-health" element={<SystemHealth />} />
      </Routes>
      
      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        .App {
          min-height: 100vh;
          position: relative;
        }
        
        .loaded {
          animation: fadeIn 0.5s ease-in;
        }
        
        /* Smooth page transitions */
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .page-transition-exit {
          opacity: 1;
          transform: translateY(0);
        }
        
        .page-transition-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.3s, transform 0.3s;
        }
      `}</style>
    </div>
  );
}

// Placeholder components for additional pages
const PrivacyPolicy = () => (
  <div className="section">
    <div className="container">
      <div className="card">
        <h1>Privacy Policy</h1>
        <p>Your privacy and data protection information will be displayed here.</p>
      </div>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="section">
    <div className="container">
      <div className="card">
        <h1>Terms of Service</h1>
        <p>Terms and conditions for using CyberShield platform.</p>
      </div>
    </div>
  </div>
);

const DataProtection = () => (
  <div className="section">
    <div className="container">
      <div className="card">
        <h1>Data Protection</h1>
        <p>Information about how we protect your data and comply with regulations.</p>
      </div>
    </div>
  </div>
);

const APIStatus = () => (
  <div className="section">
    <div className="container">
      <div className="card success-card">
        <h1>🟢 API Status: Operational</h1>
        <p>All systems are running normally. Last check: {new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
);

const SystemHealth = () => (
  <div className="section">
    <div className="container">
      <div className="card info-card">
        <h1>⚡ System Health Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div>
            <strong>Uptime:</strong> 99.9%
          </div>
          <div>
            <strong>Response Time:</strong> 45ms
          </div>
          <div>
            <strong>Active Users:</strong> 15,247
          </div>
          <div>
            <strong>Threats Blocked:</strong> 1,423
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
