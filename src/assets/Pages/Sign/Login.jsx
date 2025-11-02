import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirect to main page
        window.location.href = "/main";
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <div className="nav">
            <div className="logo">Themex</div>
            <div className="nav-links">
              <a href="/landing">Home</a>
              <a href="/signup">Signup</a>
            </div>
          </div>

          <div className="form-content">
            <p className="welcome-text">Welcome Back 👋</p>
            <h1>
              Login<span className="dot">.</span>
            </h1>
            <p className="member-text">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>

            {error && (
              <div className="error-message" style={{
                backgroundColor: '#fee',
                color: '#c33',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                border: '1px solid #fcc'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="extra-options">
                <a href="#">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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