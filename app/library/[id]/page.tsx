"use client";

import { useParams } from "next/navigation";

export default function LibraryDetail() {
  const { id } = useParams();

  const books: Record<string, { title: string; author: string; link: string; img: string }[]> = {
  physics: [
    { title: "Concepts of Physics", author: "H.C. Verma", link: "https://www.pdfdrive.com/concepts-of-physics-hc-verma-e158643635.html", img: "https://covers.openlibrary.org/b/id/12635180-L.jpg" },
    { title: "University Physics", author: "Young & Freedman", link: "https://openstax.org/books/university-physics-volume-1/pages/1-introduction", img: "https://covers.openlibrary.org/b/id/13518265-L.jpg" },
    { title: "Quantum Mechanics", author: "Griffiths", link: "https://www.researchgate.net/publication/330776348_Introduction_to_Quantum_Mechanics", img: "https://covers.openlibrary.org/b/id/8231850-L.jpg" }
  ],
  cs: [
    { title: "Introduction to Algorithms", author: "Cormen et al.", link: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", img: "https://covers.openlibrary.org/b/id/13519764-L.jpg" },
    { title: "Computer Networks", author: "Tanenbaum", link: "https://archive.org/details/ComputerNetworks5thEditionAndrewSTanenbaumDavidJWetherall", img: "https://covers.openlibrary.org/b/id/240726-L.jpg" },
    { title: "Artificial Intelligence", author: "Russell & Norvig", link: "https://www.pdfdrive.com/artificial-intelligence-a-modern-approach-e33460581.html", img: "https://covers.openlibrary.org/b/id/12638518-L.jpg" }
  ],
  digital: [
    { title: "Digital Libraries", author: "Xiaoming Liu", link: "https://www.pdfdrive.com/digital-libraries-e33476500.html", img: "https://covers.openlibrary.org/b/id/8235500-L.jpg" },
    { title: "Introduction to Digital Publishing", author: "John Smith", link: "https://www.pdfdrive.com/digital-publishing-e33476501.html", img: "https://covers.openlibrary.org/b/id/8235501-L.jpg" },
    { title: "E-books and Digital Media", author: "Alice Johnson", link: "https://www.pdfdrive.com/ebooks-digital-media-e33476502.html", img: "https://covers.openlibrary.org/b/id/8235502-L.jpg" }
  ],
  math: [
    { title: "Calculus", author: "James Stewart", link: "https://www.pdfdrive.com/calculus-8th-edition-e33469023.html", img: "https://covers.openlibrary.org/b/id/8285240-L.jpg" },
    { title: "Linear Algebra Done Right", author: "Sheldon Axler", link: "https://www.pdfdrive.com/linear-algebra-done-right-3rd-edition-e33470859.html", img: "https://covers.openlibrary.org/b/id/12549387-L.jpg" },
    { title: "Discrete Mathematics", author: "Rosen", link: "https://www.pdfdrive.com/discrete-mathematics-and-its-applications-e33472394.html", img: "https://covers.openlibrary.org/b/id/11479843-L.jpg" }
  ],
  ai: [
    { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", link: "https://www.pdfdrive.com/artificial-intelligence-a-modern-approach-e33460581.html", img: "https://covers.openlibrary.org/b/id/12638518-L.jpg" },
    { title: "Deep Learning", author: "Goodfellow, Bengio & Courville", link: "https://www.deeplearningbook.org/", img: "https://covers.openlibrary.org/b/id/8235172-L.jpg" },
    { title: "Machine Learning", author: "Tom Mitchell", link: "https://www.pdfdrive.com/machine-learning-e33473659.html", img: "https://covers.openlibrary.org/b/id/8231856-L.jpg" }
  ],
  se: [
    { title: "Software Engineering", author: "Ian Sommerville", link: "https://www.pdfdrive.com/software-engineering-10th-edition-e33474021.html", img: "https://covers.openlibrary.org/b/id/8235265-L.jpg" },
    { title: "Agile Software Development", author: "Robert C. Martin", link: "https://www.pdfdrive.com/agile-software-development-principles-patterns-and-practices-e33474111.html", img: "https://covers.openlibrary.org/b/id/8235274-L.jpg" },
    { title: "Design Patterns", author: "Gamma et al.", link: "https://www.pdfdrive.com/design-patterns-elements-of-reusable-object-oriented-software-e33474201.html", img: "https://covers.openlibrary.org/b/id/8235283-L.jpg" }
  ],
  ce: [
    { title: "Structural Analysis", author: "Russell C. Hibbeler", link: "https://www.pdfdrive.com/structural-analysis-9th-edition-e33474492.html", img: "https://covers.openlibrary.org/b/id/8235300-L.jpg" },
    { title: "Civil Engineering Materials", author: "Shahrooz & Azad", link: "https://www.pdfdrive.com/civil-engineering-materials-3rd-edition-e33474570.html", img: "https://covers.openlibrary.org/b/id/8235308-L.jpg" },
    { title: "Fluid Mechanics", author: "White", link: "https://www.pdfdrive.com/fluid-mechanics-8th-edition-e33474644.html", img: "https://covers.openlibrary.org/b/id/8235315-L.jpg" }
  ],
  ee: [
    { title: "Electrical Engineering Fundamentals", author: "Vincent Del Toro", link: "https://www.pdfdrive.com/electrical-engineering-fundamentals-e33474882.html", img: "https://covers.openlibrary.org/b/id/8235335-L.jpg" },
    { title: "Power System Analysis", author: "Hadi Saadat", link: "https://www.pdfdrive.com/power-system-analysis-e33474960.html", img: "https://covers.openlibrary.org/b/id/8235340-L.jpg" },
    { title: "Digital Electronics", author: "M. Morris Mano", link: "https://www.pdfdrive.com/digital-design-e33475036.html", img: "https://covers.openlibrary.org/b/id/8235345-L.jpg" }
  ],
  me: [
    { title: "Thermodynamics", author: "Cengel & Boles", link: "https://www.pdfdrive.com/thermodynamics-an-engineering-approach-e33475274.html", img: "https://covers.openlibrary.org/b/id/8235362-L.jpg" },
    { title: "Mechanics of Materials", author: "Beer & Johnston", link: "https://www.pdfdrive.com/mechanics-of-materials-e33475350.html", img: "https://covers.openlibrary.org/b/id/8235367-L.jpg" },
    { title: "Machine Design", author: "Shigley", link: "https://www.pdfdrive.com/machine-design-e33475426.html", img: "https://covers.openlibrary.org/b/id/8235372-L.jpg" }
  ],
  bba: [
    { title: "Principles of Management", author: "Robbins & Coulter", link: "https://www.pdfdrive.com/principles-of-management-13th-edition-e33475660.html", img: "https://covers.openlibrary.org/b/id/8235389-L.jpg" },
    { title: "Financial Accounting", author: "Weygandt", link: "https://www.pdfdrive.com/financial-accounting-9th-edition-e33475736.html", img: "https://covers.openlibrary.org/b/id/8235394-L.jpg" },
    { title: "Marketing Management", author: "Kotler & Keller", link: "https://www.pdfdrive.com/marketing-management-15th-edition-e33475812.html", img: "https://covers.openlibrary.org/b/id/8235400-L.jpg" }
  ],
  chem: [
    { title: "Organic Chemistry", author: "Morrison & Boyd", link: "https://www.pdfdrive.com/organic-chemistry-7th-edition-e33476040.html", img: "https://covers.openlibrary.org/b/id/8235415-L.jpg" },
    { title: "Inorganic Chemistry", author: "Shriver & Atkins", link: "https://www.pdfdrive.com/inorganic-chemistry-5th-edition-e33476116.html", img: "https://covers.openlibrary.org/b/id/8235420-L.jpg" },
    { title: "Physical Chemistry", author: "Peter Atkins", link: "https://www.pdfdrive.com/physical-chemistry-10th-edition-e33476192.html", img: "https://covers.openlibrary.org/b/id/8235425-L.jpg" }
  ],
  bio: [
    { title: "Biology", author: "Campbell & Reece", link: "https://www.pdfdrive.com/biology-10th-edition-e33476268.html", img: "https://covers.openlibrary.org/b/id/8235430-L.jpg" },
    { title: "Genetics", author: "Griffiths et al.", link: "https://www.pdfdrive.com/genetics-e33476344.html", img: "https://covers.openlibrary.org/b/id/8235435-L.jpg" },
    { title: "Microbiology", author: "Tortora", link: "https://www.pdfdrive.com/microbiology-e33476420.html", img: "https://covers.openlibrary.org/b/id/8235440-L.jpg" }
  ],
  eco: [
    { title: "Economics", author: "Samuelson & Nordhaus", link: "https://www.pdfdrive.com/economics-19th-edition-e33476496.html", img: "https://covers.openlibrary.org/b/id/8235445-L.jpg" },
    { title: "Macroeconomics", author: "Blanchard", link: "https://www.pdfdrive.com/macroeconomics-e33476572.html", img: "https://covers.openlibrary.org/b/id/8235450-L.jpg" },
    { title: "Microeconomics", author: "Pindyck & Rubinfeld", link: "https://www.pdfdrive.com/microeconomics-e33476648.html", img: "https://covers.openlibrary.org/b/id/8235455-L.jpg" }
  ],
  law: [
    { title: "Constitutional Law", author: "Chemerinsky", link: "https://www.pdfdrive.com/constitutional-law-e33476724.html", img: "https://covers.openlibrary.org/b/id/8235460-L.jpg" },
    { title: "International Law", author: "Brownlie", link: "https://www.pdfdrive.com/international-law-e33476800.html", img: "https://covers.openlibrary.org/b/id/8235465-L.jpg" },
    { title: "Contract Law", author: "Chitty", link: "https://www.pdfdrive.com/contract-law-e33476876.html", img: "https://covers.openlibrary.org/b/id/8235470-L.jpg" }
  ],
  med: [
    { title: "Gray's Anatomy", author: "Standring", link: "https://www.pdfdrive.com/grays-anatomy-41st-edition-e33476952.html", img: "https://covers.openlibrary.org/b/id/8235475-L.jpg" },
    { title: "Harrison's Principles of Internal Medicine", author: "Fauci et al.", link: "https://www.pdfdrive.com/harrisons-principles-of-internal-medicine-e33477028.html", img: "https://covers.openlibrary.org/b/id/8235480-L.jpg" },
    { title: "Medical Microbiology", author: "Patrick R. Murray", link: "https://www.pdfdrive.com/medical-microbiology-9th-edition-e33477104.html", img: "https://covers.openlibrary.org/b/id/8235485-L.jpg" }
  ],
  geo: [
    { title: "Physical Geography", author: "Strahler", link: "https://www.pdfdrive.com/physical-geography-e33477180.html", img: "https://covers.openlibrary.org/b/id/8235490-L.jpg" },
    { title: "Human Geography", author: "Rubenstein", link: "https://www.pdfdrive.com/human-geography-e33477256.html", img: "https://covers.openlibrary.org/b/id/8235495-L.jpg" },
    { title: "Geographical Information Systems", author: "Longley et al.", link: "https://www.pdfdrive.com/gis-e33477332.html", img: "https://covers.openlibrary.org/b/id/8235500-L.jpg" }
  ],
  hist: [
    { title: "A History of the Modern World", author: "R. S. McNeill", link: "https://www.pdfdrive.com/history-of-the-modern-world-e33477408.html", img: "https://covers.openlibrary.org/b/id/8235510-L.jpg" },
    { title: "World Civilizations", author: "Peter Stearns", link: "https://www.pdfdrive.com/world-civilizations-e33477484.html", img: "https://covers.openlibrary.org/b/id/8235515-L.jpg" },
    { title: "The History of the Ancient World", author: "Susan Wise Bauer", link: "https://www.pdfdrive.com/history-of-the-ancient-world-e33477560.html", img: "https://covers.openlibrary.org/b/id/8235520-L.jpg" }
  ],
  lit: [
    { title: "Norton Anthology of English Literature", author: "Greenblatt", link: "https://www.pdfdrive.com/norton-anthology-e33477636.html", img: "https://covers.openlibrary.org/b/id/8235525-L.jpg" },
    { title: "World Literature: An Anthology", author: "David Damrosch", link: "https://www.pdfdrive.com/world-literature-an-anthology-e33477712.html", img: "https://covers.openlibrary.org/b/id/8235530-L.jpg" },
    { title: "Modern Poetry", author: "Paul Fussell", link: "https://www.pdfdrive.com/modern-poetry-e33477788.html", img: "https://covers.openlibrary.org/b/id/8235535-L.jpg" }
  ],
  phil: [
    { title: "Meditations", author: "Marcus Aurelius", link: "https://www.pdfdrive.com/meditations-e33477864.html", img: "https://covers.openlibrary.org/b/id/8235540-L.jpg" },
    { title: "Critique of Pure Reason", author: "Immanuel Kant", link: "https://www.pdfdrive.com/critique-of-pure-reason-e33477940.html", img: "https://covers.openlibrary.org/b/id/8235545-L.jpg" },
    { title: "Being and Time", author: "Martin Heidegger", link: "https://www.pdfdrive.com/being-and-time-e33478016.html", img: "https://covers.openlibrary.org/b/id/8235550-L.jpg" }
  ],
  art: [
    { title: "The Story of Art", author: "E.H. Gombrich", link: "https://www.pdfdrive.com/the-story-of-art-e33478092.html", img: "https://covers.openlibrary.org/b/id/8235555-L.jpg" },
    { title: "Art: A World History", author: "Elke Linda Buchholz", link: "https://www.pdfdrive.com/art-a-world-history-e33478168.html", img: "https://covers.openlibrary.org/b/id/8235560-L.jpg" },
    { title: "History of Modern Art", author: "H.H. Arnason", link: "https://www.pdfdrive.com/history-of-modern-art-e33478244.html", img: "https://covers.openlibrary.org/b/id/8235565-L.jpg" }
  ]
};


  const bookList = books[id as string] || [];

  return (
    <main style={{ padding: "2rem", background: "#f9fafc", fontFamily: "Arial" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#2c3e50" }}>
        📖 {id?.toString().toUpperCase()} Library Books
      </h2>

      {bookList.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem"
        }}>
          {bookList.map((book, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <img src={book.img} alt={book.title} style={{ width: "120px", height: "160px", objectFit: "cover", margin: "0 auto 1rem" }} />
              <h3 style={{ fontSize: "1.1rem", color: "#34495e" }}>{book.title}</h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>✍️ {book.author}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer"
                 style={{ display: "inline-block", marginTop: "0.8rem", padding: "0.6rem 1rem", background: "#2980b9", color: "#fff", borderRadius: "6px", textDecoration: "none" }}>
                🔗 View Book
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available for this library yet.</p>
      )}
    </main>
  );
}
