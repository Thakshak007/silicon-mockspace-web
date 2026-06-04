import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* NAVIGATION */}
      <nav className="navbar">
        <h1 className="logo">Silicon MockSpace</h1>
        <button className="nav-button">Book Session</button>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <h2>Crack Your Next VLSI Interview with Industry Experts</h2>
          <p>Targeted mock interviews and personalized guidance for Physical Design and RTL Design freshers. We don't just teach theory; we prepare you for the hot seat.</p>
          <button className="cta-button">Schedule Your Mock Interview</button>
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
        <button className="cta-button">Book Now</button>
        <p className="copyright">© 2026 Silicon MockSpace. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;