import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useUser(); // Use context to manage login
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setError("Invalid credentials");
        } else {
          setError("Failed to log in. Please try again.");
        }
        return;
      }

      const { token } = await response.json();
      login(usernameInput, token); // Save to context
      navigate("/cart");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleLogin} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
