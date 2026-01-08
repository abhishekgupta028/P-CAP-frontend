import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LiveDashboard.css';

function LiveDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSpamChecks: 0,
    totalFraudChecks: 0,
    spamDetected: 0,
    fraudDetected: 0,
    spamDetectionRate: 0,
    fraudDetectionRate: 0
  });
  
  const [recentSpam, setRecentSpam] = useState([]);
  const [recentFraud, setRecentFraud] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  // Fraud visualization data by type and user category
  const [fraudByType, setFraudByType] = useState({
    phishing: { student: 0, professional: 0, homemaker: 0, rural: 0, senior: 0 },
    'otp-scam': { student: 0, professional: 0, homemaker: 0, rural: 0, senior: 0 },
    'upi-scam': { student: 0, professional: 0, homemaker: 0, rural: 0, senior: 0 },
    'investment-scam': { student: 0, professional: 0, homemaker: 0, rural: 0, senior: 0 },
    'job-scam': { student: 0, professional: 0, homemaker: 0, rural: 0, senior: 0 },
    'romance-scam': { student: 0, professional: 0, homemaker: 0, rural: 0, senior: 0 }
  });

  // Generate mock fraud distribution data (in real app, this would come from API)
  const generateFraudData = () => {
    // Simulated data showing which user types are more vulnerable to specific fraud types
    return {
      phishing: { student: 45, professional: 65, homemaker: 32, rural: 28, senior: 38 },
      'otp-scam': { student: 28, professional: 42, homemaker: 55, rural: 48, senior: 72 },
      'upi-scam': { student: 52, professional: 58, homemaker: 48, rural: 35, senior: 45 },
      'investment-scam': { student: 22, professional: 88, homemaker: 35, rural: 18, senior: 52 },
      'job-scam': { student: 68, professional: 45, homemaker: 42, rural: 25, senior: 15 },
      'romance-scam': { student: 38, professional: 28, homemaker: 45, rural: 22, senior: 55 }
    };
  };

  // Fetch overall statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/db/stats/overall`);
      if (response.data.success) {
        const data = response.data.stats;
        setStats({
          totalUsers: data.totalUsers || 0,
          totalSpamChecks: data.totalSpamChecks || 0,
          totalFraudChecks: data.totalFraudChecks || 0,
          spamDetected: data.spamDetected || 0,
          fraudDetected: data.fraudDetected || 0,
          spamDetectionRate: data.totalSpamChecks > 0 
            ? ((data.spamDetected / data.totalSpamChecks) * 100).toFixed(1)
            : 0,
          fraudDetectionRate: data.totalFraudChecks > 0
            ? ((data.fraudDetected / data.totalFraudChecks) * 100).toFixed(1)
            : 0
        });
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch recent spam activity
  const fetchRecentSpam = async () => {
    try {
      console.log('📧 Fetching spam logs from /api/db/spam/all');
      // Fetch from ALL users, not just user 1
      const response = await axios.get('http://localhost:5003/api/db/spam/all?limit=10');
      if (response.data.success) {
        console.log('✅ Received', response.data.count, 'spam logs');
        setRecentSpam(response.data.history || []);
      }
    } catch (error) {
      console.error('❌ Error fetching spam history:', error);
    }
  };

  // Fetch recent fraud activity
  const fetchRecentFraud = async () => {
    try {
      console.log('💳 Fetching fraud logs from /api/db/fraud/all');
      // Fetch from ALL users, not just user 1
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/db/fraud/all?limit=10`);
      if (response.data.success) {
        console.log('✅ Received', response.data.count, 'fraud logs');
        setRecentFraud(response.data.history || []);
      }
    } catch (error) {
      console.error('❌ Error fetching fraud history:', error);
    }
  };

  // Load all data
  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchRecentSpam(), fetchRecentFraud()]);
    // Load fraud visualization data
    setFraudByType(generateFraudData());
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    loadAllData();
  }, []);

  // Auto-refresh every 5 seconds when live
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing dashboard data...', new Date().toLocaleTimeString());
      fetchStats();
      fetchRecentSpam();
      fetchRecentFraud();
      setLastUpdate(new Date());
    }, 5000);

    return () => {
      console.log('⏸️ Auto-refresh stopped');
      clearInterval(interval);
    };
  }, [isLive]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTimeSinceUpdate = () => {
    const seconds = Math.floor((new Date() - lastUpdate) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  if (loading) {
    return (
      <div className="live-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>📊 Live Security Dashboard</h1>
          <p className="subtitle">Real-time threat detection monitoring</p>
        </div>
        <div className="header-right">
          <div className="live-indicator">
            <span className={`status-dot ${isLive ? 'live' : 'paused'}`}></span>
            <span className="status-text">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </div>
          <button 
            className="refresh-btn" 
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? '⏸️ Pause' : '▶️ Resume'}
          </button>
          <button className="refresh-btn" onClick={loadAllData}>
            🔄 Refresh Now
          </button>
          <div className="last-update">
            Updated {getTimeSinceUpdate()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card spam">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalSpamChecks}</div>
            <div className="stat-label">Spam Checks</div>
            <div className="stat-detail">{stats.spamDetected} detected ({stats.spamDetectionRate}%)</div>
          </div>
        </div>

        <div className="stat-card fraud">
          <div className="stat-icon">💳</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalFraudChecks}</div>
            <div className="stat-label">Fraud Checks</div>
            <div className="stat-detail">{stats.fraudDetected} detected ({stats.fraudDetectionRate}%)</div>
          </div>
        </div>

        <div className="stat-card detection-rate">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">
              {((Number(stats.spamDetectionRate) + Number(stats.fraudDetectionRate)) / 2).toFixed(1)}%
            </div>
            <div className="stat-label">Avg Detection Rate</div>
          </div>
        </div>
      </div>

      {/* Activity Tables */}
      <div className="activity-section">
        {/* Fraud Visualization Chart */}
        <div className="fraud-visualization-section">
          <div className="visualization-header">
            <h2>📊 Fraud Cases by Type & User Category</h2>
            <p className="visualization-subtitle">Distribution of fraud incidents across different user groups (Sample Data for Educational Purposes)</p>
          </div>
          
          <div className="chart-container">
            {/* Fraud Types Legend */}
            <div className="fraud-types-legend">
              <h3>Fraud Types</h3>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#ef4444' }}></span>
                  <span>🎣 Phishing Attacks</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#f59e0b' }}></span>
                  <span>📱 OTP Scams</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#8b5cf6' }}></span>
                  <span>💳 UPI Frauds</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#3b82f6' }}></span>
                  <span>📈 Investment Scams</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#10b981' }}></span>
                  <span>💼 Job Scams</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: '#ec4899' }}></span>
                  <span>💕 Romance Scams</span>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bar-chart">
              {Object.entries(fraudByType).map(([fraudType, userCategories], index) => {
                const colors = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#10b981', '#ec4899'];
                const fraudLabels = {
                  'phishing': 'Phishing',
                  'otp-scam': 'OTP Scam',
                  'upi-scam': 'UPI Fraud',
                  'investment-scam': 'Investment',
                  'job-scam': 'Job Scam',
                  'romance-scam': 'Romance'
                };
                
                return (
                  <div key={fraudType} className="chart-row">
                    <div className="chart-label" style={{ color: colors[index] }}>
                      {fraudLabels[fraudType]}
                    </div>
                    <div className="chart-bars">
                      {Object.entries(userCategories).map(([userType, value]) => {
                        const maxValue = 100; // Scale to percentage
                        const percentage = (value / maxValue) * 100;
                        const userLabels = {
                          student: '🎓 Students',
                          professional: '💼 Professionals',
                          homemaker: '🏠 Homemakers',
                          rural: '🌾 Rural',
                          senior: '👴 Seniors'
                        };
                        
                        return (
                          <div key={userType} className="bar-group">
                            <div className="bar-wrapper">
                              <div 
                                className="bar"
                                style={{ 
                                  width: `${percentage}%`,
                                  background: colors[index],
                                  minWidth: value > 0 ? '2%' : '0%'
                                }}
                                title={`${userLabels[userType]}: ${value} cases`}
                              >
                                {value > 15 && <span className="bar-value">{value}</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* User Categories Legend */}
            <div className="user-categories-legend">
              <div className="category-item">
                <span className="category-icon">🎓</span>
                <span>Students</span>
              </div>
              <div className="category-item">
                <span className="category-icon">💼</span>
                <span>Professionals</span>
              </div>
              <div className="category-item">
                <span className="category-icon">🏠</span>
                <span>Homemakers</span>
              </div>
              <div className="category-item">
                <span className="category-icon">🌾</span>
                <span>Rural Users</span>
              </div>
              <div className="category-item">
                <span className="category-icon">👴</span>
                <span>Senior Citizens</span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="insights-grid">
            <div className="insight-card high-risk">
              <div className="insight-icon">⚠️</div>
              <div className="insight-content">
                <div className="insight-title">Highest Risk</div>
                <div className="insight-value">Seniors → OTP Scams</div>
                <div className="insight-detail">72 reported cases</div>
              </div>
            </div>
            <div className="insight-card medium-risk">
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <div className="insight-title">Most Targeted</div>
                <div className="insight-value">Professionals</div>
                <div className="insight-detail">Investment scams (88 cases)</div>
              </div>
            </div>
            <div className="insight-card vulnerable">
              <div className="insight-icon">🎓</div>
              <div className="insight-content">
                <div className="insight-title">Vulnerable Group</div>
                <div className="insight-value">Students → Job Scams</div>
                <div className="insight-detail">68 reported incidents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Spam Activity */}
        <div className="activity-card">
          <div className="activity-header">
            <h2>🚨 Recent Spam Detections</h2>
            <div className="header-badges">
              <span className="activity-count">{recentSpam.length} recent</span>
              <span className="realtime-badge">🔴 LIVE DATA</span>
            </div>
          </div>
          <div className="activity-table-container">
            {recentSpam.length > 0 ? (
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Confidence</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSpam.map((item, index) => (
                    <tr key={item.id || index} className={index === 0 ? 'latest' : ''}>
                      <td className="time-cell">{formatTime(item.created_at)}</td>
                      <td className="message-cell">
                        <span className="message-preview" title={item.message}>
                          {item.message?.substring(0, 60)}
                          {item.message?.length > 60 ? '...' : ''}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${item.is_spam ? 'spam' : 'safe'}`}>
                          {item.is_spam ? '🚨 SPAM' : '✅ SAFE'}
                        </span>
                      </td>
                      <td className="confidence-cell">
                        {`${((Number(item.confidence) || 0) * 100).toFixed(0)}%`}
                      </td>
                      <td>
                        <span className={`risk-badge risk-${item.risk_level?.toLowerCase()}`}>
                          {item.risk_level || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No spam checks yet</div>
            )}
          </div>
        </div>

        {/* Recent Fraud Activity */}
        <div className="activity-card">
          <div className="activity-header">
            <h2>💳 Recent Fraud Detections</h2>
            <div className="header-badges">
              <span className="activity-count">{recentFraud.length} recent</span>
              <span className="realtime-badge">🔴 LIVE DATA</span>
            </div>
          </div>
          <div className="activity-table-container">
            {recentFraud.length > 0 ? (
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Transaction</th>
                    <th>Status</th>
                    <th>Confidence</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {recentFraud.map((item, index) => (
                    <tr key={item.id || index} className={index === 0 ? 'latest' : ''}>
                      <td className="time-cell">{formatTime(item.created_at)}</td>
                      <td className="transaction-cell">
                        <div className="transaction-info">
                          <span className="amount">${item.amount?.toFixed(2)}</span>
                          <span className="category">{item.category || 'Unknown'}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${item.is_fraud ? 'fraud' : 'safe'}`}>
                          {item.is_fraud ? '⚠️ FRAUD' : '✅ SAFE'}
                        </span>
                      </td>
                      <td className="confidence-cell">
                        {`${((Number(item.confidence) || 0) * 100).toFixed(0)}%`}
                      </td>
                      <td>
                        <span className={`risk-badge risk-${item.risk_level?.toLowerCase()}`}>
                          {item.risk_level || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No fraud checks yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      {isLive && (
        <div className="auto-refresh-indicator">
          <div className="refresh-pulse"></div>
          Auto-refreshing every 5 seconds
        </div>
      )}
    </div>
  );
}

export default LiveDashboard;
