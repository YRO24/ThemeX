import React from "react";
import "../LandingPage/LandingPage.css";


const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Themex</div>
        <ul className="nav-links">
  <li><a href="/landing">Home</a></li>
  <li><a href="/resources">Resources</a></li>
  <li><a href="/enterprise">Enterprise</a></li>
  <li><a href="/pricing">Pricing</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>

        <div className="nav-buttons">
         <div className="nav-buttons">
  <a href="/SignUp"><button className="signup-btn">Sign Up</button></a>
</div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Collaborate with team, & <span>achieve</span> best work.
          </h1>
          <p>
            We help teams at Themex collaborate efficiently to achieve desired
            tasks with creativity and precision — making client satisfaction our
            top priority.
          </p>

          <div className="hero-buttons">
            <a href="/Login">
  <button className="get-started">Get Started</button>
</a>

          
          </div>
        </div>

        <div className="hero-image">
          <img src= 'https://i.pinimg.com/736x/3a/9c/73/3a9c73436f56b7925ae390d10cbb2186.jpg' alt="team collaboration" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
