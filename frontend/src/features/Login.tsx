import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      login(username, token);
      alert("Login successful!");
      navigate("/products");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold text-green-forest">Login</h1>
      <form onSubmit={handleLogin} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-light rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-light rounded p-2"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-light to-green-forest hover:from-green-forest hover:to-green-light text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-forest hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
