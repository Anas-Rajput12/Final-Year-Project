'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error submitting form');

      setStatus('✅ Form submitted successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('❌ Error submitting form. Please try again.');
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Contact Us</h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Have a question, suggestion, or need help? Feel free to reach out.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        ></textarea>

        <button
          type="submit"
          style={{
            padding: '12px', backgroundColor: '#2c3e50', color: 'white',
            border: 'none', borderRadius: '5px', fontSize: '1rem',
            cursor: 'pointer', transition: 'background-color 0.3s'
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1b2733')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c3e50')}
        >
          Submit
        </button>
      {status && <p className="mt-4">{status}</p>}

      </form>
    </main>
  );
}


