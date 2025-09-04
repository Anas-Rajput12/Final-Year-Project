"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [student] = useState({
    name: "Ali Raza",
    email: "ali.raza@example.com",
    department: "Information Technology",
  });

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI, sans-serif", background: "#f4f6f9" }}>
      {/* Sidebar */}
      <aside style={{
        width: "250px",
        background: "linear-gradient(135deg, #3498db, #8e44ad)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px"
      }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "30px" }}>🎓 Student Portal</h2>
        <nav>
          <a href="/dashboard" style={navLink}>🏠 Dashboard</a>
          <a href="#" style={navLink}>📚 Courses</a>
          <a href="#" style={navLink}>📝 Assignments</a>
          <a href="#" style={navLink}>📊 Results</a>
          <a href="#" style={navLink}>📩 Messages</a>
          <a onClick={handleLogout} style={{ ...navLink, color: "#ff7675", fontWeight: "bold", cursor: "pointer" }}>🚪 Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {/* Topbar */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px"
        }}>
          <div>
            <h1 style={{ margin: 0 }}>Welcome, {student.name}</h1>
            <p style={{ margin: 0, color: "#666" }}>{student.department} Department</p>
          </div>
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </header>

        {/* Stats Cards */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
          marginBottom: "20px"
        }}>
          <div style={cardStyle}>📚 <h3 style={{ margin: "5px 0" }}>5</h3><p>Enrolled Courses</p></div>
          <div style={cardStyle}>📝 <h3 style={{ margin: "5px 0" }}>12</h3><p>Pending Assignments</p></div>
          <div style={cardStyle}>📊 <h3 style={{ margin: "5px 0" }}>3.8</h3><p>CGPA</p></div>
          <div style={cardStyle}>📩 <h3 style={{ margin: "5px 0" }}>4</h3><p>New Messages</p></div>
        </section>

        {/* Recent Activity */}
        <section style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0 }}>Recent Activity</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
            <li style={activityItem}>✅ Submitted Assignment 3 for DBMS</li>
            <li style={activityItem}>📢 New Announcement: Mid-term exams</li>
            <li style={activityItem}>📚 Enrolled in AI Course</li>
            <li style={activityItem}>📝 Uploaded Project Report</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

// 🔹 Styles (reusable objects)
const navLink: React.CSSProperties = {
  display: "block",
  padding: "12px 15px",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  transition: "background 0.3s",
  marginBottom: "10px"
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  textAlign: "center",
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.3s"
};

const activityItem: React.CSSProperties = {
  padding: "10px 0",
  borderBottom: "1px solid #eee"
};
