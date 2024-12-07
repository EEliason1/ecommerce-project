import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Ensure this import is correct
import Button from "../components/Button";

const Login: React.FC = () => {
  const { login } = useAuth(); // Destructure `login` from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      login(email, data.token); // Use `login` function from the context
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <Button label="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
