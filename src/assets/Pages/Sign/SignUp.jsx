import React, { useState } from "react";
import "./SignUp.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    // Client-side validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
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
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
              <div className="name-fields">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="create-btn"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
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