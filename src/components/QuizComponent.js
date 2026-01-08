import React, { useState } from 'react';

const QuizComponent = ({ userType }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quizQuestions = [
    {
      question: "You receive a call from someone claiming to be from your bank, asking for your OTP to 'secure' your account. What should you do?",
      options: [
        "Provide the OTP immediately to secure my account",
        "Ask for their employee ID and call back",
        "Hang up and call the bank directly using official number",
        "Share OTP but ask them to explain why they need it"
      ],
      correct: 2,
      explanation: "Banks never ask for OTP over phone. Always hang up and call the bank directly using their official number.",
      userSpecific: {
        student: "As a student, you might be targeted with education loan or scholarship scams. Always verify through official channels.",
        professional: "Professionals are often targeted with investment or tax-related scams. Be extra cautious.",
        homemaker: "Homemakers may receive calls about insurance or prize schemes. Never share OTP for any reason.",
        rural: "Rural users are often targeted with government scheme frauds. Government officials never ask for OTP.",
        senior: "Senior citizens are frequently targeted. If unsure, always consult family members before sharing any information."
      }
    },
    {
      question: "You see a WhatsApp message claiming you've won ₹10 lakhs in a lottery you never entered. It asks for a processing fee of ₹5,000. What do you do?",
      options: [
        "Pay the processing fee to claim my prize",
        "Ask for proof of the lottery before paying",
        "Ignore and delete the message - it's definitely a scam",
        "Forward it to friends to check if they got it too"
      ],
      correct: 2,
      explanation: "Legitimate lotteries never ask for processing fees. If you didn't enter a lottery, you can't win it. These are always scams.",
      userSpecific: {
        student: "Students often fall for prize scams. Remember: if you didn't participate, you can't win.",
        professional: "Professionals might receive fake tax refund or bonus messages. Always verify through official channels.",
        homemaker: "Prize scams often target homemakers. Never pay fees to claim prizes you didn't win.",
        rural: "Rural users may receive fake government benefit messages. Verify all claims through local government offices.",
        senior: "Senior citizens are prime targets for lottery scams. When in doubt, consult family members."
      }
    },
    {
      question: "You want to make a UPI payment to a merchant. What should you verify before scanning their QR code?",
      options: [
        "Just scan and pay - QR codes are always safe",
        "Check if the merchant name matches the shop",
        "Verify merchant name, check amount, and confirm before paying",
        "Ask someone else to scan it first"
      ],
      correct: 2,
      explanation: "Always verify merchant name, double-check the amount, and confirm all details before making any UPI payment.",
      userSpecific: {
        student: "Students using UPI for small purchases should always verify merchant details to avoid fake QR scams.",
        professional: "Professionals making business payments should be extra careful about verifying merchant authenticity.",
        homemaker: "When shopping or paying for services, always check the merchant name matches the business.",
        rural: "Rural users new to digital payments should take extra time to verify all payment details.",
        senior: "Senior citizens should ask for help or double-check all details before making digital payments."
      }
    },
    {
      question: "You receive an email that looks like it's from your bank, asking you to update your KYC by clicking a link. What's the safest approach?",
      options: [
        "Click the link immediately to avoid account closure",
        "Reply to the email asking for more information",
        "Delete the email and visit the bank branch or official website",
        "Forward the email to friends to check if it's real"
      ],
      correct: 2,
      explanation: "Banks don't ask for KYC updates through email links. Always visit the branch or log into the official website directly.",
      userSpecific: {
        student: "Students should be aware that educational institutions also don't ask for updates via email links.",
        professional: "Professionals often receive fake emails about salary accounts or tax issues. Always verify independently.",
        homemaker: "Homemakers may receive fake insurance or banking emails. Never click links in suspicious emails.",
        rural: "Rural users should verify any government or banking communication through local offices.",
        senior: "Senior citizens should never click links in emails. Always seek help from family or visit the branch."
      }
    },
    {
      question: "Someone offers you a 'guaranteed' investment opportunity promising 30% monthly returns. How do you respond?",
      options: [
        "Invest immediately - high returns are great",
        "Invest a small amount first to test it",
        "Reject it - guaranteed high returns are always scams",
        "Ask for references from other investors"
      ],
      correct: 2,
      explanation: "No legitimate investment can guarantee 30% monthly returns. Such promises are always signs of scams or Ponzi schemes.",
      userSpecific: {
        student: "Students with limited income should be especially wary of get-rich-quick schemes.",
        professional: "Professionals with disposable income are prime targets for investment scams. Research thoroughly before investing.",
        homemaker: "Homemakers managing household savings should stick to traditional, verified investment options.",
        rural: "Rural users should consult local bank managers for legitimate investment options.",
        senior: "Senior citizens should never make investment decisions without consulting family or trusted advisors."
      }
    },
    {
      question: "You get a job offer via WhatsApp promising ₹30,000/month for 2 hours of data entry work. They ask for ₹5,000 as registration fee. What do you do?",
      options: [
        "Pay the fee - it's a great opportunity",
        "Negotiate a lower registration fee",
        "Reject it - legitimate jobs never ask for upfront fees",
        "Ask to pay the fee after getting first salary"
      ],
      correct: 2,
      explanation: "Legitimate employers never ask for registration fees. High pay for minimal work is usually a red flag for job scams.",
      userSpecific: {
        student: "Students looking for part-time work are often targeted. Remember: real jobs pay you, not the other way around.",
        professional: "Even professionals looking for side income can fall for these scams. Verify company details thoroughly.",
        homemaker: "Homemakers seeking work-from-home opportunities should be extra cautious about upfront fee requests.",
        rural: "Rural users may receive fake government job offers. Verify through proper government employment channels.",
        senior: "Senior citizens looking for post-retirement work should consult family before pursuing any job opportunities."
      }
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
      return { message: "Excellent! You're well-prepared against cyber fraud!", color: "#27ae60" };
    } else if (percentage >= 80) {
      return { message: "Good job! You have solid fraud awareness.", color: "#2ecc71" };
    } else if (percentage >= 60) {
      return { message: "Not bad, but there's room for improvement.", color: "#f39c12" };
    } else {
      return { message: "You need to learn more about cyber security. Stay vigilant!", color: "#e74c3c" };
    }
  };

  if (showResults) {
    const scoreInfo = getScoreMessage();
    return (
      <div className="section">
        <div className="container">
          <div className="quiz-container">
            <div className="card" style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '30px' }}>Quiz Results</h2>
              
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                color: scoreInfo.color,
                marginBottom: '20px'
              }}>
                {score}/{quizQuestions.length}
              </div>
              
              <p style={{ 
                fontSize: '1.3rem', 
                color: scoreInfo.color,
                marginBottom: '40px',
                fontWeight: '600'
              }}>
                {scoreInfo.message}
              </p>

              {userType && (
                <div className="info-card" style={{ marginBottom: '30px', textAlign: 'left' }}>
                  <h3>💡 Personalized Advice for {userType.charAt(0).toUpperCase() + userType.slice(1)}s:</h3>
                  <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
                    {score < quizQuestions.length && (
                      <>
                        <li>Review the fraud types most relevant to your user group</li>
                        <li>Practice identifying red flags in scenarios you might encounter</li>
                        <li>Share this knowledge with others in your community</li>
                      </>
                    )}
                    <li>Stay updated on latest fraud trends targeting your demographic</li>
                    <li>Enable security alerts on all your digital accounts</li>
                  </ul>
                </div>
              )}

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={resetQuiz} className="btn btn-primary">
                  Retake Quiz
                </button>
                <a href="/user-types" className="btn btn-secondary">
                  Get Personalized Tips
                </a>
                <a href="/fraud-types" className="btn btn-secondary">
                  Learn More About Fraud
                </a>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="card" style={{ marginTop: '30px' }}>
              <h3 style={{ marginBottom: '30px' }}>Detailed Results</h3>
              {quizQuestions.map((question, index) => (
                <div key={index} style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
                  <h4 style={{ marginBottom: '15px' }}>Question {index + 1}</h4>
                  <p style={{ marginBottom: '15px', fontWeight: '600' }}>{question.question}</p>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Your Answer: </strong>
                    <span style={{ 
                      color: selectedAnswers[index] === question.correct ? '#27ae60' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {question.options[selectedAnswers[index]] || 'Not answered'}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Correct Answer: </strong>
                    <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
                      {question.options[question.correct]}
                    </span>
                  </div>
                  
                  <div className="info-card" style={{ marginTop: '15px' }}>
                    <strong>Explanation: </strong>{question.explanation}
                    {userType && question.userSpecific[userType] && (
                      <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
                        <strong>For {userType}s: </strong>{question.userSpecific[userType]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title" style={{ 
            fontSize: '2.5rem', 
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🧠 Cyber Security Awareness Quiz
          </h1>
          {userType && (
            <p style={{ 
              color: '#f1f5f9', 
              marginBottom: '20px', 
              fontSize: '1.3rem',
              fontWeight: '600',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: '16px',
              display: 'inline-block',
              backdropFilter: 'blur(10px)'
            }}>
              📋 Customized for <strong style={{ color: '#fbbf24' }}>
                {userType.charAt(0).toUpperCase() + userType.slice(1)}s
              </strong>
            </p>
          )}
        </div>
        
        <div className="quiz-container">
          <div className="card" style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Progress Section */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  color: '#1f2937',
                  background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                  padding: '8px 16px',
                  borderRadius: '12px'
                }}>
                  📊 Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <div style={{ 
                  background: '#e5e7eb', 
                  borderRadius: '12px', 
                  height: '12px', 
                  width: '300px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
                    height: '100%', 
                    width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                    transition: 'width 0.5s ease',
                    borderRadius: '12px'
                  }}></div>
                </div>
              </div>
            </div>

            <div className="question-card" style={{
              background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '12px',
                marginBottom: '24px',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'inline-block'
              }}>
                🎯 Scenario Question
              </div>
              
              <h3 className="question-title" style={{
                fontSize: '1.6rem',
                lineHeight: '1.5',
                color: '#1f2937',
                fontWeight: '700',
                marginBottom: '32px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '2px solid #ddd6fe',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}>
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <div className="answer-options" style={{
                display: 'grid',
                gap: '16px'
              }}>
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`answer-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                    style={{
                      padding: '20px 24px',
                      background: selectedAnswers[currentQuestion] === index 
                        ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      border: selectedAnswers[currentQuestion] === index 
                        ? '3px solid #2563eb' 
                        : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: '#1f2937',
                      fontWeight: '600',
                      fontSize: '1.05rem',
                      position: 'relative',
                      transform: selectedAnswers[currentQuestion] === index 
                        ? 'translateX(8px)' 
                        : 'translateX(0)',
                      boxShadow: selectedAnswers[currentQuestion] === index 
                        ? '0 8px 20px rgba(37, 99, 235, 0.2)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedAnswers[currentQuestion] !== index) {
                        e.target.style.background = 'rgba(37, 99, 235, 0.05)';
                        e.target.style.borderColor = '#93c5fd';
                        e.target.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedAnswers[currentQuestion] !== index) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <span style={{ 
                      marginRight: '12px', 
                      background: selectedAnswers[currentQuestion] === index ? '#2563eb' : '#6b7280',
                      color: 'white',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="btn btn-primary"
                style={{
                  padding: '16px 32px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  borderRadius: '12px',
                  background: selectedAnswers[currentQuestion] !== undefined 
                    ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' 
                    : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  cursor: selectedAnswers[currentQuestion] !== undefined ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedAnswers[currentQuestion] !== undefined 
                    ? '0 8px 20px rgba(37, 99, 235, 0.3)' 
                    : 'none',
                  transform: selectedAnswers[currentQuestion] !== undefined ? 'scale(1)' : 'scale(0.95)'
                }}
                onMouseEnter={(e) => {
                  if (selectedAnswers[currentQuestion] !== undefined) {
                    e.target.style.transform = 'translateY(-2px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAnswers[currentQuestion] !== undefined) {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)';
                  }
                }}
              >
                {currentQuestion === quizQuestions.length - 1 ? '🏁 Finish Quiz' : '➡️ Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
