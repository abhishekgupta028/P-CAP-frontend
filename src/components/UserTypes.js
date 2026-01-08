import React from 'react';

const UserTypes = ({ selectedUserType, setSelectedUserType }) => {
  const userProfiles = [
    {
      id: 'student',
      title: '🎓 Students',
      description: 'College and university students using digital platforms for education and social media',
      risks: [
        'Fake scholarship schemes',
        'Educational loan frauds',
        'Social media identity theft',
        'Online shopping scams',
        'Fake job offers'
      ],
      specificTips: [
        'Verify scholarship websites with college authorities',
        'Use only official education loan platforms',
        'Be cautious about sharing personal information on social media',
        'Shop only from verified e-commerce platforms',
        'Research companies before applying for jobs online'
      ],
      commonScenarios: [
        'Receiving messages about "guaranteed scholarships" requiring upfront fees',
        'Fake internship offers asking for registration fees',
        'Phishing emails claiming to be from universities'
      ]
    },
    {
      id: 'professional',
      title: '💼 Professionals',
      description: 'Working professionals using digital banking, investment platforms, and business applications',
      risks: [
        'Investment and trading scams',
        'Business email compromise',
        'Fake tax refund schemes',
        'Credit card cloning',
        'Cryptocurrency frauds'
      ],
      specificTips: [
        'Verify investment platforms with SEBI registration',
        'Use multi-factor authentication for business accounts',
        'File taxes only through official income tax website',
        'Monitor bank statements regularly',
        'Research before investing in cryptocurrencies'
      ],
      commonScenarios: [
        'Receiving calls about "guaranteed returns" on investments',
        'Phishing emails mimicking HR or finance departments',
        'Fake notices about tax penalties or refunds'
      ]
    },
    {
      id: 'homemaker',
      title: '🏠 Homemakers',
      description: 'Individuals managing household finances and online shopping',
      risks: [
        'Online shopping frauds',
        'Fake prize and lottery scams',
        'Kitchen appliance/cooking course scams',
        'Work-from-home job frauds',
        'Fake insurance schemes'
      ],
      specificTips: [
        'Buy from trusted e-commerce platforms with good return policies',
        'Never pay fees to claim prizes or lottery winnings',
        'Verify cooking course providers and read reviews',
        'Be skeptical of work-from-home opportunities requiring upfront payment',
        'Purchase insurance only from authorized agents or companies'
      ],
      commonScenarios: [
        'Messages claiming lottery wins requiring processing fees',
        'Fake online cooking or craft course advertisements',
        'Suspicious work-from-home job offers with unrealistic pay'
      ]
    },
    {
      id: 'rural',
      title: '🌾 Rural Users',
      description: 'Users in rural areas with limited digital literacy',
      risks: [
        'Government scheme frauds',
        'Fake banking representatives',
        'Agricultural loan scams',
        'Fake fertilizer/seed suppliers',
        'Subsidy and benefit frauds'
      ],
      specificTips: [
        'Verify government schemes through official websites or local offices',
        'Bank officials will never ask for OTP or PIN over phone',
        'Take agricultural loans only from authorized banks or institutions',
        'Buy seeds and fertilizers from registered dealers',
        'Check subsidy status through official government portals'
      ],
      commonScenarios: [
        'Calls claiming to be from government offering instant subsidies',
        'Fake agricultural loan offers with easy approval',
        'Messages about new government schemes requiring immediate action'
      ]
    },
    {
      id: 'senior',
      title: '👴 Senior Citizens',
      description: 'Elderly users who may be less familiar with digital security',
      risks: [
        'Pension and retirement scams',
        'Medical insurance frauds',
        'Fake tech support calls',
        'Investment schemes targeting retirees',
        'Family emergency scams'
      ],
      specificTips: [
        'Verify pension-related communications with bank or EPF office',
        'Purchase health insurance from authorized agents only',
        'Tech support will never call unsolicited',
        'Consult family before making investment decisions',
        'Verify family emergency claims by calling directly'
      ],
      commonScenarios: [
        'Calls about problems with pension or PF account requiring immediate action',
        'Fake tech support calls claiming computer virus',
        'Investment schemes promising guaranteed returns for retirement'
      ]
    }
  ];

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
  };

  const selectedProfile = userProfiles.find(profile => profile.id === selectedUserType);

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Choose Your Profile</h1>
        <p style={{ textAlign: 'center', color: 'white', marginBottom: '40px', fontSize: '1.2rem' }}>
          Get personalized fraud protection strategies based on your user category
        </p>

        {!selectedUserType ? (
          <div className="user-types-grid">
            {userProfiles.map((profile) => (
              <div
                key={profile.id}
                className="user-type-card card"
                onClick={() => handleUserTypeSelect(profile.id)}
                style={{ cursor: 'pointer' }}
              >
                <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>
                  {profile.title}
                </h3>
                <p style={{ marginBottom: '20px', color: '#666' }}>
                  {profile.description}
                </p>
                <div className="btn btn-primary" style={{ marginTop: 'auto' }}>
                  Select Profile
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <button 
                onClick={() => setSelectedUserType('')}
                className="btn btn-secondary"
              >
                ← Back to Profile Selection
              </button>
            </div>

            <div className="card">
              <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>
                {selectedProfile.title}
              </h2>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem', color: '#666' }}>
                {selectedProfile.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {/* Common Risks */}
                <div className="danger-card">
                  <h3 style={{ marginBottom: '20px' }}>🚨 Common Risks You Face</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {selectedProfile.risks.map((risk, index) => (
                      <li key={index} style={{ 
                        marginBottom: '10px', 
                        padding: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '5px'
                      }}>
                        • {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Protection Tips */}
                <div className="success-card">
                  <h3 style={{ marginBottom: '20px' }}>🛡️ Your Protection Strategy</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {selectedProfile.specificTips.map((tip, index) => (
                      <li key={index} style={{ 
                        marginBottom: '10px', 
                        padding: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '5px'
                      }}>
                        ✓ {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Common Scenarios */}
              <div className="warning-card" style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '20px' }}>⚠️ Watch Out for These Scenarios</h3>
                {selectedProfile.commonScenarios.map((scenario, index) => (
                  <div key={index} style={{ 
                    marginBottom: '15px', 
                    padding: '15px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    borderLeft: '4px solid #e17055'
                  }}>
                    <strong>Scenario {index + 1}:</strong> {scenario}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/quiz" className="btn btn-primary" style={{ marginRight: '20px' }}>
                  Test Your Knowledge
                </a>
                <a href="/fraud-types" className="btn btn-secondary">
                  Learn About Fraud Types
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTypes;
