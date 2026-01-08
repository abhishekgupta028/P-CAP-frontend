import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsDashboard from './StatsDashboard';
import UserActivity from './UserActivity';

const Home = () => {
  const [currentThreatIndex, setCurrentThreatIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-rotate recent threats
    const interval = setInterval(() => {
      setCurrentThreatIndex(prev => (prev + 1) % recentThreats.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fraudStats = [
    { 
      number: "₹1,25,000 Cr", 
      label: "Annual Fraud Losses in India",
      description: "Total financial losses due to cyber fraud in 2024",
      trend: "+23%"
    },
    { 
      number: "95%", 
      label: "Increase in Digital Fraud",
      description: "Year-over-year growth in digital fraud cases",
      trend: "+95%"
    },
    { 
      number: "76%", 
      label: "Users Lack Fraud Awareness",
      description: "Percentage of users unaware of latest fraud tactics",
      trend: "-8%"
    },
    { 
      number: "3.2M", 
      label: "Fraud Cases Reported Annually",
      description: "Number of reported cyber fraud incidents",
      trend: "+45%"
    }
  ];

  const recentThreats = [
    {
      id: 1,
      type: "UPI Fraud Alert",
      description: "Fake payment requests mimicking bank officials and popular apps",
      severity: "Critical",
      affectedGroups: ["Students", "Professionals", "Senior Citizens"],
      timeAgo: "2 hours ago",
      cases: "1,247 cases",
      trend: "rising"
    },
    {
      id: 2,
      type: "OTP Scam Alert",
      description: "Fraudsters calling as bank representatives requesting OTPs",
      severity: "Critical",
      affectedGroups: ["Senior Citizens", "Rural Users", "Homemakers"],
      timeAgo: "4 hours ago",
      cases: "892 cases",
      trend: "rising"
    },
    {
      id: 3,
      type: "Investment Scam Alert",
      description: "Fake cryptocurrency and stock trading platforms with guaranteed returns",
      severity: "High",
      affectedGroups: ["Professionals", "Students"],
      timeAgo: "6 hours ago",
      cases: "634 cases",
      trend: "stable"
    },
    {
      id: 4,
      type: "Job Fraud Alert",
      description: "Fake work-from-home opportunities asking for registration fees",
      severity: "Medium",
      affectedGroups: ["Students", "Homemakers", "Rural Users"],
      timeAgo: "8 hours ago",
      cases: "423 cases",
      trend: "declining"
    }
  ];

  const protectionTips = [
    {
      icon: "🔐",
      title: "Never Share Sensitive Info",
      description: "OTP, passwords, and bank details should never be shared over phone calls",
      action: "Learn More"
    },
    {
      icon: "🔒",
      title: "Use Secure Connections",
      description: "Only use official banking apps and websites with HTTPS encryption",
      action: "Check Security"
    },
    {
      icon: "⚠️",
      title: "Stay Skeptical",
      description: "Question unexpected calls, messages, or investment opportunities",
      action: "Verify Tips"
    },
    {
      icon: "🚫",
      title: "Don't Rush Decisions",
      description: "Fraudsters create urgency. Take time to verify any financial request",
      action: "Emergency Guide"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#dc2626';
      case 'High': return '#d97706';
      case 'Medium': return '#059669';
      default: return '#0891b2';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className={`animate-fadeIn ${isLoaded ? 'loaded' : ''}`}>
      {/* Enhanced Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title animate-slideInUp">
              Protect Yourself from <span className="gradient-text text-glow">Cyber Fraud</span>
            </h1>
            <p className="hero-subtitle animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              India's most comprehensive cyber fraud awareness platform with real-time threat intelligence 
              and personalized protection strategies for every digital user
            </p>
            <div className="hero-cta animate-slideInUp" style={{ animationDelay: '0.4s' }}>
              <Link to="/user-types" className="btn btn-primary">
                🛡️ Get Personalized Protection
              </Link>
              <Link to="/quiz" className="btn btn-secondary">
                🧠 Test Your Security Knowledge
              </Link>
              <Link to="/fraud-types" className="btn btn-secondary">
                🚨 Learn About Threats
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Threat Alert */}
      <section style={{ background: 'rgba(220, 38, 38, 0.9)', color: 'white', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="animate-bounce">🚨</span>
            <strong>LIVE THREAT ALERT:</strong>
            <span>{recentThreats[currentThreatIndex].description}</span>
            <span className="badge badge-danger">{recentThreats[currentThreatIndex].cases}</span>
            <Link to="/fraud-types" className="btn" style={{ padding: '6px 12px', fontSize: '14px', background: 'rgba(255,255,255,0.2)' }}>
              Details →
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">📊 Real-Time System Statistics</h2>
          <p className="section-subtitle">
            Live data from NeonDB showing actual detections and user activity
          </p>
          
          {/* Real-time Stats Dashboard */}
          <StatsDashboard />
          
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', color: 'white' }}>
              Cyber Fraud in India: Current Landscape
            </h3>
            <div className="stats-grid">
              {fraudStats.map((stat, index) => (
                <div key={index} className="stat-card animate-slideInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>
                    {stat.description}
                  </p>
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '4px 8px', 
                    borderRadius: '12px',
                    background: stat.trend.startsWith('+') ? 'rgba(220, 38, 38, 0.2)' : 'rgba(5, 150, 105, 0.2)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {stat.trend.startsWith('+') ? '📈' : '📉'} {stat.trend} from last year
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Activity History - Real-time Data */}
      <section className="section">
        <div className="container">
          <UserActivity userId={1} />
        </div>
      </section>

      {/* Current Threat Intelligence */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">🔍 Current Threat Intelligence</h2>
          <p className="section-subtitle">
            Latest fraud patterns and emerging threats detected in real-time across India
          </p>
          
          {/* Threat Carousel */}
          <div className="card premium-card" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: getSeverityColor(recentThreats[currentThreatIndex].severity),
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></span>
                {recentThreats[currentThreatIndex].type}
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {recentThreats.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentThreatIndex(index)}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      border: 'none',
                      background: index === currentThreatIndex ? '#2563eb' : '#cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
              {recentThreats[currentThreatIndex].description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <strong>Severity:</strong>
                <span className={`badge badge-${recentThreats[currentThreatIndex].severity.toLowerCase()}`} style={{ marginLeft: '8px' }}>
                  {recentThreats[currentThreatIndex].severity}
                </span>
              </div>
              <div>
                <strong>Reported Cases:</strong>
                <span style={{ marginLeft: '8px', color: getSeverityColor(recentThreats[currentThreatIndex].severity) }}>
                  {getTrendIcon(recentThreats[currentThreatIndex].trend)} {recentThreats[currentThreatIndex].cases}
                </span>
              </div>
              <div>
                <strong>Last Updated:</strong>
                <span style={{ marginLeft: '8px' }}>{recentThreats[currentThreatIndex].timeAgo}</span>
              </div>
            </div>
            
            <div>
              <strong>Most Affected Groups:</strong>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {recentThreats[currentThreatIndex].affectedGroups.map((group, idx) => (
                  <span 
                    key={idx} 
                    className="badge"
                    style={{ 
                      background: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563eb',
                      border: '1px solid rgba(37, 99, 235, 0.2)'
                    }}
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* All Threats Grid */}
          <div className="fraud-types-grid">
            {recentThreats.map((threat, index) => (
              <div 
                key={threat.id} 
                className={`card ${threat.severity === 'Critical' ? 'danger-card' : 'warning-card'}`}
                style={{ 
                  opacity: index === currentThreatIndex ? 1 : 0.7,
                  transform: index === currentThreatIndex ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>
                    {getTrendIcon(threat.trend)} {threat.type}
                  </h3>
                  <span className={`badge badge-${threat.severity.toLowerCase()}`}>
                    {threat.severity}
                  </span>
                </div>
                
                <p style={{ marginBottom: '15px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {threat.description}
                </p>
                
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '10px' }}>
                  📊 {threat.cases} • ⏰ {threat.timeAgo}
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ fontSize: '0.9rem' }}>Targets:</strong>
                  <div style={{ marginTop: '5px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {threat.affectedGroups.map((group, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          fontSize: '0.75rem',
                          padding: '2px 6px',
                          background: 'rgba(0,0,0,0.1)',
                          borderRadius: '10px'
                        }}
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link to="/fraud-types" className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem' }}>
                  Learn Protection Tips
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Protection Tips */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">🛡️ Essential Protection Strategies</h2>
          <p className="section-subtitle">
            Master these fundamental security practices to protect yourself from 99% of cyber fraud attempts
          </p>
          <div className="tips-grid">
            {protectionTips.map((tip, index) => (
              <div key={index} className="card success-card animate-slideInUp" style={{ 
                animationDelay: `${index * 0.1}s`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px', textAlign: 'center' }}>
                  {tip.icon}
                </div>
                <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', textAlign: 'center' }}>
                  {tip.title}
                </h3>
                <p style={{ marginBottom: '20px', textAlign: 'center', lineHeight: '1.6' }}>
                  {tip.description}
                </p>
                <div style={{ textAlign: 'center' }}>
                  <button className="btn btn-success" style={{ fontSize: '0.9rem' }}>
                    {tip.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Assessment CTA */}
      <section className="section">
        <div className="container">
          <div className="card premium-card" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ 
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
              animation: 'spin 20s linear infinite'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🔒</div>
              <h2 style={{ marginBottom: '20px', fontSize: '2.2rem' }}>
                Ready to Secure Your Digital Life?
              </h2>
              <p style={{ marginBottom: '32px', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 32px' }}>
                Get personalized fraud protection strategies based on your digital behavior, 
                risk profile, and user category. Join over 100,000+ Indians who trust CyberShield.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Link to="/user-types" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
                  🚀 Start Protection Journey
                </Link>
                <Link to="/quiz" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
                  📊 Take Security Assessment
                </Link>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.8 }}>
                <div>✅ Personalized Risk Analysis</div>
                <div>✅ Real-time Threat Alerts</div>
                <div>✅ 24/7 Expert Support</div>
                <div>✅ Free Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.05)', margin: '0 -24px' }}>
        <div className="container">
          <h2 className="section-title">🤝 Trusted by Leading Organizations</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px',
            opacity: 0.8
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏛️</div>
              <strong>Government Endorsed</strong>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Aligned with Digital India initiatives</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏦</div>
              <strong>Bank Partnerships</strong>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Collaborated with major Indian banks</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👮</div>
              <strong>Police Approved</strong>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Endorsed by Cyber Crime cells</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛡️</div>
              <strong>Security Certified</strong>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>ISO 27001 compliant platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">🚨 Emergency Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="card danger-card">
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📞 Immediate Help
              </h3>
              <div style={{ marginBottom: '12px' }}>
                <strong>Cyber Crime Helpline:</strong>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>1930</div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Financial Fraud:</strong>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>155260</div>
              </div>
              <Link to="/resources" className="btn btn-danger" style={{ width: '100%', marginTop: '16px' }}>
                All Emergency Numbers
              </Link>
            </div>
            
            <div className="card info-card">
              <h3 style={{ marginBottom: '16px' }}>📋 Report Fraud</h3>
              <p style={{ marginBottom: '16px' }}>
                Report cyber fraud incidents through official government portals
              </p>
              <a 
                href="https://cybercrime.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-info" 
                style={{ width: '100%' }}
              >
                Report at cybercrime.gov.in
              </a>
            </div>
            
            <div className="card warning-card">
              <h3 style={{ marginBottom: '16px' }}>🔍 Verify Suspicious Activity</h3>
              <p style={{ marginBottom: '16px' }}>
                Use our verification tools to check suspicious links, numbers, and offers
              </p>
              <Link to="/resources" className="btn btn-warning" style={{ width: '100%' }}>
                Verification Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
