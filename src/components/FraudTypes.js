import React, { useState } from 'react';

const FraudTypes = () => {
  const [selectedFraud, setSelectedFraud] = useState(null);

  const fraudTypes = [
    {
      id: 'phishing',
      title: '🎣 Phishing Attacks',
      description: 'Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities',
      severity: 'Critical',
      examples: [
        'Fake bank emails asking for account verification',
        'Suspicious links in SMS claiming urgent action needed',
        'Fake government websites asking for Aadhaar details'
      ],
      howItWorks: [
        'Fraudsters create fake websites that look like legitimate ones',
        'They send emails or messages with links to these fake sites',
        'Victims enter their credentials, which are then stolen',
        'Information is used for unauthorized transactions'
      ],
      preventionTips: [
        'Always check website URLs carefully (look for HTTPS)',
        'Never click on suspicious links in emails or SMS',
        'Type website addresses directly in browser',
        'Verify requests by calling the institution directly'
      ],
      realCaseStudy: 'In 2024, over 50,000 Indians lost ₹200 crores to phishing attacks targeting bank customers through fake UPI payment confirmations.'
    },
    {
      id: 'otp-scam',
      title: '📱 OTP & Phone Scams',
      description: 'Fraudsters impersonate bank officials to obtain OTPs and personal information',
      severity: 'Critical',
      examples: [
        'Calls claiming suspicious activity on account requiring OTP verification',
        'SMS asking to call a number to "secure" your account',
        'Fake customer care representatives asking for card details'
      ],
      howItWorks: [
        'Scammers call pretending to be from banks or service providers',
        'They create urgency by claiming account compromise',
        'Victims share OTPs thinking they are securing their accounts',
        'Fraudsters use OTPs to authorize unauthorized transactions'
      ],
      preventionTips: [
        'Never share OTP with anyone over phone or message',
        'Banks never ask for OTP, PIN, or password over phone',
        'Hang up and call bank directly using official numbers',
        'Enable account alerts to monitor all transactions'
      ],
      realCaseStudy: 'A Delhi senior citizen lost ₹2.5 lakhs when fraudsters called claiming his account was hacked and needed OTP to "secure" it.'
    },
    {
      id: 'upi-scam',
      title: '💳 UPI & Digital Payment Frauds',
      description: 'Scams involving fake payment requests, QR codes, and UPI transactions',
      severity: 'High',
      examples: [
        'Fake payment requests appearing to be from known contacts',
        'QR codes that steal money instead of receiving payment',
        'Fake refund processes asking for UPI PIN'
      ],
      howItWorks: [
        'Fraudsters create fake payment requests with familiar names',
        'They generate malicious QR codes for money collection',
        'Victims scan thinking they are making payment but money gets debited',
        'Fake refund calls asking for UPI PIN to "process refund"'
      ],
      preventionTips: [
        'Always verify payment requests with the actual person',
        'Check recipient details before confirming payment',
        'Never share UPI PIN for any refund process',
        'Use only verified merchant QR codes'
      ],
      realCaseStudy: 'Mumbai police reported 15,000+ UPI fraud cases in 2024, with victims losing an average of ₹25,000 per incident.'
    },
    {
      id: 'investment-scam',
      title: '📈 Investment & Trading Scams',
      description: 'Fraudulent investment schemes promising guaranteed high returns',
      severity: 'High',
      examples: [
        'Fake cryptocurrency trading platforms',
        'Ponzi schemes disguised as mutual funds',
        'Fake stock tips through WhatsApp groups'
      ],
      howItWorks: [
        'Scammers create professional-looking investment platforms',
        'They promise unrealistic returns to attract investors',
        'Initial small returns are paid to build trust',
        'Large investments are then stolen, and platforms disappear'
      ],
      preventionTips: [
        'Verify investment platforms with SEBI registration',
        'Be skeptical of guaranteed return promises',
        'Research before investing in any scheme',
        'Consult financial advisors for major investments'
      ],
      realCaseStudy: 'A fake cryptocurrency platform in Bangalore duped 3,000+ investors of ₹500 crores before shutting down overnight.'
    },
    {
      id: 'identity-theft',
      title: '🆔 Identity Theft',
      description: 'Unauthorized use of personal information for fraudulent activities',
      severity: 'Critical',
      examples: [
        'Fake loan applications using stolen Aadhaar/PAN',
        'Unauthorized mobile connections in victim\'s name',
        'Credit card applications using stolen documents'
      ],
      howItWorks: [
        'Personal documents are stolen or data is leaked',
        'Fraudsters use this information to impersonate victims',
        'They apply for loans, credit cards, or services',
        'Victims discover fraud when bills or notices arrive'
      ],
      preventionTips: [
        'Secure physical documents and limit sharing',
        'Monitor credit reports regularly',
        'Enable alerts for new account openings',
        'Report suspicious activities immediately'
      ],
      realCaseStudy: 'Chennai techie discovered 12 loan applications in his name totaling ₹15 lakhs, all using his leaked Aadhaar details.'
    },
    {
      id: 'job-scam',
      title: '💼 Job & Employment Scams',
      description: 'Fake job offers and employment schemes targeting job seekers',
      severity: 'Medium',
      examples: [
        'Work-from-home jobs requiring upfront fees',
        'Fake interviews conducted over phone/video with immediate offers',
        'Data entry jobs promising high pay for simple tasks'
      ],
      howItWorks: [
        'Scammers post attractive job listings on various platforms',
        'They conduct fake interviews and make immediate offers',
        'Victims are asked to pay fees for training or equipment',
        'No actual job exists, and scammers disappear with money'
      ],
      preventionTips: [
        'Legitimate companies never ask for upfront fees',
        'Research company background thoroughly',
        'Be cautious of jobs with unrealistic salary offers',
        'Verify company details and physical address'
      ],
      realCaseStudy: 'Pune students lost ₹50 lakhs to fake data entry job scheme that promised ₹30,000 monthly for 2-hour daily work.'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#d63031';
      case 'High': return '#e17055';
      case 'Medium': return '#fdcb6e';
      default: return '#74b9ff';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Types of Cyber Fraud in India</h1>
        <p style={{ textAlign: 'center', color: 'white', marginBottom: '40px', fontSize: '1.2rem' }}>
          Understanding different fraud types is the first step to protection
        </p>

        {!selectedFraud ? (
          <div className="fraud-types-grid">
            {fraudTypes.map((fraud) => (
              <div
                key={fraud.id}
                className="card"
                onClick={() => setSelectedFraud(fraud)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px',
                  background: getSeverityColor(fraud.severity),
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {fraud.severity}
                </div>
                
                <h3 style={{ marginBottom: '15px', fontSize: '1.3rem', marginTop: '30px' }}>
                  {fraud.title}
                </h3>
                <p style={{ marginBottom: '20px', color: '#666' }}>
                  {fraud.description}
                </p>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong>Common Examples:</strong>
                  <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                    {fraud.examples.slice(0, 2).map((example, index) => (
                      <li key={index} style={{ marginBottom: '5px', fontSize: '0.9rem' }}>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="btn btn-primary" style={{ marginTop: 'auto' }}>
                  Learn More
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <button 
                onClick={() => setSelectedFraud(null)}
                className="btn btn-secondary"
              >
                ← Back to Fraud Types
              </button>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '2rem' }}>
                  {selectedFraud.title}
                </h2>
                <span style={{ 
                  background: getSeverityColor(selectedFraud.severity),
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 'bold'
                }}>
                  {selectedFraud.severity} Risk
                </span>
              </div>

              <p style={{ marginBottom: '30px', fontSize: '1.1rem', color: '#666' }}>
                {selectedFraud.description}
              </p>

              {/* How It Works */}
              <div className="warning-card" style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>🔍 How This Scam Works</h3>
                <ol style={{ paddingLeft: '20px' }}>
                  {selectedFraud.howItWorks.map((step, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Real Examples */}
              <div className="danger-card" style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>⚠️ Real Examples</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedFraud.examples.map((example, index) => (
                    <li key={index} style={{ 
                      marginBottom: '10px', 
                      padding: '10px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '5px',
                      borderLeft: '4px solid #d63031'
                    }}>
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention Tips */}
              <div className="success-card" style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>🛡️ How to Protect Yourself</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedFraud.preventionTips.map((tip, index) => (
                    <li key={index} style={{ 
                      marginBottom: '10px', 
                      padding: '10px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '5px',
                      borderLeft: '4px solid #27ae60'
                    }}>
                      ✓ {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real Case Study */}
              <div className="info-card">
                <h3 style={{ marginBottom: '15px' }}>📊 Real Case Study</h3>
                <p style={{ 
                  fontStyle: 'italic', 
                  padding: '15px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  borderLeft: '4px solid #0984e3'
                }}>
                  {selectedFraud.realCaseStudy}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/quiz" className="btn btn-primary" style={{ marginRight: '20px' }}>
                  Test Your Knowledge
                </a>
                <a href="/user-types" className="btn btn-secondary">
                  Get Personalized Tips
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudTypes;
