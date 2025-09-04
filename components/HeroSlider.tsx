'use client';

import { useEffect, useState } from 'react';

const images = [
  { src: 'https://quest.edu.pk/media/campuslife/images/mlib.JPG', link: 'https://quest.edu.pk/' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSORZqNC5l8uwWV4PfA0fQBqdbDEx4xSmVtGA&s', link: 'https://library.muet.edu.pk/' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgVNRk6vosE1HmrHRnqS5jM1NAt3V5f8m6kQ&s', link: 'https://www.sbbusba.edu.pk/' }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${current * 100}%)`
        }}
      >
        {images.map((img, i) => (
          <a href={img.link} key={i} style={{ minWidth: '100%' }}>
            <img
              src={img.src}
              alt={`slide-${i}`}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </a>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          cursor: 'pointer'
        }}
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          cursor: 'pointer'
        }}
      >
        ›
      </button>
    </div>
  );
}
