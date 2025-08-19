import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <--- useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("authToken", token);
      setError("");
      navigate("/"); // <--- redirect to homepage
    } catch (err) {
      if (err.response) setError(err.response.data.message);
      else setError("Server error");
    }
  };

  return (
    <div className="page-background">
      <div className="homepage-card glass-container login-card">
        <h2 className="login-title">Login</h2>
        {error && (
          <div className="error-box">
            <p className="error-title">Error</p>
            <ul className="error-list">
              <li>{error}</li>
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="action-btn login-btn">
            Login
          </button>

          {/* Signup Button */}
          <button
            type="button"
            className="action-btn login-btn"
            style={{ marginTop: "10px", backgroundColor: "#4cafef" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
