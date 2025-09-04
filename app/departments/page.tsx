import Link from "next/link";

const departments = {
  it: "Information Technology",
  cs: "Computer Science",
  se: "Software Engineering",
  ce: "Civil Engineering",
  ee: "Electrical Engineering",
  me: "Mechanical Engineering",
  ai: "AI & Data Science",
  bm: "Bio Medical Engineering",
  math: "Mathematics",
  ene: "Environmental Engineering",
};

export default function DepartmentsListPage() {
  return (
    <main style={{
      padding: "40px 20px",
      fontFamily: "Segoe UI, sans-serif",
      background: "#f7f9fb",
      color: "#333",
    }}>
      <h1 style={{
        textAlign: "center",
        fontSize: "2rem",
        color: "#2c3e50",
        marginBottom: "30px",
        fontWeight: 700,
      }}>
        🎓 All Departments
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}>
        {Object.entries(departments).map(([key, name]) => (
          <Link 
            key={key} 
            href={`/departments/${key}`} 
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              textAlign: "center",
              fontWeight: 600,
              color: "#0070f3",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {name}
          </Link>
        ))}
      </div>
    </main>
  );
}
