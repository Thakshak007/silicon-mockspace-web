import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeError, setTimeError] = useState('');
  
  // ADDED: transactionId to state
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    education: '',
    college: '',
    track: 'Physical Design', 
    preference: '',
    datetime: '',
    transactionId: '' 
  });

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const validateDateTime = (datetimeStr) => {
    if (!datetimeStr) return ""; 

    const selectedDate = new Date(datetimeStr);
    const day = selectedDate.getDay(); 
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    
    const time = hour + (minutes / 60);

    if (day === 0) {
      if (time < 10 || time > 18) {
        return "Sunday sessions are only available between 10:00 AM and 6:00 PM.";
      }
    } else {
      if (time < 17 || time > 21) {
        return "Monday-Saturday sessions are only available between 5:00 PM and 9:00 PM.";
      }
    }
    return ""; 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'datetime') {
      const errorMessage = validateDateTime(value);
      setTimeError(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errorMessage = validateDateTime(formData.datetime);
    if (errorMessage) {
      setTimeError(errorMessage);
      return; 
    }

    // Prepare data for email (Now includes Transaction_ID)
    const submissionData = {
      // IMPORTANT: Replace the text below with your actual key from Web3Forms!
      access_key: "5eb7bf73-b00b-4978-9abf-0517d32b1be3",
      subject: `New Mock Interview Booking from ${formData.name}`,
      from_name: "Silicon MockSpace Portal",
      Name: formData.name,
      Email: formData.email,
      Phone_Number: formData.phone,
      Education: formData.education,
      College_or_Company: formData.college,
      Track: formData.track,
      Focus_Preferences: formData.preference || "None specified",
      Requested_Time: formData.datetime,
      UPI_Transaction_ID: formData.transactionId
    };

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      // Show success message and clear form
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', education: '', college: '', track: 'Physical Design', preference: '', datetime: '', transactionId: '' });
        setTimeError(''); 
      }, 4000);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending the request. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1 className="logo">Silicon MockSpace</h1>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h2>Crack Your Next VLSI Interview with Industry Experts</h2>
          <p>Targeted mock interviews and personalized guidance for Physical Design and RTL Design freshers. We don't just teach theory; we prepare you for the hot seat.</p>
          <button className="cta-button" onClick={() => setIsModalOpen(true)}>Schedule Your Mock Interview</button>
        </div>
      </header>

      <section className="tracks-section">
        <h3>Choose Your Track</h3>
        <div className="tracks-grid">
          <div className="track-card pd-card">
            <h4>Physical Design (PD)</h4>
            <p className="track-subtitle">Perfect for backend roles.</p>
            <ul>
              <li>Floorplanning & Placement</li>
              <li>Clock Tree Synthesis (CTS)</li>
              <li>Routing & Congestion</li>
              <li>Static Timing Analysis (STA)</li>
            </ul>
            <button className="track-btn" onClick={() => { setFormData({...formData, track: 'Physical Design'}); setIsModalOpen(true); }}>Select PD Track</button>
          </div>
          <div className="track-card rtl-card">
            <h4>RTL & Digital Design</h4>
            <p className="track-subtitle">Perfect for frontend/logic roles.</p>
            <ul>
              <li>RTL Design & Verilog</li>
              <li>CMOS Fundamentals</li>
              <li>Digital Logic Concepts</li>
              <li>State Machine Design</li>
            </ul>
            <button className="track-btn rtl-btn" onClick={() => { setFormData({...formData, track: 'RTL & Digital Design'}); setIsModalOpen(true); }}>Select RTL Track</button>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h3>How It Works</h3>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Book</h4>
            <p>Choose the PD or RTL track and schedule a time.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Interview</h4>
            <p>Face a rigorous technical mock session with our panel.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Refine</h4>
            <p>Get a detailed feedback report and a targeted study guide.</p>
          </div>
        </div>
      </section>

      <section className="expertise-section">
        <h3>Who is Interviewing You?</h3>
        <div className="expertise-box">
          <p>You won't be interviewed by academicians. You will face a panel of 3 to 4 active VLSI professionals who execute these flows daily.</p>
          <p>We know exactly what hiring managers are looking for when it comes to setup/hold violations, CTS constraints, and RTL logic.</p>
        </div>
      </section>

      <footer className="footer">
        <h2>Ready to bridge your knowledge gap?</h2>
        <button className="cta-button" onClick={() => setIsModalOpen(true)}>Book Now</button>
        <p className="copyright">© 2026 Silicon MockSpace. All rights reserved.</p>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="close-modal" onClick={() => { setIsModalOpen(false); setTimeError(''); }}>×</button>
            {submitted ? (
              <div className="success-message">
                <h4>Booking Request Received!</h4>
                <p>Our panel members will review your details, verify your payment, and reach out to your email within 24 hours to confirm your interview slot.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <h3>Schedule Your Panel Session</h3>
                <p>Fill out your details to match with our interview panel.</p>
                
                <label>Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />

                <label>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="username@example.com" />

                <label>Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" />

                <label>Educational Qualification</label>
                <input type="text" name="education" required value={formData.education} onChange={handleInputChange} placeholder="e.g., B.E., M.Tech" />

                <label>College / Company Name</label>
                <input type="text" name="college" required value={formData.college} onChange={handleInputChange} placeholder="Where do you study/work?" />

                <label>Target Interview Track</label>
                <select name="track" value={formData.track} onChange={handleInputChange}>
                  <option value="Physical Design">Physical Design (Floorplan, CTS, STA)</option>
                  <option value="RTL & Digital Design">RTL & Digital Design (Logic, CMOS, Verilog)</option>
                </select>

                <label>Any Preferences or Specific Focus?</label>
                <textarea 
                  name="preference" 
                  value={formData.preference} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Focus more on Setup/Hold violations..." 
                  rows="2" 
                  style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />

                <label>Preferred Date & Time</label>
                <input 
                  type="datetime-local" 
                  name="datetime" 
                  required 
                  value={formData.datetime} 
                  onChange={handleInputChange}
                  min={getMinDateTime()} 
                  style={{ marginBottom: timeError ? '5px' : '20px' }}
                />
                
                {timeError && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginBottom: '20px', marginTop: '0' }}>
                    {timeError}
                  </p>
                )}

                {/* --- PAYMENT SCANNER SECTION --- */}
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#1e293b' }}>💳 Step 1: Scan & Pay</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px' }}>Scan the QR code using Google Pay, PhonePe, or Paytm to pay the mock interview fee.</p>
                  
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {/* Make sure qrcode.png or .jpg is inside your public folder */}
                    <img src="/phonepe.png" alt="UPI QR Code" style={{ maxWidth: '200px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>

                  <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#1e293b' }}>📝 Step 2: Verify Payment</h4>
                  <label>12-Digit UPI Transaction ID (UTR)</label>
                  <input 
                    type="text" 
                    name="transactionId" 
                    required 
                    value={formData.transactionId} 
                    onChange={handleInputChange} 
                    placeholder="Enter 12-digit UTR number" 
                    maxLength="12"
                    style={{ marginBottom: '0px' }}
                  />
                </div>
                {/* --- END PAYMENT SECTION --- */}

                <button type="submit" className="submit-form-btn">Submit Booking Request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;