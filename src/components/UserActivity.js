import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserActivity = ({ userId = 1 }) => {
  const [spamHistory, setSpamHistory] = useState([]);
  const [fraudHistory, setFraudHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('spam'); // 'spam' or 'fraud'

  useEffect(() => {
    fetchUserActivity();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchUserActivity, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const fetchUserActivity = async () => {
    try {
      setLoading(true);
      
      const [spamRes, fraudRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/db/spam/history/${userId}?limit=10`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/db/fraud/history/${userId}?limit=10`)
      ]);

      if (spamRes.data.success) {
        setSpamHistory(spamRes.data.history);
      }
      
      if (fraudRes.data.success) {
        setFraudHistory(fraudRes.data.history);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError('Unable to load activity history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRiskBadgeColor = (riskLevel) => {
    const colors = {
      'HIGH': '#dc2626',
      'MEDIUM': '#f59e0b',
      'LOW': '#059669',
      'CRITICAL': '#991b1b'
    };
    return colors[riskLevel] || '#6b7280';
  };

  return (
    <div className="user-activity-container">
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>📜 Recent Activity</h2>
          <div style={{
            fontSize: '0.85rem',
            color: '#6b7280'
          }}>
            Auto-refreshes every 10s
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            color: '#dc2626'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <button
            onClick={() => setActiveTab('spam')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'spam' ? '3px solid #667eea' : '3px solid transparent',
              color: activeTab === 'spam' ? '#667eea' : '#6b7280',
              fontWeight: activeTab === 'spam' ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            📧 Spam Checks ({spamHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('fraud')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'fraud' ? '3px solid #667eea' : '3px solid transparent',
              color: activeTab === 'fraud' ? '#667eea' : '#6b7280',
              fontWeight: activeTab === 'fraud' ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            💳 Fraud Checks ({fraudHistory.length})
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
            Loading activity...
          </div>
        ) : (
          <>
            {/* Spam History */}
            {activeTab === 'spam' && (
              <div>
                {spamHistory.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#6b7280',
                    background: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
                    <p>No spam checks yet</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                      Start checking messages to see your history here
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {spamHistory.map((item, index) => (
                      <div
                        key={item.id || index}
                        style={{
                          padding: '16px',
                          background: item.is_spam ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                          border: `2px solid ${item.is_spam ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                          borderRadius: '8px',
                          transition: 'transform 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '8px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#6b7280',
                              marginBottom: '6px'
                            }}>
                              {formatDate(item.created_at)}
                            </div>
                            <div style={{
                              fontSize: '0.95rem',
                              color: '#1f2937',
                              marginBottom: '8px',
                              fontStyle: 'italic'
                            }}>
                              "{item.message.substring(0, 100)}{item.message.length > 100 ? '...' : ''}"
                            </div>
                          </div>
                          <div style={{
                            background: getRiskBadgeColor(item.risk_level),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            marginLeft: '12px'
                          }}>
                            {item.risk_level}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.85rem'
                        }}>
                          <div>
                            <span style={{
                              fontWeight: 'bold',
                              color: item.is_spam ? '#dc2626' : '#059669'
                            }}>
                              {item.is_spam ? '⚠️ SPAM' : '✅ LEGITIMATE'}
                            </span>
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            Confidence: <strong>{(item.confidence * 100).toFixed(1)}%</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fraud History */}
            {activeTab === 'fraud' && (
              <div>
                {fraudHistory.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#6b7280',
                    background: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💳</div>
                    <p>No fraud checks yet</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                      Start checking transactions to see your history here
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {fraudHistory.map((item, index) => (
                      <div
                        key={item.id || index}
                        style={{
                          padding: '16px',
                          background: item.is_fraud ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                          border: `2px solid ${item.is_fraud ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                          borderRadius: '8px',
                          transition: 'transform 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '12px'
                        }}>
                          <div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#6b7280',
                              marginBottom: '6px'
                            }}>
                              {formatDate(item.created_at)}
                            </div>
                            <div style={{
                              fontSize: '1.3rem',
                              fontWeight: 'bold',
                              color: '#1f2937'
                            }}>
                              ${item.transaction_amount.toLocaleString()}
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#6b7280',
                              marginTop: '4px'
                            }}>
                              {item.transaction_type}
                            </div>
                          </div>
                          <div style={{
                            background: getRiskBadgeColor(item.risk_level),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            {item.risk_level}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.85rem'
                        }}>
                          <div>
                            <span style={{
                              fontWeight: 'bold',
                              color: item.is_fraud ? '#dc2626' : '#059669'
                            }}>
                              {item.is_fraud ? '🚨 FRAUD DETECTED' : '✅ LEGITIMATE'}
                            </span>
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            Confidence: <strong>{(item.confidence * 100).toFixed(1)}%</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {(spamHistory.length > 0 || fraudHistory.length > 0) && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: 'rgba(37, 99, 235, 0.05)',
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            💡 All checks are automatically saved to your history in real-time
          </div>
        )}
      </div>
    </div>
  );
};

export default UserActivity;
