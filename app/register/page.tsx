"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!email || !password) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // check if already registered
    const existingUser = localStorage.getItem("user_" + email);
    if (existingUser) {
      setError("⚠️ User already exists, please login");
      return;
    }

    // save user
    localStorage.setItem("user_" + email, JSON.stringify({ email, password }));

    alert("✅ Registered Successfully! Please login.");
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
      <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", width: "350px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>

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
          onClick={handleRegister}
          style={{ width: "105%", padding: "10px", background: "#3498db", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account? <a href="/login" style={{ color: "#3498db" }}>Login</a>
        </p>
      </div>
    </div>
  );
}
