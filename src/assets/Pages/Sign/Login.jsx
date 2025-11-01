import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <div className="nav">
            <div className="logo">Themex</div>
            <div className="nav-links">
              <a href="/landing">Home</a>
              <a href="/SignUp">Signup</a>
            </div>
          </div>

          <div className="form-content">
            <p className="welcome-text">Welcome Back 👋</p>
            <h1>
              Login<span className="dot">.</span>
            </h1>
            <p className="member-text">
              Don’t have an account? <a href="/SignUp">Sign up</a>
            </p>

            <form>
              <input type="email" placeholder="Email address" required />
              <input type="password" placeholder="Password" required />

              <div className="extra-options">
                <a href="#">Forgot Password?</a>
              </div>

              <button
                type="button"
                className="login-btn"
                onClick={() => (window.location.href = "/main")}
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="login-image-section">
          <img
            src="https://i.pinimg.com/1200x/83/c0/e4/83c0e44081a4668b2dd34a7ce0a93666.jpg"
            alt="login illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
