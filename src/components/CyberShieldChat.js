import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CyberShieldChat = () => {
  const { user, isSignedIn } = useUser();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      type: 'welcome',
      text: "Hello! I am **CyberShield AI**, your intelligent cybersecurity threat analyst powered by RAG and Machine Learning.\n\nYou can paste any suspicious SMS, WhatsApp message, email, or UPI payment request, or ask me questions about cyber frauds, online safety, and incident reporting.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat' or 'scan'
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load suggestion templates
    fetch(`${API_BASE_URL}/api/chat/suggestions`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.suggestions) {
          setSuggestions(data.suggestions);
        }
      })
      .catch(() => {
        setSuggestions([
          {
            title: 'Electricity Disconnection SMS',
            prompt: 'Dear consumer, your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact our officer at 9876543210.'
          },
          {
            title: 'UPI Collect Request Trap',
            prompt: 'Someone from OLX sent me a QR code and asked me to scan it in Google Pay and enter my PIN to receive Rs. 15,000 for my used sofa. Is this safe?'
          },
          {
            title: 'Bank KYC Expiry Link',
            prompt: 'Dear SBI User, your YONO account has been suspended due to pending KYC update. Click http://sbi-kyc-verify.xyz/login to avoid permanent block.'
          },
          {
            title: 'Reporting Indian Cyber Fraud',
            prompt: 'I was scammed of money 30 minutes ago via UPI. What is the exact procedure to report and freeze the funds in India?'
          }
        ]);
      });

    // Load user history if signed in
    if (isSignedIn && user?.id) {
      fetch(`${API_BASE_URL}/api/chat/history/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setHistory(data.data);
          }
        })
        .catch(err => console.warn('Could not fetch chat history:', err));
    }
  }, [isSignedIn, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend = null) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim() || isLoading) return;

    const userMsg = {
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          clerkUserId: isSignedIn ? user?.id : null,
          queryType: mode === 'scan' ? 'suspicious_message' : 'general_question'
        })
      });

      const result = await response.json();

      if (result.success && result.data) {
        const botMsg = {
          sender: 'bot',
          type: 'analysis',
          data: result.data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            type: 'error',
            text: result.error || 'Failed to process cybersecurity analysis. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          type: 'error',
          text: 'Unable to connect to CyberShield backend API. Ensure the server is running on port 5000.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const getRiskColor = (risk) => {
    switch ((risk || '').toUpperCase()) {
      case 'CRITICAL':
        return { bg: '#fee2e2', text: '#dc2626', border: '#ef4444', badge: '#991b1b' };
      case 'HIGH':
        return { bg: '#ffedd5', text: '#ea580c', border: '#f97316', badge: '#c2410c' };
      case 'MEDIUM':
        return { bg: '#fef9c3', text: '#ca8a04', border: '#eab308', badge: '#854d0e' };
      case 'LOW':
      default:
        return { bg: '#dcfce7', text: '#16a34a', border: '#22c55e', badge: '#15803d' };
    }
  };

  return (
    <div className="cybershield-chat-page" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px 16px',
      minHeight: 'calc(100vh - 80px)',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        borderRadius: '20px',
        padding: '28px',
        color: 'white',
        boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          position: 'relative',
          zIndex: 2
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '2rem' }}>🤖</span>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                CyberShield AI Threat Assistant
              </h1>
              <span style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#4ade80',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span>
                RAG + ML Armed
              </span>
            </div>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '0.95rem', maxWidth: '650px', lineHeight: 1.5 }}>
              Combining <strong>TF-IDF & LinearSVC classification</strong> with <strong>LangChain, Pinecone Vector DB, and Gemini GenAI</strong> to analyze suspicious messages and answer cybersecurity queries with grounded domain intelligence.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setMode(mode === 'chat' ? 'scan' : 'chat')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.88rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
            >
              {mode === 'chat' ? '🔍 Switch to Deep Scanner' : '💬 Switch to AI Chat'}
            </button>
            {isSignedIn && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  background: showHistory ? '#3b82f6' : 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  backdropFilter: 'blur(8px)'
                }}
              >
                📜 History ({history.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Quick-Scan Prompts */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
          ⚡ Quick Test Scenarios (Click to Analyze):
        </div>
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollbarWidth: 'thin'
        }}>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sug.prompt)}
              disabled={isLoading}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: '600',
                color: '#1e293b',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <span>🚨</span>
              <span>{sug.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showHistory ? '1fr 320px' : '1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Chat Feed */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          height: '650px'
        }}>
          {/* Messages Scroll Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    gap: '12px'
                  }}
                >
                  {!isUser && (
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      flexShrink: 0
                    }}>
                      🛡️
                    </div>
                  )}

                  <div style={{ maxWidth: isUser ? '75%' : '88%' }}>
                    {/* Plain Text Message */}
                    {msg.type === 'welcome' || msg.type === 'error' || isUser ? (
                      <div style={{
                        background: isUser ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#f8fafc',
                        color: isUser ? '#ffffff' : '#1e293b',
                        border: isUser ? 'none' : '1px solid #e2e8f0',
                        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        padding: '14px 18px',
                        fontSize: '0.94rem',
                        lineHeight: 1.6,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.text}
                      </div>
                    ) : null}

                    {/* Rich Analysis Card */}
                    {msg.type === 'analysis' && msg.data && (
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '18px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        overflow: 'hidden'
                      }}>
                        {/* Risk Header Bar */}
                        {(() => {
                          const colors = getRiskColor(msg.data.classification?.riskLevel || msg.data.analysis?.riskLevel);
                          const isThreat = msg.data.analysis?.isThreat;

                          return (
                            <div style={{
                              background: colors.bg,
                              borderBottom: `1px solid ${colors.border}`,
                              padding: '14px 20px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '10px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.3rem' }}>
                                  {isThreat ? '🚨' : '✅'}
                                </span>
                                <div>
                                  <span style={{
                                    fontWeight: '800',
                                    fontSize: '0.95rem',
                                    color: colors.text
                                  }}>
                                    {msg.data.classification?.category || 'Security Threat'}
                                  </span>
                                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                    ML LinearSVC + TF-IDF Analysis
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{
                                  background: colors.text,
                                  color: 'white',
                                  padding: '4px 10px',
                                  borderRadius: '8px',
                                  fontWeight: '800',
                                  fontSize: '0.75rem',
                                  letterSpacing: '0.5px'
                                }}>
                                  {msg.data.classification?.riskLevel || 'MEDIUM'} RISK
                                </span>
                                <span style={{
                                  background: 'rgba(0,0,0,0.05)',
                                  color: '#334155',
                                  padding: '4px 8px',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: '700'
                                }}>
                                  {Math.round((msg.data.classification?.confidence || 0.85) * 100)}% Confidence
                                </span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Analysis Body */}
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {/* Explanation */}
                          <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                              🧠 Forensic Threat Breakdown:
                            </div>
                            <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
                              {msg.data.analysis?.explanation}
                            </p>
                          </div>

                          {/* Threat Indicators */}
                          {msg.data.analysis?.indicators && msg.data.analysis.indicators.length > 0 && (
                            <div style={{
                              background: '#fff1f2',
                              border: '1px solid #fecdd3',
                              borderRadius: '12px',
                              padding: '14px'
                            }}>
                              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#be123c', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>⚠️</span> Red Flags & Threat Indicators Detected:
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#881337', lineHeight: 1.5 }}>
                                {msg.data.analysis.indicators.map((ind, i) => (
                                  <li key={i} style={{ marginBottom: '4px' }}>{ind}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Action Recommendations */}
                          {msg.data.analysis?.recommendations && msg.data.analysis.recommendations.length > 0 && (
                            <div style={{
                              background: '#f0fdf4',
                              border: '1px solid #bbf7d0',
                              borderRadius: '12px',
                              padding: '14px'
                            }}>
                              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#15803d', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>🛡️</span> Immediate & Recommended Action Plan:
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.5 }}>
                                {msg.data.analysis.recommendations.map((rec, i) => (
                                  <li key={i} style={{ marginBottom: '4px' }}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Knowledge Base Citations */}
                          {msg.data.sources && msg.data.sources.length > 0 && (
                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                                📚 Retrieved Knowledge Chunks (Pinecone RAG):
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {msg.data.sources.map((src, i) => (
                                  <span key={i} style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    padding: '4px 10px',
                                    fontSize: '0.76rem',
                                    color: '#475569',
                                    fontWeight: '600'
                                  }}>
                                    📄 {src.title || src} {src.category ? `(${src.category})` : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Footer Actions */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
                            <button
                              onClick={() => copyToClipboard(JSON.stringify(msg.data.analysis, null, 2), index)}
                              style={{
                                background: '#f1f5f9',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '0.78rem',
                                fontWeight: '600',
                                color: '#475569',
                                cursor: 'pointer'
                              }}
                            >
                              {copyFeedback === index ? '✅ Copied!' : '📋 Copy Analysis Report'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div style={{
                      fontSize: '0.72rem',
                      color: '#94a3b8',
                      marginTop: '4px',
                      textAlign: isUser ? 'right' : 'left'
                    }}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  🤖
                </div>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '18px 18px 18px 4px',
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                  <span style={{ fontSize: '0.88rem', color: '#475569', fontWeight: '500' }}>
                    Running ML classifier, querying Pinecone vector DB & generating Gemini response...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #e2e8f0',
            background: '#ffffff',
            borderRadius: '0 0 20px 20px'
          }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
            >
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={mode === 'scan' ? "Paste suspicious message, SMS, link or UPI request here..." : "Ask any cybersecurity question or paste message to analyze..."}
                rows={2}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.94rem',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                  transition: 'border 0.2s ease'
                }}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#cbd5e1'}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                style={{
                  background: inputMessage.trim() && !isLoading ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '0 24px',
                  height: '52px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  boxShadow: inputMessage.trim() && !isLoading ? '0 4px 14px rgba(37, 99, 235, 0.3)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Analyze</span>
                <span>🚀</span>
              </button>
            </form>
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            height: '650px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>
                📜 Previous Scans
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            {history.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', marginTop: '40px' }}>
                No saved interactions found yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSendMessage(item.message)}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: item.riskLevel === 'HIGH' || item.riskLevel === 'CRITICAL' ? '#dc2626' : '#16a34a' }}>
                        {item.riskLevel || 'SCANNED'}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.82rem',
                      color: '#334155',
                      fontWeight: '500',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberShieldChat;
