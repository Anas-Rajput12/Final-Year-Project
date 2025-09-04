"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Library() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const libraries = [
    { key: "physics", name: "Physics Library", image: "https://img.icons8.com/color/240/physics.png", desc: "Explore physics, quantum mechanics, and science books." },
    { key: "cs", name: "Computer Science Library", image: "https://img.icons8.com/color/240/computer.png", desc: "Programming, algorithms, AI, and CS resources." },
    { key: "digital", name: "Digital Library", image: "https://img.icons8.com/color/240/cloud.png", desc: "E-books, journals, and digital publications." },
    { key: "math", name: "Mathematics Library", image: "https://img.icons8.com/color/240/math.png", desc: "Math theories, problem-solving, and statistics." },
    { key: "ai", name: "Artificial Intelligence Library", image: "https://img.icons8.com/color/240/robot.png", desc: "AI research, ML algorithms, neural networks." },
    { key: "se", name: "Software Engineering Library", image: "https://img.icons8.com/color/240/code.png", desc: "Software design, dev methodologies, and guides." },
    { 
  key: "ce",
  name: "Civil Engineering Library",
  image: "https://www.ice.org.uk/media/5jqkj4y0/library-hero-banner.jpg?width=1200&height=300&format=webp&quality=85",
  desc: "Structural design, construction, sustainability."
},

    { key: "ee", name: "Electrical Engineering Library", image: "https://img.icons8.com/color/240/electrical.png", desc: "Power systems, circuits, electronics." },
    { key: "me", name: "Mechanical Engineering Library", image: "https://img.icons8.com/color/240/gear.png", desc: "Thermodynamics, automotive, and machinery." },
    { key: "bba", name: "Business Administration Library", image: "https://img.icons8.com/color/240/business.png", desc: "Business, management, entrepreneurship." },
    { key: "chem", name: "Chemistry Library", image: "https://www.ice.org.uk/media/5jqkj4y0/library-hero-banner.jpg?width=1200&height=300&format=webp&quality=85", desc: "Organic, inorganic, and applied chemistry." },
    { key: "bio", name: "Biology Library", image: "https://img.icons8.com/color/240/dna-helix.png", desc: "Biology, genetics, microbiology, biotech." },
    { key: "eco", name: "Economics Library", image: "https://img.icons8.com/color/240/economic-improvement.png", desc: "Economics, finance, and trade resources." },
    { key: "law", name: "Law Library", image: "https://img.icons8.com/color/240/law.png", desc: "Law, legal studies, and case references." },
    { key: "med", name: "Medical Library", image: "https://img.icons8.com/color/240/stethoscope.png", desc: "Medicine, surgery, and healthcare books." },
    { key: "geo", name: "Geography Library", image: "https://img.icons8.com/color/240/globe.png", desc: "Maps, earth science, and environment." },
    { key: "hist", name: "History Library", image: "https://www.ice.org.uk/media/5jqkj4y0/library-hero-banner.jpg?width=1200&height=300&format=webp&quality=85", desc: "World history, culture, and civilizations." },
    { key: "lit", name: "Literature Library", image: "https://img.icons8.com/color/240/books.png", desc: "Novels, poetry, and world literature." },
    { key: "phil", name: "Philosophy Library", image: "https://www.ice.org.uk/media/5jqkj4y0/library-hero-banner.jpg?width=1200&height=300&format=webp&quality=85", desc: "Philosophy, ethics, and critical thinking." },
    { key: "art", name: "Arts Library", image: "https://img.icons8.com/color/240/paint-palette.png", desc: "Fine arts, design, and creativity." },
  ];

  const filtered = libraries.filter((lib) =>
    lib.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ padding: "2rem", background: "#f9fafc", fontFamily: "Arial" }}>
      <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "1.5rem", color: "#2c3e50" }}>
        📚 Explore University Libraries
      </h2>

      {/* Search */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search libraries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.8rem 1rem",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Library Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem"
      }}>
        {filtered.map((lib) => (
          <div
            key={lib.key}
            onClick={() => router.push(`/library/${lib.key}`)}
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "1.2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          >
            <img src={lib.image} alt={lib.name} style={{ width: "80px", height: "80px", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#34495e" }}>{lib.name}</h3>
            <p style={{ fontSize: "0.95rem", color: "#555" }}>{lib.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
