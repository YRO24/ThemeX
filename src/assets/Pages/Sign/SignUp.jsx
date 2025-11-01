import React from "react";
import "./SignUp.css";

function Signup() {
  return (
    <div className="auth-page">
      <div className="signup-container">
        <div className="signup-form-section">
          <div className="nav">
            <div className="logo">Themex.</div>
            <div className="nav-links">
              <a href="/landing">Home</a>
              <a href="/login">Join</a>
            </div>
          </div>

          <div className="form-content">
            <p className="start-text">START FOR FREE</p>
            <h1>
              Create new account<span className="dot">.</span>
            </h1>
            <p className="member-text">
              Already a Member? <a href="/login">Log In</a>
            </p>

            <form>
              <div className="name-fields">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit" className="create-btn">Create account</button>
            </form>
          </div>
        </div>

        <div className="signup-image-section">
          <img
            src="https://i.pinimg.com/736x/3a/9c/73/3a9c73436f56b7925ae390d10cbb2186.jpg"
            alt="background"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
