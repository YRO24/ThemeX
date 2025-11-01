import React, { useEffect } from "react";
import "../LandingPage/LandingPage.css";

const LandingPage = () => {

  // Smooth scroll to top when page loads or user navigates back
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Themex</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-buttons">
          <a href="/SignUp">
            <button className="signup-btn">Sign Up</button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-text">
          <h1>
            Collaborate with your <span>team</span> and achieve your best work.
          </h1>
          <p>
            Themex helps teams collaborate efficiently and creatively to achieve
            their goals with precision — making productivity simple and enjoyable.
          </p>
          <div className="hero-buttons">
            <a href="/Login">
              <button className="get-started">Get Started</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://i.pinimg.com/736x/3a/9c/73/3a9c73436f56b7925ae390d10cbb2186.jpg"
            alt="Team collaboration"
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <h2>About Themex</h2>
        <p>
          Themex is built to empower modern teams. Whether you're managing projects,
          brainstorming new ideas, or tracking client work, Themex keeps your team
          connected, organized, and productive — all in one place.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          {[
            { title: "Team Collaboration", desc: "Work together in real-time with seamless communication tools." },
            { title: "Project Management", desc: "Track progress, assign tasks, and meet deadlines with clarity." },
            { title: "Smart Dashboard", desc: "Visualize your team's activity, performance, and achievements." },
            { title: "Secure Workspace", desc: "Your data and ideas are protected with enterprise-grade security." },
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* Contact */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <p>Have questions or want to learn more about Themex? Send us a message.</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" className="send-btn">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Themex. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
