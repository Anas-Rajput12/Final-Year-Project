import { notFound } from 'next/navigation';

type DepartmentData = {
  name: string;
  overview: string;
  chairman: {
    name: string;
    image: string;
    position: string;
  };
  staff: string[];
  courses: string[];
};

const departments: Record<string, DepartmentData> = {
  it: {
    name: 'Information Technology',
    overview: 'The IT department focuses on equipping students with practical and theoretical knowledge in modern computing, web technologies, and AI.',
    chairman: {
      name: 'Prof. Dr. Muhammad Sulleman Memon',
      image: 'https://quest.edu.pk/media/profile_images/177_9a24b310-4ee3-4e16-978f-db8ace8ab86b.jpg',
      position: 'Chairman, IT Department',
    },
    staff: ['Prof. Dr. Muhammad Sulleman Memon (Chairman)', 'Prof. Dr. Muhammad Ibrahim Channa (Dean)', 'Prof. Dr. Zahid Hussain Abro (Professor)',
'Dr. Shahzaman Niazamai (Associate Professor)',
'Prof. Dr. Saifullah Memon (Assistant Professor)',
'Dr. Baqir Ali Zardari (Assistant Professor)'],
    courses: ['Web Development', 'AI & ML', 'Database Systems'],
  },
  cs: {
    name: 'Computer Science',
    overview: 'The CS department delivers in-depth education in programming, software development, data structures, and computational theory.',
    chairman: {
      name: 'Prof. Dr. Muhammad Saleem Vighio',
      image: 'https://quest.edu.pk/media/profile_images/187_cf6a7656-82b0-46a5-948f-f3dde7321de9.jpg',
      position: 'Chairman, Computer Science',
    },
    staff: ['Prof. Dr. Muhammad Saleem Vighio','Prof. Dr. Mukhtiar Ahmed Memon(professor)',
'Prof. Dr.Zahid Hussain Abro (professor)',
' Dr. Shahzaman Niazamai (Associate Professor Professor)',
'Prof. Dr. Saifullah Memon (Assistant professor)',
' Dr.Baqir Ali Zardari (Assistant professor)'],
    courses: ['Programming Fundamentals', 'Data Structures', 'Algorithms'],
  },
  se: {
    name: 'Software Engineering',
    overview: 'The SE department specializes in large-scale software design, agile methodologies, and quality assurance practices.',
    chairman: {
      name: 'Prof. Dr. Pardeep Kumar',
      image: 'https://quest.edu.pk/media/profile_images/57_c4859ed2-ddd4-4c14-b3f7-ccbc75856dc7.jpg',
      position: 'Chairman, Software Engineering',
    },
    staff: ['Prof. Dr. Pardeep Kumar', 'Prof. Dr. Mukhtiar Ahmed Memon(professor)',
'Prof. Dr. Zahid Hussain Abro (professor)',
'Dr. Shahzaman Niazamai (Associate Professor Professor)',
'Prof. Dr. Saifullah Memon (Assistant professor)',
'Dr. Baqir Ali Zardari (Assistant professor)'],
    courses: ['Software Design', 'Agile Methods', 'Software Testing'],
  },
  ce: {
    name: 'Civil Engineering',
    overview: 'The Civil Engineering department focuses on infrastructure, structural mechanics, and sustainability in civil works.',
    chairman: {
      name: 'Prof. Dr. Daddan Khan Bangwar',
      image: 'https://placehold.co/150x150?text=Chairman+CE',
      position: 'Chairman, Civil Engineering',
    },
    staff: ['Prof. Dr. Daddan Khan Bangwar', 'Dr. Bashir Ahmed Memon (Professor)',
'Prof. Dr. Ahsan Ali Buriro (Professor)',
'Dr. Aftab Hameed Memon (Professor)',
'Dr. Mukhtiar Ali Samroo (Associate Professor)',
'Dr. Riaz Bhambro (Associate Professor)',
'Engr. Ubaidullah Memon (Associate Professor)'],
    courses: ['Structural Design', 'Geotechnical Engineering', 'Fluid Mechanics'],
  },
  ee: {
    name: 'Electrical Engineering',
    overview: 'The EE department emphasizes power systems, electronics, control systems, and renewable energy sources.',
    chairman: {
      name: 'Prof. Dr. Abdul Sattar Saand',
      image: 'https://quest.edu.pk/media/profile_images/115_7ec7517b-8967-4f7c-9297-d96ee300c3c9.jpg',
      position: 'Chairman, Electrical Engineering',
    },
    staff: ['Prof. Dr. Abdul Sattar Saand', 'Prof.Dr.Abdul Nasir Laghari (Chairman)',
'Dr.Ahsanullah Soomro (Associate Professor Professor)',
'Dr Asif Saleh Qureshi (Assistant Professor)',
'Dr.Imran Ahmed Samo (Assistant)',
'Dr.Asif Ali Siyal (Assistant Professor)',
'Engr.Aman Abdul Raqeeb Bhutto (lab Instructor)'],
    courses: ['Digital Logic Design', 'Power Systems', 'Electronics'],
  },
  me: {
    name: 'Mechanical Engineering',
    overview: 'The ME department develops mechanical skills in design, manufacturing, robotics, and fluid dynamics.',
    chairman: {
      name: 'Prof. Dr. Abdul Rehman Jatoi',
      image: 'https://quest.edu.pk/media/profile_images/242_8ffe4dbc-8c80-46d1-ac29-0b27deb5f0b0.jpg',
      position: 'Chairman, Mechanical Engineering',
    },
    staff: ['Prof. Dr. Abdul Rehman Jatoi', 'Dr. Bashir Ahmed Memon (Professor)',
'Prof. Dr. Ahsan Ali Buriro (Professor)',
'Dr. Aftab Hameed Memon (Professor)',
'Dr. Mukhtiar Ali Samroo (Associate Professor)',
'Dr. Riaz Bhambro (Associate Professor)',
'Engr. Ubaidullah Memon (Associate Professor)'],
    courses: ['Thermodynamics', 'Machine Design', 'CAD/CAM'],
  },
  ai: {
    name: 'AI & Data Science',
    overview: 'This department trains students in artificial intelligence, machine learning, and data-driven solutions for modern problems.',
    chairman: {
      name: 'Dr. Mehwish Leghari',
      image: 'https://quest.edu.pk/media/profile_images/239_bf74cee8-4824-460a-a0cb-f9b7bc416f4b.jpeg',
      position: 'Chairman, AI & DS Department',
    },
    staff: ['Dr. Mehwish Leghari', 'Engr.Jawaid Akhtar Unar (Assistant Professor)'],
    courses: ['Deep Learning', 'Data Mining', 'Python for AI'],
  },
  bm: {
    name: 'Bio Medical Engineering',
    overview: 'The Bio Medical Engineering department prepares students for careers in healthcare technology and management.',
    chairman: {
      name: 'Dr. Abdul Aleem Jamali',
      image: 'https://quest.edu.pk/media/profile_images/172_3a118634-258e-472d-aade-e75106c6eb5a.jpeg',
      position: 'Chairman, Bio Medical Engineering',
    },
    staff: ['Dr. Abdul Aleem Jamali', 'Ms. Ayesha Khan'],
    courses: ['Principles of Management', 'Financial Accounting', 'Marketing'],
  },
  math: {
    name: 'Mathematics',
    overview: 'The Mathematics department provides the theoretical foundation for science and engineering through algebra, calculus, and more.',
    chairman: {
      name: 'Prof. Rajab Ali Malookani',
      image: 'https://quest.edu.pk/media/profile_images/193_11eb5a2f-a717-4dbf-844f-9dd32bdb7d51.jpg',
      position: 'Chairman, Mathematics Department',
    },
    staff: ['Prof. Rajab Ali Malookani ', 'Prof.Dr.Khuda Bux Amur (Professor)',
'Prof.Dr.Sajjad Hussain Sandhio(Professor)',
'Dr.Shakeel Ahmed Kambohi (Associate Professor Professor)',
'Mr.Iqrar Ali Pali (Assistant Professor)'],
    courses: ['Calculus', 'Linear Algebra', 'Numerical Methods'],
  },
  ene: {
    name: 'Environment Engineering Department',
    overview: 'The Environment Engineering Department focuses on sustainable design, renewable energy, and environmental protection.',
    chairman: {
      name: 'Prof. Dr. Abdul Nasir Laghari',
      image: 'https://quest.edu.pk/media/profile_images/241_3fb0ce0e-dd39-4cde-b4ba-ef23e27d53fa.JPG',
      position: 'Chairman, Environment Engineering Department',
    },
    staff: ['Prof. Dr. Abdul Nasir Laghari', 'Dr.Ahsanullah Soomro (Associate Professor Professor)',
'Dr Asif Saleh Qureshi (Assistant Professor)',
'Dr.Imran Ahmed Samo (Assistant)',
'Dr.Asif Ali Siyal (Assistant Professor)',
'Engr.Aman Abdul Raqeeb Bhutto (lab Instructor)'],
    courses: ['Quantum Mechanics', 'Optics', 'Electromagnetism'],
  }
};


