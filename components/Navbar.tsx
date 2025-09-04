'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      if (!mobileView) setMenuOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      router.push(`/departments/${e.target.value}`);
      setMenuOpen(false);
    }
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 500,
  };

  return (
    <>
      <nav
        style={{
          background: '#2c3e50',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 20px',
          position: 'fixed',
          top: 0,
          width: '97%',
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          QUEST Nawabshah
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/about" style={linkStyle}>About</Link>
            <Link href="/library" style={linkStyle}>Library</Link>
            <Link href="/contact" style={linkStyle}>Contact</Link>
          {/* <Link href="/download" style={linkStyle} onClick={() => setMenuOpen(false)}>Download</Link> */}
            {/* <Link href="/login" style={linkStyle}>Sign In</Link> */}

            <select
              onChange={handleDepartmentChange}
              defaultValue=""
              style={{
                backgroundColor: '#2c3e50',
                color: '#fff',
                border: '1px solid #fff',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <option disabled value="">Departments</option>

              <optgroup>
                {['it', 'cs', 'se', 'ce', 'ee', 'me','ai', 'bm', 'math', 'ene'].map(dept => (
                  <option key={dept} value={dept}>{dept.toUpperCase()}</option>
                ))}
              </optgroup>

            </select>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'pointer', width: '50px' }}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '100%',
            background: '#34495e',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 999,
          }}
        >
          <Link href="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" style={linkStyle} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/library" style={linkStyle} onClick={() => setMenuOpen(false)}>Library</Link>
          <Link href="/contact" style={linkStyle} onClick={() => setMenuOpen(false)}>Contact</Link>
          {/* <Link href="/download" style={linkStyle} onClick={() => setMenuOpen(false)}>Download</Link> */}
          {/* <Link href="/login" style={linkStyle} onClick={() => setMenuOpen(false)}>Sign In</Link> */}

          <select
            onChange={handleDepartmentChange}
            defaultValue=""
            style={{
              backgroundColor: '#2c3e50',
              color: '#fff',
              border: '1px solid #fff',
              padding: '5px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <option>Departments</option>

            <optgroup label="Departments">
              {['it', 'cs', 'se', 'ce', 'ee', 'me', 'ai', 'bm', 'math', 'ene'].map(dept => (
                <option key={dept} value={dept}>{dept.toUpperCase()}</option>
              ))}
            </optgroup>
            
          </select>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '60px' }}></div>
    </>
  );
}
