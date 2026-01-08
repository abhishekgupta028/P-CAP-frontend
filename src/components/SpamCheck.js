import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function SpamCheck() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDbId, setUserDbId] = useState(null);
  const [userInitDone, setUserInitDone] = useState(false);

  const checkSpam = async () => {
    if (!message.trim()) {
      setError('Please enter a message to check');
      return;
    }

    // CRITICAL: Make sure user exists in DB before checking spam
    if (!userDbId && !userInitDone) {
      setError('⏳ Please wait, initializing user...');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    console.log('🚀 Starting spam check for message:', message);

    try {
      // Step 1: Get spam detection result
      console.log('📡 Step 1: Calling API Gateway at', `${process.env.REACT_APP_API_URL}/api/spam/detect`);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/spam/detect`, {
        message: message
      });

      console.log('📥 API Gateway Response:', response.data);

      if (response.data.success) {
        const detectionResult = response.data.data;
        setResult(detectionResult);
        console.log('✅ Detection Result:', detectionResult);
        
        // Step 2: Ensure we have a valid user_id
        let uidToUse = userDbId || parseInt(localStorage.getItem('app_user_db_id'), 10);
        
        // If STILL no user_id, create one now
        if (!uidToUse) {
          console.log('⚠️ No user_id found, creating user now...');
          try {
            let clerkId = localStorage.getItem('clerk_uid');
            if (!clerkId) {
              clerkId = window.crypto?.randomUUID() || `local-${Date.now()}-${Math.random()}`;
              localStorage.setItem('clerk_uid', clerkId);
            }
            
            const userRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/db/user/create`, {
              clerk_user_id: clerkId,
              email: `${clerkId}@local.test`,
              name: 'Local User'
            });
            
            if (userRes.data?.success) {
              uidToUse = userRes.data.user?.id || userRes.data.user_id;
              localStorage.setItem('app_user_db_id', uidToUse);
              setUserDbId(uidToUse);
              console.log(`✅ User created: id=${uidToUse}`);
            }
          } catch (userError) {
            console.error('❌ Failed to create user:', userError);
            setError('⚠️ Could not create user account. Using default user.');
            uidToUse = 1; // Fallback to user_id=1
          }
        }
        
        // Step 3: Log to database
        try {
          console.log(`📡 Step 3: Logging to database with user_id=${uidToUse}`);
          
          const dbPayload = {
            user_id: uidToUse,
            message: message,
            is_spam: detectionResult.is_spam,
            confidence: detectionResult.confidence,
            spam_probability: detectionResult.probabilities.spam,
            ham_probability: detectionResult.probabilities.ham,
            risk_level: detectionResult.risk_level
          };
          
          console.log('📤 Database Payload:', dbPayload);
          
          const dbResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/db/spam/log`, dbPayload);
          console.log('📥 Database Response:', dbResponse.data);
          console.log(`✅ SUCCESS: Spam detection logged to NeonDB (user_id=${uidToUse})`);
          
          // Don't set error - detection is complete, result is already displayed
        } catch (dbError) {
          console.error('❌ DATABASE ERROR:', dbError);
          console.error('❌ Error Response:', dbError.response?.data);
          console.error('❌ Error Status:', dbError.response?.status);
          // Show error to user now!
          setError(`⚠️ Detection worked but failed to save to database: ${dbError.response?.data?.error || dbError.message}`);
        }
      } else {
        setError('Failed to analyze message');
      }
    } catch (err) {
      console.error('❌ SPAM DETECTION ERROR:', err);
      console.error('❌ Error Response:', err.response?.data);
      setError('Failed to connect to spam detection service. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Ensure there is a persistent user mapping in the DB for this client
  useEffect(() => {
    const ensureUser = async () => {
      try {
        // ALWAYS check if the stored user_id actually exists in DB
        const cachedUserId = localStorage.getItem('app_user_db_id');
        
        if (cachedUserId) {
          // Verify this user exists in database
          try {
            const verifyResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/db/user/${cachedUserId}`);
            if (verifyResponse.data?.success && verifyResponse.data?.user) {
              console.log(`✅ Verified existing user: id=${cachedUserId}`);
              setUserDbId(parseInt(cachedUserId, 10));
              setUserInitDone(true);
              return; // User exists, we're good!
            }
          } catch (verifyError) {
            console.warn(`⚠️ Cached user_id=${cachedUserId} doesn't exist, creating new user...`);
            // Clear invalid cache
            localStorage.removeItem('app_user_db_id');
            localStorage.removeItem('clerk_uid');
          }
        }

        // Create new user
        let clerkId = localStorage.getItem('clerk_uid');
        if (!clerkId) {
          try {
            clerkId = (window && window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : `local-${Date.now()}-${Math.floor(Math.random()*10000)}`;
          } catch (e) {
            clerkId = `local-${Date.now()}-${Math.floor(Math.random()*10000)}`;
          }
          localStorage.setItem('clerk_uid', clerkId);
        }

        // Create user record in DB (idempotent - endpoint returns existing user if present)
        console.log(`📡 Creating user with clerk_id=${clerkId}`);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/db/user/create`, {
          clerk_user_id: clerkId,
          email: `${clerkId}@local.test`,
          name: 'Local User'
        });

        if (res.data && res.data.success) {
          const dbId = res.data.user ? res.data.user.id : res.data.user_id;
          if (dbId) {
            localStorage.setItem('app_user_db_id', dbId);
            setUserDbId(parseInt(dbId, 10));
            console.log(`✅ User initialized: id=${dbId}`);
          }
        }
      } catch (e) {
        console.warn('Could not create/get user mapping in DB:', e.message || e);
      } finally {
        setUserInitDone(true);
      }
    };

    ensureUser();
  }, []);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return '#ff4444';
      case 'MEDIUM':
        return '#ffaa00';
      case 'LOW':
        return '#00cc44';
      default:
        return '#666666';
    }
  };

  const sampleMessages = [
    "URGENT! You have won $10,000! Click here NOW to claim your prize!",
    "Hey! Want to meet for coffee tomorrow afternoon?",
    "FREE! Call now to get exclusive offers. Limited time only!",
    "Can you pick up some groceries on your way home?",
    "CONGRATULATIONS! You've been selected for a cash prize. Reply YES to claim."
  ];

  return (
    <div className="spam-check-container">
      <div className="spam-check-card">
        <div className="card-header">
          <h2>📧 Spam Message Detection</h2>
          <p className="subtitle">Check if a message is spam or legitimate using NLP</p>
        </div>

        <div className="info-section">
          <div className="info-box">
            <h3>🤖 Model Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Algorithm:</span>
                <span className="info-value">NLP with TF-IDF</span>
              </div>
              <div className="info-item">
                <span className="info-label">Training Data:</span>
                <span className="info-value">138,816 messages</span>
              </div>
              <div className="info-item">
                <span className="info-label">Split Ratio:</span>
                <span className="info-value">80% Train / 20% Test</span>
              </div>
              <div className="info-item">
                <span className="info-label">Features:</span>
                <span className="info-value">5,000 TF-IDF features</span>
              </div>
            </div>
          </div>
        </div>

        <div className="input-section">
          <label htmlFor="message-input" className="input-label">
            Enter Message to Check:
          </label>
          <textarea
            id="message-input"
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or paste a message here to check if it's spam..."
            rows="6"
          />

          <div className="sample-messages">
            <p className="sample-label">Try these sample messages:</p>
            <div className="sample-buttons">
              {sampleMessages.map((sample, index) => (
                <button
                  key={index}
                  className="sample-button"
                  onClick={() => setMessage(sample)}
                  title={sample}
                >
                  Sample {index + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            className="check-button"
            onClick={checkSpam}
            disabled={loading || !message.trim()}
          >
            {loading ? '🔄 Analyzing...' : '🔍 Check Message'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <strong>❌ Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <div className="result-header">
              <h3>📊 Detection Results</h3>
            </div>

            <div className="prediction-box" style={{
              borderColor: result.is_spam ? '#ff4444' : '#00cc44',
              backgroundColor: result.is_spam ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 204, 68, 0.1)'
            }}>
              <div className="prediction-label">
                {result.is_spam ? '⚠️ SPAM DETECTED' : '✅ LEGITIMATE MESSAGE'}
              </div>
              <div className="confidence-score">
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </div>
            </div>

            <div className="probabilities-section">
              <h4>Probability Distribution:</h4>
              <div className="probability-bars">
                <div className="probability-item">
                  <div className="probability-header">
                    <span className="probability-label">HAM (Legitimate)</span>
                    <span className="probability-value">
                      {(result.ham_probability * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="probability-bar-container">
                    <div
                      className="probability-bar ham-bar"
                      style={{ width: `${result.ham_probability * 100}%` }}
                    />
                  </div>
                </div>

                <div className="probability-item">
                  <div className="probability-header">
                    <span className="probability-label">SPAM</span>
                    <span className="probability-value">
                      {(result.spam_probability * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="probability-bar-container">
                    <div
                      className="probability-bar spam-bar"
                      style={{ width: `${result.spam_probability * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="risk-assessment">
              <h4>Risk Level:</h4>
              <div
                className="risk-badge"
                style={{ backgroundColor: getRiskColor(result.risk_level) }}
              >
                {result.risk_level}
              </div>
            </div>

            <div className="analysis-note">
              <p><strong>Note:</strong> This analysis is based on NLP techniques including text preprocessing, 
              TF-IDF vectorization, and machine learning classification trained on 138,816 messages.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .spam-check-container {
          padding: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .spam-check-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }

        .card-header h2 {
          margin: 0 0 10px 0;
          font-size: 28px;
        }

        .subtitle {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }

        .info-section {
          padding: 25px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .info-box h3 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 18px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .info-item {
          background: white;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .info-label {
          display: block;
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .info-value {
          display: block;
          color: #333;
          font-weight: 600;
          font-size: 16px;
        }

        .input-section {
          padding: 30px;
        }

        .input-label {
          display: block;
          margin-bottom: 12px;
          color: #333;
          font-weight: 600;
          font-size: 16px;
        }

        .message-input {
          width: 100%;
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 15px;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s;
        }

        .message-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .sample-messages {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .sample-label {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 14px;
        }

        .sample-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sample-button {
          padding: 8px 16px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .sample-button:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
          transform: translateY(-2px);
        }

        .check-button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
          margin-top: 20px;
        }

        .check-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .check-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          margin: 20px 30px;
          padding: 15px;
          background: #fee;
          border-left: 4px solid #f44;
          border-radius: 4px;
          color: #c33;
        }

        .result-section {
          padding: 30px;
          background: #f8f9fa;
          border-top: 3px solid #667eea;
        }

        .result-header h3 {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 20px;
        }

        .prediction-box {
          padding: 25px;
          border: 3px solid;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 25px;
        }

        .prediction-label {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .confidence-score {
          font-size: 18px;
          font-weight: 600;
          color: #666;
        }

        .probabilities-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .probabilities-section h4 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .probability-item {
          margin-bottom: 15px;
        }

        .probability-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .probability-label {
          font-weight: 600;
          color: #333;
        }

        .probability-value {
          font-weight: 600;
          color: #667eea;
        }

        .probability-bar-container {
          height: 25px;
          background: #e9ecef;
          border-radius: 12px;
          overflow: hidden;
        }

        .probability-bar {
          height: 100%;
          transition: width 0.5s ease;
        }

        .ham-bar {
          background: linear-gradient(90deg, #00cc44, #00ff55);
        }

        .spam-bar {
          background: linear-gradient(90deg, #ff4444, #ff6666);
        }

        .risk-assessment {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }

        .risk-assessment h4 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .risk-badge {
          display: inline-block;
          padding: 12px 30px;
          color: white;
          border-radius: 25px;
          font-weight: 700;
          font-size: 18px;
        }

        .analysis-note {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          border-radius: 4px;
        }

        .analysis-note p {
          margin: 0;
          color: #856404;
          font-size: 14px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

export default SpamCheck;
