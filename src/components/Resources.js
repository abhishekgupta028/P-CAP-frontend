import React, { useState } from 'react';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('helplines');

  const helplines = [
    {
      name: "National Cyber Crime Reporting Portal",
      number: "1930",
      description: "24/7 helpline for reporting cyber crimes",
      website: "cybercrime.gov.in"
    },
    {
      name: "Citizen Financial Cyber Frauds Reporting",
      number: "155260",
      description: "Report financial frauds and digital payment scams",
      website: "cybercrime.gov.in"
    },
    {
      name: "Reserve Bank of India",
      number: "14448",
      description: "RBI's banking ombudsman for banking-related complaints",
      website: "rbi.org.in"
    },
    {
      name: "CERT-In (Indian Computer Emergency Response Team)",
      number: "1800-11-4949",
      description: "Computer security incident reporting",
      website: "cert-in.org.in"
    }
  ];

  const tools = [
    {
      name: "PhishTank",
      description: "Check if a website is a phishing site",
      url: "phishtank.com",
      category: "Verification"
    },
    {
      name: "VirusTotal",
      description: "Scan files and URLs for malware",
      url: "virustotal.com",
      category: "Security"
    },
    {
      name: "Have I Been Pwned",
      description: "Check if your email has been compromised",
      url: "haveibeenpwned.com",
      category: "Data Breach"
    },
    {
      name: "Google Safe Browsing",
      description: "Check if a website is safe to visit",
      url: "transparencyreport.google.com/safe-browsing",
      category: "Verification"
    },
    {
      name: "Scammer.info",
      description: "Community-driven scam database",
      url: "scammer.info",
      category: "Education"
    }
  ];

  const educationalResources = [
    {
      title: "Digital India - Cyber Safety",
      description: "Government initiative for digital literacy and cyber safety",
      url: "digitalindia.gov.in",
      type: "Government"
    },
    {
      title: "RBI - Customer Education",
      description: "Reserve Bank's guide to safe digital banking",
      url: "rbi.org.in/Scripts/PublicationsView.aspx?id=19417",
      type: "Banking"
    },
    {
      title: "NPCI - UPI Safety Guidelines",
      description: "Official UPI safety tips and best practices",
      url: "npci.org.in",
      type: "Payments"
    },
    {
      title: "CERT-In Security Guidelines",
      description: "Computer security best practices for individuals",
      url: "cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES01&VLCODE=CIVN-2021-0001",
      type: "Technical"
    },
    {
      title: "Cyber Dost",
      description: "Delhi Police cyber crime awareness initiative",
      url: "cyberdost.gov.in",
      type: "Awareness"
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      title: "Immediate Action",
      actions: [
        "Don't panic - quick action can minimize damage",
        "If money is involved, immediately call your bank",
        "Screenshot/save evidence of the fraud",
        "Note down all relevant details (phone numbers, account details, etc.)"
      ]
    },
    {
      step: 2,
      title: "Secure Your Accounts",
      actions: [
        "Change passwords for all affected accounts",
        "Enable 2-factor authentication where possible",
        "Check all bank and card statements",
        "Monitor your credit report for unauthorized activities"
      ]
    },
    {
      step: 3,
      title: "Report the Fraud",
      actions: [
        "File complaint on cybercrime.gov.in",
        "Report to your bank if financial fraud occurred",
        "Lodge FIR at nearest police station if significant loss",
        "Report to relevant authorities (telecom for SIM fraud, etc.)"
      ]
    },
    {
      step: 4,
      title: "Follow Up",
      actions: [
        "Keep all complaint/reference numbers safe",
        "Follow up regularly with authorities",
        "Inform family and friends to prevent similar frauds",
        "Share your experience to educate others"
      ]
    }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'helplines':
        return (
          <div>
            <h2 style={{ marginBottom: '30px' }}>🆘 Emergency Helplines</h2>
            <div className="fraud-types-grid">
              {helplines.map((helpline, index) => (
                <div key={index} className="card danger-card">
                  <h3 style={{ marginBottom: '15px' }}>{helpline.name}</h3>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: '#d63031',
                    marginBottom: '15px'
                  }}>
                    📞 {helpline.number}
                  </div>
                  <p style={{ marginBottom: '15px' }}>{helpline.description}</p>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '10px', 
                    borderRadius: '5px' 
                  }}>
                    🌐 {helpline.website}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tools':
        return (
          <div>
            <h2 style={{ marginBottom: '30px' }}>🛠️ Security Tools & Verification</h2>
            <div className="fraud-types-grid">
              {tools.map((tool, index) => (
                <div key={index} className="card info-card">
                  <h3 style={{ marginBottom: '15px' }}>{tool.name}</h3>
                  <p style={{ marginBottom: '15px' }}>{tool.description}</p>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '8px 12px', 
                    borderRadius: '15px',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    marginBottom: '15px'
                  }}>
                    {tool.category}
                  </div>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '10px', 
                    borderRadius: '5px' 
                  }}>
                    🔗 {tool.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div>
            <h2 style={{ marginBottom: '30px' }}>📚 Educational Resources</h2>
            <div className="fraud-types-grid">
              {educationalResources.map((resource, index) => (
                <div key={index} className="card success-card">
                  <h3 style={{ marginBottom: '15px' }}>{resource.title}</h3>
                  <p style={{ marginBottom: '15px' }}>{resource.description}</p>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '8px 12px', 
                    borderRadius: '15px',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    marginBottom: '15px'
                  }}>
                    {resource.type}
                  </div>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '10px', 
                    borderRadius: '5px' 
                  }}>
                    🔗 {resource.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div>
            <h2 style={{ marginBottom: '30px' }}>🚨 What to Do if You're Scammed</h2>
            <div style={{ display: 'grid', gap: '30px' }}>
              {emergencySteps.map((stepData, index) => (
                <div key={index} className="card warning-card">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ 
                      background: '#e17055', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '40px', 
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '15px'
                    }}>
                      {stepData.step}
                    </div>
                    <h3>{stepData.title}</h3>
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {stepData.actions.map((action, actionIndex) => (
                      <li key={actionIndex} style={{ 
                        marginBottom: '10px', 
                        padding: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '5px',
                        borderLeft: '3px solid #e17055'
                      }}>
                        ✓ {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Resources & Help</h1>
        <p style={{ textAlign: 'center', color: 'white', marginBottom: '40px', fontSize: '1.2rem' }}>
          Your complete guide to cyber fraud prevention and response
        </p>

        {/* Category Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'helplines', label: '📞 Helplines', desc: 'Emergency contacts' },
            { id: 'tools', label: '🛠️ Tools', desc: 'Security verification' },
            { id: 'education', label: '📚 Learn More', desc: 'Educational resources' },
            { id: 'emergency', label: '🚨 If Scammed', desc: 'Emergency response' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px 20px',
                minWidth: '140px'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                {category.label}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {category.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        {renderContent()}

        {/* Additional Resources */}
        <div className="card" style={{ marginTop: '50px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>💡 Remember</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🕒</div>
              <strong>Act Quickly</strong>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                The faster you report fraud, the better your chances of recovery
              </p>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📝</div>
              <strong>Document Everything</strong>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                Keep records of all communications and transactions
              </p>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👥</div>
              <strong>Share & Educate</strong>
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                Help others by sharing your experience and knowledge
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
