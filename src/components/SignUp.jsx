import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // <-- import navigate hook
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // <-- hook for navigation

  // handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8000/api/user/signup", form);

      setMessage(res.data.message);

      // reset form
      setForm({ username: "", email: "", password: "" });

      // ✅ redirect to login after 1 sec
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.error || "Signup failed");
      } else {
        setMessage("Server not responding");
      }
    }
  };

  return (
    <div className="page-background">
      <div className="glass-container login-card">
        <h2 className="login-title">Sign Up</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-btn glass-effect">
            Sign Up
          </button>
        </form>

        {message && (
          <p className="error-title" style={{ marginTop: "1rem" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
