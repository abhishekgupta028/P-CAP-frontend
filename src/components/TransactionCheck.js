import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function TransactionCheck() {
  const [formData, setFormData] = useState({
    Gender: 'Male',
    Age: 30,
    State: 'California',
    City: 'Los Angeles',
    Bank_Branch: 'Main Branch',
    Account_Type: 'Savings',
    Transaction_Amount: 1000,
    Transaction_Type: 'Online',
    Merchant_Category: 'Shopping',
    Account_Balance: 5000,
    Transaction_Device: 'Mobile',
    Transaction_Location: 'USA',
    Device_Type: 'Smartphone',
    Transaction_Currency: 'USD',
    Transaction_Year: new Date().getFullYear(),
    Transaction_Month: new Date().getMonth() + 1,
    Transaction_Day: new Date().getDate(),
    Transaction_DayOfWeek: new Date().getDay(),
    Transaction_Hour: new Date().getHours()
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value) || value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Step 1: Get fraud detection result
      const response = await axios.post(`${API_URL}/api/fraud/detect`, formData);
      
      if (response.data.success) {
        const detectionResult = response.data.data;
        setResult(detectionResult);
        
        // Step 2: Log to database
        try {
          await axios.post('http://localhost:5003/api/db/fraud/log', {
            user_id: 1, // TODO: Replace with actual Clerk user ID when authenticated
            transaction_amount: formData.Transaction_Amount,
            transaction_type: formData.Transaction_Type,
            is_fraud: detectionResult.prediction.is_fraud,
            confidence: parseFloat(detectionResult.prediction.fraud_probability.replace('%', '')) / 100,
            risk_level: detectionResult.prediction.risk_level,
            transaction_data: {
              merchant: formData.Merchant_Category,
              device: formData.Device_Type,
              location: formData.Transaction_Location,
              account_balance: formData.Account_Balance
            }
          });
          console.log('✅ Fraud detection logged to NeonDB');
        } catch (dbError) {
          console.error('⚠️ Failed to log to database:', dbError);
          // Don't show error to user, just log it
        }
      } else {
        setError('Failed to check transaction');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Failed to connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomTransaction = () => {
    const randomAmount = Math.floor(Math.random() * 10000) + 100;
    const randomAge = Math.floor(Math.random() * 60) + 18;
    const randomBalance = Math.floor(Math.random() * 50000) + 1000;
    const randomHour = Math.floor(Math.random() * 24);
    
    const transactionTypes = ['Online', 'In-Store', 'ATM', 'Wire Transfer', 'Mobile'];
    const merchantCategories = ['Shopping', 'Restaurant', 'Gas Station', 'Grocery', 'Entertainment', 'Travel'];
    const deviceTypes = ['Smartphone', 'Desktop', 'Tablet', 'ATM', 'POS Terminal'];
    const accountTypes = ['Savings', 'Checking', 'Credit Card'];
    const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
    
    setFormData(prev => ({
      ...prev,
      Transaction_Amount: randomAmount,
      Age: randomAge,
      Account_Balance: randomBalance,
      Transaction_Hour: randomHour,
      Transaction_Type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
      Merchant_Category: merchantCategories[Math.floor(Math.random() * merchantCategories.length)],
      Device_Type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      Account_Type: accountTypes[Math.floor(Math.random() * accountTypes.length)],
      State: states[Math.floor(Math.random() * states.length)]
    }));
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'CRITICAL': return '#dc2626';
      case 'HIGH': return '#ea580c';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            💳 Transaction Fraud Detection
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto' }}>
            Use our AI-powered machine learning model to detect potentially fraudulent transactions in real-time.
            Our model achieves 75% F1-Score with 100% recall rate.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="card info-card">
            <h3>🎯 Model Accuracy</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>75%</p>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>F1-Score</p>
          </div>
          <div className="card success-card">
            <h3>✅ Fraud Detection Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>100%</p>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Recall Score</p>
          </div>
          <div className="card warning-card">
            <h3>⚡ Response Time</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>~45ms</p>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Average</p>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Enter Transaction Details</h2>
            <button 
              onClick={handleRandomTransaction}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              🎲 Random Transaction
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Personal Information */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Gender</label>
                <select name="Gender" value={formData.Gender} onChange={handleChange} className="form-input">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Age</label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  className="form-input"
                  min="18"
                  max="100"
                  required
                />
              </div>

              {/* Location Information */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>State</label>
                <select name="State" value={formData.State} onChange={handleChange} className="form-input">
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="New York">New York</option>
                  <option value="Florida">Florida</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>City</label>
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Account Information */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Account Type</label>
                <select name="Account_Type" value={formData.Account_Type} onChange={handleChange} className="form-input">
                  <option value="Savings">Savings</option>
                  <option value="Checking">Checking</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Account Balance ($)</label>
                <input
                  type="number"
                  name="Account_Balance"
                  value={formData.Account_Balance}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Transaction Information */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Transaction Amount ($)</label>
                <input
                  type="number"
                  name="Transaction_Amount"
                  value={formData.Transaction_Amount}
                  onChange={handleChange}
                  className="form-input"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Transaction Type</label>
                <select name="Transaction_Type" value={formData.Transaction_Type} onChange={handleChange} className="form-input">
                  <option value="Online">Online</option>
                  <option value="In-Store">In-Store</option>
                  <option value="ATM">ATM</option>
                  <option value="Wire Transfer">Wire Transfer</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Merchant Category</label>
                <select name="Merchant_Category" value={formData.Merchant_Category} onChange={handleChange} className="form-input">
                  <option value="Shopping">Shopping</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Gas Station">Gas Station</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel">Travel</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              {/* Device Information */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Device Type</label>
                <select name="Device_Type" value={formData.Device_Type} onChange={handleChange} className="form-input">
                  <option value="Smartphone">Smartphone</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="ATM">ATM</option>
                  <option value="POS Terminal">POS Terminal</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Transaction Device</label>
                <select name="Transaction_Device" value={formData.Transaction_Device} onChange={handleChange} className="form-input">
                  <option value="Mobile">Mobile</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="ATM">ATM</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Transaction Location</label>
                <input
                  type="text"
                  name="Transaction_Location"
                  value={formData.Transaction_Location}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: '600' }}
            >
              {loading ? '🔍 Analyzing Transaction...' : '🛡️ Check Transaction'}
            </button>
          </form>
        </div>

        {/* Results */}
        {error && (
          <div className="card error-card" style={{ marginTop: '24px' }}>
            <h3>❌ Error</h3>
            <p>{error}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '12px', color: '#6b7280' }}>
              Make sure the backend servers are running:
              <br />• Node.js API: <code>npm start</code> in backend folder
              <br />• Flask ML Service: <code>python app.py</code> in backend folder
            </p>
          </div>
        )}

        {result && result.prediction && (
          <div className="card" style={{ marginTop: '24px', border: `3px solid ${result.prediction.is_fraud ? '#dc2626' : '#10b981'}` }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
                {result.prediction.is_fraud ? '🚨' : '✅'}
              </div>
              <h2 style={{ 
                color: result.prediction.is_fraud ? '#dc2626' : '#10b981',
                marginBottom: '12px',
                fontSize: '2rem'
              }}>
                {result.prediction.fraud_label}
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
                Confidence: <strong>{result.prediction.fraud_probability}</strong>
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ 
                padding: '16px', 
                background: '#f3f4f6', 
                borderRadius: '8px',
                borderLeft: `4px solid ${getRiskColor(result.prediction.risk_level)}`
              }}>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>Risk Level</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: getRiskColor(result.prediction.risk_level) }}>
                  {result.prediction.risk_level}
                </div>
              </div>

              <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>Fraud Probability</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {result.prediction.fraud_probability}
                </div>
              </div>

              <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>Legitimate Probability</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981' }}>
                  {result.prediction.legitimate_probability}
                </div>
              </div>
            </div>

            {result.transaction_info && (
              <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '20px', color: '#1f2937' }}>
                <h3 style={{ marginBottom: '16px', color: '#1f2937', fontWeight: 'bold' }}>Transaction Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1f2937' }}>Amount:</strong> ${result.transaction_info.amount}
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1f2937' }}>Type:</strong> {result.transaction_info.type}
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1f2937' }}>Device:</strong> {result.transaction_info.device}
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1f2937' }}>Location:</strong> {result.transaction_info.location}
                  </div>
                </div>
              </div>
            )}

            {result.model_info && (
              <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '8px', color: '#1f2937' }}>
                <h3 style={{ marginBottom: '16px', color: '#1e40af', fontWeight: 'bold' }}>🤖 Model Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', fontSize: '0.95rem' }}>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1e40af' }}>Model:</strong> {result.model_info.model_type}
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1e40af' }}>Accuracy:</strong> {(result.model_info.accuracy * 100).toFixed(2)}%
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong style={{ color: '#1e40af' }}>F1-Score:</strong> {(result.model_info.f1_score * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            )}

            {result.prediction.is_fraud && (
              <div className="warning-card" style={{ marginTop: '20px' }}>
                <h3>⚠️ Recommended Actions</h3>
                <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                  <li>Verify the transaction with the cardholder</li>
                  <li>Check for recent account activity</li>
                  <li>Consider temporary account restriction</li>
                  <li>Report to fraud prevention team</li>
                  <li>Monitor for similar patterns</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Model Information */}
        <div className="card" style={{ marginTop: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h2 style={{ color: 'white', marginBottom: '16px' }}>🧠 About Our ML Model</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Algorithm</h4>
              <p>SGD Classifier</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Training Data</h4>
              <p>50,440 transactions</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Features</h4>
              <p>23 key attributes</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Balanced Dataset</h4>
              <p>80:20 ratio</p>
            </div>
          </div>
          <p style={{ marginTop: '20px', opacity: 0.9 }}>
            Our model uses SGD Classifier with 80:20 balanced dataset (80% non-fraud, 20% fraud) for realistic 
            fraud detection. Achieves 30.45% F1-Score with 56.89% recall, reducing false positives on legitimate transactions.
          </p>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .form-input:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default TransactionCheck;
