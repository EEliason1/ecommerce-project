import React, { useState } from "react";
import Button from "../components/Button";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Sign Up</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 text-center mb-4">
          Signup successful! Please log in.
        </p>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Button label="Sign Up" type="submit" />
      </form>
    </div>
  );
};

export default Signup;
