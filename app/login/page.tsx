"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const storedUser = localStorage.getItem("user_" + email);

    if (!storedUser) {
      setError("⚠️ User not found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
      setError("⚠️ Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", email);
    alert("✅ Login Successful!");
    router.push("/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
      <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", width: "350px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{ width: "105%", padding: "10px", background: "#2ecc71", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account? <a href="/register" style={{ color: "#3498db" }}>Register</a>
        </p>
      </div>
    </div>
  );
}
