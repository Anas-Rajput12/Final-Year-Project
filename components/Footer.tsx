export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#fff', padding: '3rem 1rem' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          padding: '0 1rem'
        }}
      >
        {/* About QUEST */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#22d3ee' }}>
            About QUEST
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.6' }}>
            Quaid-e-Awam University of Engineering, Science & Technology (QUEST)
            is dedicated to delivering world-class education, fostering research, and nurturing innovation for a brighter future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#22d3ee' }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Admissions', 'Academics', 'Research', 'Library', 'Campus Life'].map((link, i) => (
              <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#d1d5db' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#22d3ee' }}>
            Connect with Us
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.75rem' }}>
            Stay updated with campus news, events, and announcements.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', fontSize: '1.25rem' }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', fontSize: '1.25rem' }}>
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', fontSize: '1.25rem' }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', fontSize: '1.25rem' }}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#22d3ee' }}>
            Contact
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem', color: '#d1d5db' }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#22d3ee' }}></i>
              Nawabshah, Sindh, Pakistan
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem', color: '#d1d5db' }}>
              <i className="fas fa-phone" style={{ color: '#22d3ee' }}></i>
              +92 244 9370367
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#d1d5db' }}>
              <i className="fas fa-envelope" style={{ color: '#22d3ee' }}></i>
              info@quest.edu.pk
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        marginTop: '2.5rem',
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#fff',
        borderTop: '1px solid #374151',
        padding: '1rem'
      }}>
        © {new Date().getFullYear()} Quaid-e-Awam University – All Rights Reserved.
      </div>
    </footer>
  );
}
