'use client';

import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', backgroundColor: '#f9f9f9' }}>
        <HeroSlider />
      {/* Highlights Section */}
      <section style={{ display: 'flex',
      marginTop: '2rem',
  flexWrap: 'nowrap', // single row
  gap: '1rem',
  marginBottom: '3rem',
  overflowX: 'auto', }}>
        {[
          {
            title: 'Sustainability',
            text: 'Committed to an eco-friendly campus with renewable energy and green initiatives.',
            image: '/shutterstock.jpg',

          
          },
          {
            title: 'Digital Library',
            text: 'Access a vast collection of e-books, research papers, and learning resources.',
            image: '/digital-library.jpg',
          },
          {
            title: 'Labs & Workshops',
            text: 'Advanced facilities for practical learning and research excellence.',
            image: '/lab.jpg',
          },
          {
            title: 'Scholarships',
            text: 'Empowering students with financial aid and merit-based scholarships.',
            image: '/Scholorship.png',
          },
        ].map((card, i) => (
    <div key={i} style={{
      flex: '0 0 200px', // smaller fixed width
      height: '250px',   // smaller height
      color: '#fff',
      background: `url(${card.image}) center/cover no-repeat`,
      padding: '2.75rem',
      borderRadius: '10px',
      position: 'relative',
      textShadow: '1px 1px 4px #000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
            
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '1rem' }}>{card.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Campus Life Section */}
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#003366' }}>🏫 Campus Life</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', color: '#444' }}>
           Discover a vibrant community at QUEST where learning extends beyond the classroom.
          From cultural festivals to sports and recreation, our campus life offers endless opportunities to explore, grow, and have fun.
        </p>

        <div style={{
          marginTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'center'
        }}>
          {[
            { title: 'Central Library', image: 'https://quest.edu.pk/media/campuslife/images/mlib.JPG' },
            { title: 'Admin Block', image: 'https://quest.edu.pk/media/campuslife/images/DSC_0911.JPG' },
            { title: 'Engineering Lab', image: 'https://quest.edu.pk/media/campuslife/images/DSC_0860.JPG' },
            { title: 'Reading Hall', image: 'https://quest.edu.pk/media/campuslife/images/lib.png' },
          ].map((item, i) => (
            <div key={i} style={{
              flex: '1 1 200px',
              maxWidth: '250px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <h3 style={{ padding: '1rem', fontSize: '1.1rem', color: '#003366' }}>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Library & Digital Resources */}
      <section id="repository" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#003366' }}>📚 Library & Digital Resources</h1>
        <p style={{ fontSize: '1.05rem', color: '#444', maxWidth: '750px', margin: '0 auto' }}>
          QUEST offers access to digital libraries, archives, and online academic resources to support student learning and research.
        </p>

        <div style={{
          marginTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'center'
        }}>
          {[
            { title: 'e-Library Portal', image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/0*cqPWt_uqeZgPWRby', link: 'https://opac.quest.edu.pk/' },
            { title: 'Digital Repository', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY03OryHLO7dA4l5rE924LMkIe-QuaLEc53A&s', link: 'https://www.digitallibrary.edu.pk/quaideawam.html' },
            { title: 'Research Journals', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1dEa2tOPDfQsJuUmiymyPDuQtDufPCNvHA&s', link: 'https://www.hec.gov.pk' },
          ].map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{
              flex: '1 1 200px',
              maxWidth: '250px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              color: '#003366'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <h3 style={{ padding: '1rem', fontSize: '1.1rem' }}>{item.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Achievements & Awards as Blocks */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#003366', marginBottom: '1rem' }}>🏅 Achievements & Awards</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          {[
            'National Innovation Award 2023 for AI Projects',
            'Top 10 Tech Universities of Pakistan – 2024',
            'Best Departmental Research – 2023'
          ].map((award, i) => (
            <div key={i} style={{
              flex: '1 1 280px',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              color: '#333',
              textAlign: 'center',
              fontSize: '1rem'
            }}>
              {award}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}






// 'use client';
// import { useEffect } from "react";

// export default function Home() {
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/api/timetable');
//       const data = await response.json();
//       console.log(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//     </div>
//   );
// }
