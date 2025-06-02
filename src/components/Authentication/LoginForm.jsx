import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      setError("");

      // Example role-based redirect
      if (matchedUser.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/rentals"); // or another route based on role
      }
    }
  };

  return (
    <div className="login-form">
      {/* <h2 className="px-4 text-2xl">Login to ENTNT Dashboard</h2> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="px-20" onSubmit={handleSubmit}>
        <div >
          <label className="text-lg">Email:</label>
          <br />
          <input
            type="email"
            name="email"
            className="bg-sky-100 text-m"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-2">
          <label className="text-lg">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="bg-sky-100 text-m"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
