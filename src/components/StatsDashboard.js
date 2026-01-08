import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatsDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSpamChecks: 0,
    totalFraudChecks: 0,
    spamDetected: 0,
    fraudDetected: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch overall statistics from database
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/db/stats/overall`);
      
      if (response.data.success) {
        setStats(response.data.stats);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Show the error but don't set fallback data - keep it at 0
      setError('Unable to connect to database. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentage = (detected, total) => {
    if (total === 0) return 0;
    return ((detected / total) * 100).toFixed(1);
  };

  return (
    <div className="stats-dashboard">
      {error && (
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          color: '#f59e0b'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Spam Checks */}
        <div className="stat-card" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>
            📧 Spam Checks
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
            {loading ? '...' : stats.totalSpamChecks.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            {stats.spamDetected} spam detected ({calculatePercentage(stats.spamDetected, stats.totalSpamChecks)}%)
          </div>
        </div>

        {/* Fraud Checks */}
        <div className="stat-card" style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>
            💳 Fraud Checks
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
            {loading ? '...' : stats.totalFraudChecks.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            {stats.fraudDetected} fraud detected ({calculatePercentage(stats.fraudDetected, stats.totalFraudChecks)}%)
          </div>
        </div>

        {/* Detection Rate */}
        <div className="stat-card" style={{
          background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px' }}>
            🛡️ Total Detections
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
            {loading ? '...' : (stats.spamDetected + stats.fraudDetected).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            Threats Identified
          </div>
        </div>
      </div>

      {/* Real-time Activity Indicator */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0, color: '#333' }}>📊 Live Statistics</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: '#059669'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: '#059669',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            Live Data from NeonDB
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>
              Spam Detection Rate
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc2626' }}>
              {calculatePercentage(stats.spamDetected, stats.totalSpamChecks)}%
            </div>
          </div>

          <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>
              Fraud Detection Rate
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ea580c' }}>
              {calculatePercentage(stats.fraudDetected, stats.totalFraudChecks)}%
            </div>
          </div>

          <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>
              Total Checks Today
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2563eb' }}>
              {loading ? '...' : (stats.totalSpamChecks + stats.totalFraudChecks).toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: 'rgba(37, 99, 235, 0.05)',
          borderRadius: '6px',
          fontSize: '0.85rem',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          Last updated: {new Date().toLocaleTimeString('en-IN')} | Auto-refreshes every 30 seconds
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default StatsDashboard;