export default function DepartmentPage({
  params,
}: {
  params: { dept: string };
}) {
  const deptInfo = departments[params.dept];

  if (!deptInfo) return notFound();

  return (
    <main style={{
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      background: '#f7f9fb',
      color: '#333',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '30px',
        fontWeight: 700,
      }}>
        {deptInfo.name} Department
      </h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'space-between',
      }}>
        {/* Left Sidebar - Staff */}
        <aside style={{
          flex: '1 1 22%',
          background: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          minWidth: '250px',
        }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>👨‍🏫 Staff Members</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {deptInfo.staff.map((member, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{member}</li>
            ))}
          </ul>
        </aside>

        {/* Center - Overview + Chairman */}
        <section style={{
          flex: '1 1 48%',
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>🏫 Department Overview</h2>
            <p style={{ lineHeight: '1.6', color: '#444' }}>{deptInfo.overview}</p>
          </div>

          <div style={{
            background: '#eaf2ff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
            transition: 'transform 0.2s ease',
          }}>
            <img
              src={deptInfo.chairman.image}
              alt={deptInfo.chairman.name}
              style={{
                borderRadius: '50%',
                width: '110px',
                height: '110px',
                objectFit: 'cover',
                marginBottom: '10px',
                border: '3px solid #2c3e50'
              }}
            />
            <h3 style={{ fontSize: '1.1rem', margin: '10px 0 5px' }}>{deptInfo.chairman.name}</h3>
            <p style={{ color: '#666' }}>{deptInfo.chairman.position}</p>
          </div>
        </section>

        {/* Right Sidebar - Courses */}
        <aside style={{
          flex: '1 1 22%',
          background: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          minWidth: '250px',
        }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>📚 Courses Offered</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {deptInfo.courses.map((course, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>{course}</li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
