import React from "react";
import "./Login.css";


function Login() {
  return (
   <div class="login-container">
  <div class="login-form-section">
    <div class="nav">
      <div class="logo">Themex</div>
      <div class="nav-links">
        <a href="/landing">Home</a>
        <a href="/SignUp">Signup</a>
      </div>
    </div>

    <div class="form-content">
      <p class="welcome-text">Welcome Back 👋</p>
      <h1>Login<span class="dot">.</span></h1>
      <p class="member-text">Don’t have an account? <a href="/SignUp">Sign up</a></p>

      <form>
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Password" required />

        <div class="extra-options">
          <a href="#">Forgot Password?</a>
        </div>

        <button
  className="login-btn"
  onClick={() => window.location.href = "/Shop"}
>
  Login
</button>


      </form>
    </div>
  </div>

  <div class="login-image-section">
    <img src="https://i.pinimg.com/1200x/83/c0/e4/83c0e44081a4668b2dd34a7ce0a93666.jpg" alt="login illustration" />
  </div>
</div>


     
  );
}

export default Login;
