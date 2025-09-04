"use client";


export default function About() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        background: "#f9fafc",
      }}
    >
      {/* About Section */}
      <section style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#2c3e50",
            fontWeight: "bold",
          }}
        >
          About the Institute
        </h2>
        <p style={{ maxWidth: "800px", margin: "0 auto", color: "#555" }}>
          Quaid-e-Awam University of Engineering, Science & Technology (QUEST),
          Nawabshah, is a premier institute committed to producing skilled
          graduates in engineering, science, and technology. With a focus on
          innovation, research, and excellence, the university empowers students
          to contribute globally with modern technical skills.
        </p>
      </section>

      {/* Mission & Vision */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            borderTop: "5px solid #2980b9",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#2980b9" }}>
            Our Mission
          </h2>
          <p style={{ color: "#555" }}>
            To provide quality education and training in engineering, science,
            and technology that nurtures innovation, leadership, and ethical
            values in students, preparing them to meet national and international
            challenges.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            borderTop: "5px solid #27ae60",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#27ae60" }}>
            Our Vision
          </h2>
          <p style={{ color: "#555" }}>
            To be a world-class university recognized for academic excellence,
            cutting-edge research, and social contribution, creating professionals
            who lead in technology and innovation.
          </p>
        </div>
      </section>

      {/* Vice Chancellor Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "#2c3e50",
            textAlign: "center",
          }}
        >
          Vice Chancellor
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            background: "linear-gradient(135deg, #eaf4ff, #f8fcff)",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src="https://quest.edu.pk/static/images/vc/vcnew.jpg"
            alt="Vice Chancellor"
            style={{
              width: "200px",
              height: "240px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          />
          <p style={{ maxWidth: "600px", color: "#444" }}>
            <strong style={{ fontSize: "1.2rem", color: "#2c3e50" }}>
              Prof. Dr. Saleem Raza Samo
            </strong>
            <br />
            <span style={{ color: "#2980b9", fontWeight: "bold" }}>
              Vice Chancellor, QUEST Nawabshah
            </span>
            <br />
            <br />
            Prof. Dr. Saleem Raza Samo has been leading the university with a
            vision to strengthen education, research, and industry collaboration.
            His leadership has brought innovation and progress to QUEST.
          </p>
        </div>
      </section>

      {/* Past Chancellors */}
      <section>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "#2c3e50",
            textAlign: "center",
          }}
        >
          Past Vice Chancellors
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              name: "Prof. Dr. Abdul Rehman Memon",
              img: "https://quest.edu.pk/static/images/vc/vc_memon.webp",
              tenure: "15-08-1996",
            },
            {
              name: "Prof. Jan Muhammad Keerio",
              img: "https://quest.edu.pk/static/images/vc/vc_keerio.webp",
              tenure: "03-09-1996",
            },
            {
              name: "Prof. Dr. Ali Bux Soomro",
              img: "https://quest.edu.pk/static/images/vc/vc-alibux_soomro.webp",
              tenure: "25-02-2010",
            },
          ].map((vc, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "center",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={vc.img}
                alt={vc.name}
                style={{
                  width: "160px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                }}
              />
              <p style={{ fontWeight: "bold", color: "#2c3e50" }}>{vc.name}</p>
              <p style={{ color: "#777" }}>Tenure: {vc.tenure}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
