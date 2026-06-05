import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage if the booking modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to handle form submission message
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', track: 'Physical Design' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can connect an API later. For now, we simulate a successful booking.
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', track: 'Physical Design' });
    }, 3000);
  };

  return (
    <div className="app-container">
      {/* NAVIGATION */}
      <nav className="navbar">
        <h1 className="logo">Silicon MockSpace</h1>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <h2>Crack Your Next VLSI Interview with Industry Experts</h2>
          <p>Targeted mock interviews and personalized guidance for Physical Design and RTL Design freshers. We don't just teach theory; we prepare you for the hot seat.</p>
          <button className="cta-button" onClick={() => setIsModalOpen(true)}>Schedule Your Mock Interview</button>
        </div>
      </header>

      {/* TRACKS SECTION */}
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

      {/* PROCESS SECTION */}
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

      {/* EXPERTISE SECTION */}
      <section className="expertise-section">
        <h3>Who is Interviewing You?</h3>
        <div className="expertise-box">
          <p>You won't be interviewed by academicians. You will face a panel of 3 to 4 active VLSI professionals who execute these flows daily.</p>
          <p>We know exactly what hiring managers are looking for when it comes to setup/hold violations, CTS constraints, and RTL logic.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h2>Ready to bridge your knowledge gap?</h2>
        <button className="cta-button" onClick={() => setIsModalOpen(true)}>Book Now</button>
        <p className="copyright">© 2026 Silicon MockSpace. All rights reserved.</p>
      </footer>

      {/* POPUP MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>
            {submitted ? (
              <div className="success-message">
                <h4>Booking Request Received!</h4>
                <p>Our panel members will reach out to your email within 24 hours to schedule your interview slot.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <h3>Schedule Your Panel Session</h3>
                <p>Fill out your details to match with our 3-4 member interview panel.</p>
                
                <label>Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />

                <label>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="username@example.com" />

                <label>Target Interview Track</label>
                <select name="track" value={formData.track} onChange={handleInputChange}>
                  <option value="Physical Design">Physical Design (Floorplan, CTS, STA)</option>
                  <option value="RTL & Digital Design">RTL & Digital Design (Logic, CMOS, Verilog)</option>
                </select>

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