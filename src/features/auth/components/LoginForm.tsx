"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { login } from "../services/authApi";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result.success) {
        router.push("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between al space-y-4 max-w-sm">
      <input
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Login</button>
    </form>
  );
}
