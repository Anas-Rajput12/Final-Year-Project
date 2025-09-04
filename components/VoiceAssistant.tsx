// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { client } from '../sanity/lib/client';

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined' &&
//   (window.SpeechRecognition || window.webkitSpeechRecognition);

// export default function VoiceAssistant() {
//   const [open, setOpen] = useState(false);
//     const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//     const [input, setInput] = useState('');
//     const [editIndex, setEditIndex] = useState<number | null>(null);
//     const [timetable, setTimetable] = useState<any[]>([]);
//     const router = useRouter();

//   // // 🔊 Text to Speech
//   // function speak(text: string, lang: string = "en-US") {
//   //   const synth = window.speechSynthesis;
//   //   const utter = new SpeechSynthesisUtterance(text);
//   //   utter.lang = lang;
//   //   synth.speak(utter);
  
//   // ✅ Supported Commands with Synonyms
//   // 🔹 All Supported Commands with Synonyms
// const commands: Record<string, string[]> = {
//   home: ["home", "ghar", "start", "homepage"],
//   about: ["about", "introduction", "ادارو", "info"],
//   contact: ["contact", "rabta", "number", "call"],
//   libraryPage: ["library page", "books page", "kitab page"],
//   exam: ["exam", "paper", "imtihaan", "test"],
//   library: ["library", "kitab", "کتب", "book info", "time", "hours"],
//   event: ["event", "program", "تقریب", "festival"],
//   timetable: [
//     "timetable", "schedule", "class", "jadwal",
//     "next class", "all class", "all classes",
//     "class time", "class room"
//   ],
//   weeklyschedule: [
//     "weeklyschedule", "schedule", "class", "jadwal",
//     "next class", "all class", "all classes", "batch",
//     "pehla batch", "dosra batch", "teesra batch"
//   ],
//   repository: ["digital repository", "ریپوزٹری", "repository"],
//   elibrary: ["e library", "elibrary", "کتب خانہ", "online library"],
//   journals: ["research journal", "journals", "جرنلز", "magazine"],
// };

//   const departmentLocations: Record<string, string> = {
//   it: "https://www.google.com/maps/search/Information+Technology+Department+QUEST+Nawabshah",
//   cs: "https://www.google.com/maps/search/Computer+Science+Department+QUEST+Nawabshah",
//   se: "https://www.google.com/maps/search/Software+Engineering+Department+QUEST+Nawabshah",
//   ce: "https://www.google.com/maps/search/Civil+Engineering+Department+QUEST+Nawabshah",
//   ee: "https://www.google.com/maps/search/Electrical+Engineering+Department+QUEST+Nawabshah",
//   me: "https://www.google.com/maps/search/Mechanical+Engineering+Department+QUEST+Nawabshah",
//   ai: "https://www.google.com/maps/search/AI+and+Data+Science+Department+QUEST+Nawabshah",
//   bm: "https://www.google.com/maps/search/Bio+Medical+Engineering+Department+QUEST+Nawabshah",
//   math: "https://www.google.com/maps/search/Mathematics+Department+QUEST+Nawabshah",
//   ene: "https://www.google.com/maps/search/Environment+Engineering+Department+QUEST+Nawabshah",
// };

//   function getBestMatch(input: string) {
//   input = input.toLowerCase();
//   for (const [cmd, options] of Object.entries(commands)) {
//     if (options.some(opt => input.includes(opt.toLowerCase()))) {
//       return cmd;
//     }
//   }
//   return null;
// }

// // 🟢 Extract BatchName (e.g. "21IT")
// function extractBatchName(text: string): string | null {
//   const match = text.match(/(21|22|23|24)\s?(it|cs|se|ce|ee|me|ai|bm|math|ene)/i);
//   return match ? match[0].toUpperCase().replace(" ", "") : null;
// }


//   // 🔹 Helper: Text to Speech
//   function speak(text: string) {
//     const synth = window.speechSynthesis;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US"; // Roman Urdu/English dono ke liye
//     synth.speak(utter);
//   }
//   // Load chat history
//     useEffect(() => {
//       const saved = localStorage.getItem("chatHistory");
//       if (saved) setMessages(JSON.parse(saved));
//     }, []);
  
//     // Save chat history
//     useEffect(() => {
//       localStorage.setItem("chatHistory", JSON.stringify(messages));
//     }, [messages]);
  
//     // Load timetable from API
//     useEffect(() => {
//       const fetchData = async () => {
//         const res = await fetch('/api/timetable');
//         const data = await res.json();
//         setTimetable(data);
//       };
//       fetchData();
//     }, []);

//   // 🧠 Handle Commands
//   const handleCommand = async (text: string) => {
//     const lowerText = text.toLowerCase();
//     const cmd = getBestMatch(lowerText);
//     const batchName = extractBatchName(lowerText);

//     // ==================== WEEKLY SCHEDULE ====================
//     if (lowerText.includes("class") || lowerText.includes("schedule")) {
//       if (!batchName) return "❌ Please mention batch (e.g. 21IT Tuesday classes).";
//       const res = await fetch(`/api/weeklyschedule?batchName=${batchName}`);
//       const data = await res.json();
//       if (!data || data.length === 0) return `❌ No schedule found for ${batchName}`;

//       const days = ["monday","tuesday","wednesday","thursday","friday"];
//       const askedDay = days.find(d => lowerText.includes(d));

//       if (askedDay) {
//         const dayClasses = data.filter((c: any) => c.DayOfWeek.toLowerCase() === askedDay);
//         if (dayClasses.length === 0) return `❌ No classes for ${batchName} on ${askedDay}`;
//         return dayClasses.map((c: any) =>
//           `📘 ${c.CourseName} - ${c.DayOfWeek} (${c.StartTime} - ${c.EndTime})`
//         ).join("\n");
//       }

//       if (lowerText.includes("all")) {
//         return data.map((c: any) =>
//           `📘 ${c.CourseName} - ${c.DayOfWeek} (${c.StartTime} - ${c.EndTime})`
//         ).join("\n");
//       }

//       if (lowerText.includes("next")) {
//         const now = new Date();
//         const currentDay = now.toLocaleString("en-US", { weekday: "long" });
//         const currentTime = now.getHours() * 60 + now.getMinutes();

//         const toMinutes = (t: string) => {
//           const [h, m, s] = t.split(":").map(Number);
//           return h * 60 + m;
//         };

//         const upcoming = data
//           .filter((c: any) => c.DayOfWeek.toLowerCase() === currentDay.toLowerCase())
//           .filter((c: any) => toMinutes(c.StartTime) > currentTime);

//         if (upcoming.length > 0) {
//           const next = upcoming[0];
//           return `📖 Next Class: ${next.CourseName} on ${next.DayOfWeek} at ${next.StartTime}`;
//         } else {
//           return "✅ No more classes today.";
//         }
//       }

//       return `📖 First Class for ${batchName}: ${data[0].CourseName} on ${data[0].DayOfWeek} at ${data[0].StartTime}`;
//     }
// // ==================== COURSES ====================
// if (lowerText.includes("course") || lowerText.includes("courses")) {
//   if (!batchName) return "❌ Please mention batch (e.g. 21IT courses).";

//   const res = await fetch(`/api/courses?batchName=${batchName}`);
//   const courses = await res.json();

//   if (!courses || courses.length === 0) return `❌ No courses found for ${batchName}`;

//   return `📚 Courses for ${batchName}:\n` + courses.map((c: any) => `- ${c.CourseName}`).join("\n");
// }
//     // ==================== EXAMS ====================
//     if (lowerText.includes("exam") || lowerText.includes("paper") || lowerText.includes("imtihaan")) {
//       if (!batchName) return "❌ Please mention batch (e.g. 21IT all exams).";

//       const res = await fetch(`/api/exams?batchName=${batchName}`);
//       const exams = await res.json();

//       if (!exams || exams.length === 0) return `❌ No exams found for ${batchName}`;

//       if (lowerText.includes("all")) {
//         return exams.map((e: any) =>
//           `📝 ${e.ExamType} - ${e.CourseName} on ${e.ExamDate} at ${e.ExamTime}`
//         ).join("\n");
//       }

//       if (lowerText.includes("midterm")) {
//         const mids = exams.filter((e: any) => e.ExamType.toLowerCase() === "midterm");
//         if (mids.length === 0) return `❌ No midterm exams for ${batchName}`;
//         return mids.map((e: any) =>
//           `📝 Midterm - ${e.CourseName} on ${e.ExamDate} at ${e.ExamTime}`
//         ).join("\n");
//       }

//       if (lowerText.includes("final")) {
//         const finals = exams.filter((e: any) => e.ExamType.toLowerCase() === "final");
//         if (finals.length === 0) return `❌ No final exams for ${batchName}`;
//         return finals.map((e: any) =>
//           `📝 Final - ${e.CourseName} on ${e.ExamDate} at ${e.ExamTime}`
//         ).join("\n");
//       }

//       if (lowerText.includes("next")) {
//         const now = new Date();
//         const upcoming = exams.filter((e: any) => new Date(`${e.ExamDate}T${e.ExamTime}`) > now);
//         if (upcoming.length > 0) {
//           const next = upcoming[0];
//           return `📖 Next Exam: ${next.CourseName} (${next.ExamType}) on ${next.ExamDate} at ${next.ExamTime}`;
//         } else {
//           return `✅ No upcoming exams for ${batchName}`;
//         }
//       }

//       return `📅 Exams for ${batchName} (say "all exams", "next exam", "midterm exams", or "final exams")`;
//     }


//     // ==================== EVENTS ====================
//     if (lowerText.includes("event") || lowerText.includes("program") || lowerText.includes("activity")) {
//       if (!batchName) return "❌ Please mention batch (e.g. 21IT events).";
//       const res = await fetch(`/api/events?batchName=${batchName}`);
//       const events = await res.json();
//       if (!events || events.length === 0) return `❌ No events found for ${batchName}`;

//       if (lowerText.includes("all")) {
//         return events.map((e: any) =>
//           `🎉 ${e.EventName} on ${e.EventDate} at ${e.EventTime} - ${e.Description}`
//         ).join("\n");
//       }

//       if (lowerText.includes("next")) {
//         const now = new Date();
//         const upcoming = events.filter(e => new Date(`${e.EventDate}T${e.EventTime}`) > now);
//         if (upcoming.length > 0) {
//           const next = upcoming[0];
//           return `🎉 Next Event: ${next.EventName} on ${next.EventDate} at ${next.EventTime} - ${next.Description}`;
//         } else {
//           return `✅ No upcoming events for ${batchName}`;
//         }
//       }

//       return `📅 Events for ${batchName} (say "all events" or "next event")`;
//     }

//     // ==================== NAVIGATION ====================
//     switch (cmd) {
//       case "home": router.push('/'); return "🏠 Navigating to Home Page.";
//       case "about": router.push('/about'); return "ℹ️ About Page.";
//       case "contact": router.push('/contact'); return "📞 Contact Page.";
//       case "libraryPage": router.push('/library'); return "📚 Navigating to Library Page.";
//       case "repository": window.open('https://www.digitallibrary.edu.pk/quaideawam.html', '_blank'); return "🌐 Opening Digital Repository.";
//       case "elibrary": window.open('https://opac.quest.edu.pk/', '_blank'); return "📚 Opening e-Library Portal.";
//       case "journals": window.open('https://www.hec.gov.pk', '_blank'); return "📖 Opening Research Journals.";
//     }

//     // ------------------- Department Full Names -------------------
// const deptFullForms: Record<string, string> = {
//   it: 'Information Technology',
//   cs: 'Computer Science',
//   se: 'Software Engineering',
//   ce: 'Civil Engineering',
//   ee: 'Electrical Engineering',
//   me: 'Mechanical Engineering',
//   ai: 'AI & Data Science',
//   bm: 'Bio Medical Engineering',
//   math: 'Mathematics',
//   ene: 'Environment Engineering',
//   physics: 'Physics',
//   bba: 'Business Administration',
// };

// // ------------------- Department Locations -------------------
// const departmentLocations: Record<string, string> = {
//   it: "https://www.google.com/maps/search/Information+Technology+Department+QUEST+Nawabshah",
//   cs: "https://www.google.com/maps/search/Computer+Science+Department+QUEST+Nawabshah",
//   se: "https://www.google.com/maps/search/Software+Engineering+Department+QUEST+Nawabshah",
//   ce: "https://www.google.com/maps/search/Civil+Engineering+Department+QUEST+Nawabshah",
//   ee: "https://www.google.com/maps/search/Electrical+Engineering+Department+QUEST+Nawabshah",
//   me: "https://www.google.com/maps/search/Mechanical+Engineering+Department+QUEST+Nawabshah",
//   ai: "https://www.google.com/maps/search/AI+and+Data+Science+Department+QUEST+Nawabshah",
//   bm: "https://www.google.com/maps/search/Bio+Medical+Engineering+Department+QUEST+Nawabshah",
//   math: "https://www.google.com/maps/search/Mathematics+Department+QUEST+Nawabshah",
//   ene: "https://www.google.com/maps/search/Environment+Engineering+Department+QUEST+Nawabshah",
//   physics: "https://www.google.com/maps/search/Physics+Department+QUEST+Nawabshah",
//   bba: "https://www.google.com/maps/search/Business+Administration+Department+QUEST+Nawabshah",
// };

// // ------------------- 1️⃣ Department Location / Map -------------------
// if (["location","map","directions","kahan","kahaan"].some(k => lowerText.includes(k))) {
//   const foundDeptMap = Object.keys(departmentLocations).find(
//     dept => new RegExp(`\\b${dept}\\b`, 'i').test(lowerText)
//   );

//   if (foundDeptMap) {
//     const openMap = (url: string) => {
//       window.open(url, "_blank");
//       speak(`This is ${deptFullForms[foundDeptMap]} department location`);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         pos => {
//           const lat = pos.coords.latitude, lon = pos.coords.longitude;
//           const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${encodeURIComponent(deptFullForms[foundDeptMap] + " Department QUEST Nawabshah")}`;
//           openMap(mapsUrl);
//         },
//         () => openMap(departmentLocations[foundDeptMap])
//       );
//     } else {
//       openMap(departmentLocations[foundDeptMap]);
//     }

//     return `📍 Showing map for ${deptFullForms[foundDeptMap]} department.`;
//   }
// }

// // ------------------- 2️⃣ Open Department Page -------------------
// if (lowerText.includes("open department") || lowerText.includes("show department")) {
//   const foundDeptPage = Object.keys(deptFullForms).find(
//     dept => new RegExp(`\\b${dept}\\b`, 'i').test(lowerText)
//   );

//   if (foundDeptPage) {
//     speak(`Opening ${deptFullForms[foundDeptPage]} department page`);
//     router.push(`/departments/${foundDeptPage}`);
//     return `🔎 Opening ${deptFullForms[foundDeptPage]} Department Page.`;
//   }
// }

//     return "❌ Sorry, I didn’t understand that.";
//   };

//   // 🚀 Handle Send
//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: 'user', text: input };
//     const botReply = { sender: 'bot', text: await handleCommand(input) };
//     setMessages(prev => [...prev, userMsg, botReply]);
//     setInput('');
//     setEditIndex(null);
//   };

//    // 🎤 Start Listening
// const startListening = () => {
//   if (!SpeechRecognition) {
//     speak("Speech recognition is not supported in your browser.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.lang = "en-US";
//   recognition.continuous = true;
//   recognition.interimResults = false;

//   setListening(true);

//   recognition.onresult = async (event: any) => {
//     const transcript = event.results[event.results.length - 1][0].transcript;
//     console.log("YOU SAID:", transcript);

//     // ✅ Show chat box when first command received
//     setShowChat(true);

//     // 📝 User message
//     setMessages((prev) => [...prev, { sender: "You", text: transcript }]);

//     // 🛑 STOP LISTENING COMMANDS
//     if (
//       transcript.toLowerCase().includes("stop listening") ||
//       transcript.toLowerCase().includes("band karo") ||
//       transcript.toLowerCase().includes("nova stop") ||
//       transcript.toLowerCase().includes("suleman stop")
//     ) {
//       recognition.stop();
//       setListening(false);
//       setMessages((prev) => [...prev, { sender: "Nova", text: "🛑 Ok Sir" }]);
//       speak("🛑 Ok Sir");
//       return;
//     }

//     // 🧠 Process other commands
//     const response = await handleCommand(transcript);

//     // 🤖 Suleman ka jawab
//     setMessages((prev) => [...prev, { sender: "Nova", text: response }]);
//     speak(response);
//   };

//   recognition.onerror = () => {
//     setListening(false);
//     speak("❌ Error in listening, restarting...");
//     startListening();
//   };

//   recognition.onend = () => {
//     if (listening) recognition.start();
//   };

//   recognition.start();
// };

//   return (
//     <>
//       {/* 🎙 Mic Button */}
//       <div
//         onClick={startListening}
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           background: listening ? '#27ae60' : '#2c3e50',
//           color: '#fff',
//           borderRadius: '50%',
//           width: '60px',
//           height: '60px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '24px',
//           cursor: 'pointer',
//           zIndex: 9999,
//           boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//         }}
//       >
//         🎙️
//       </div>

//       {/* 💬 Chat Box */}
//       {showChat && messages.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           bottom: '100px',
//           right: '20px',
//           width: '300px',
//           maxHeight: '400px',
//           overflowY: 'auto',
//           background: '#fff',
//           border: '1px solid #ccc',
//           borderRadius: '10px',
//           padding: '10px',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//           fontSize: '14px',
//           zIndex: 9999
//         }}>
//           {/* Close Button */}
//           <button
//             onClick={() => setShowChat(false)}
//             style={{
//               background: 'red',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               padding: '3px 8px',
//               cursor: 'pointer',
//               float: 'right',
//               fontSize: '12px'
//             }}
//           >
//             ❌
//           </button>

//           <h4 style={{ margin: '5px 0' }}>💬 Nova Assistant</h4>
//           {messages.map((msg, i) => (
//             <p key={i}><strong>{msg.sender}:</strong> {msg.text}</p>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMic } from 'react-icons/fi';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  // ----------------- Commands -----------------
  const commands: Record<string, string[]> = {
    home: ["home", "ghar", "start", "homepage"],
    about: ["about", "introduction", "ادارو", "info"],
    contact: ["contact", "rabta", "number", "call"],
    libraryPage: ["library page", "books page", "kitab page"],
    exam: ["exam", "paper", "imtihaan", "test"],
    library: ["library", "kitab", "کتب", "book info", "time", "hours"],
    event: ["event", "program", "تقریب", "festival"],
    timetable: [
      "timetable", "schedule", "class", "jadwal",
      "next class", "all class", "all classes",
      "class time", "class room"
    ],
    weeklyschedule: [
      "weeklyschedule", "schedule", "class", "jadwal",
      "next class", "all class", "all classes", "batch",
      "pehla batch", "dosra batch", "teesra batch"
    ],
    repository: ["digital repository", "ریپوزٹری", "repository"],
    elibrary: ["e library", "elibrary", "کتب خانہ", "online library"],
    journals: ["research journal", "journals", "جرنلز", "magazine"],
    scholarships: ["scholarship", "scholarships", "merit scholarship", "all scholarships"],
  };

  // ----------------- Department Full Names -----------------
  const deptFullForms: Record<string, string> = {
    it: 'Information Technology',
    cs: 'Computer Science',
    se: 'Software Engineering',
    ce: 'Civil Engineering',
    ee: 'Electrical Engineering',
    me: 'Mechanical Engineering',
    ai: 'AI & Data Science',
    bm: 'Bio Medical Engineering',
    math: 'Mathematics',
    ene: 'Environment Engineering',
    physics: 'Physics',
    bba: 'Business Administration',
  };

  // ----------------- Department Locations -----------------
  const departmentLocations: Record<string, string> = {
    it: "https://www.google.com/maps/search/Information+Technology+Department+QUEST+Nawabshah",
    cs: "https://www.google.com/maps/search/Computer+Science+Department+QUEST+Nawabshah",
    se: "https://www.google.com/maps/search/Software+Engineering+Department+QUEST+Nawabshah",
    ce: "https://www.google.com/maps/search/Civil+Engineering+Department+QUEST+Nawabshah",
    ee: "https://www.google.com/maps/search/Electrical+Engineering+Department+QUEST+Nawabshah",
    me: "https://www.google.com/maps/search/Mechanical+Engineering+Department+QUEST+Nawabshah",
    ai: "https://www.google.com/maps/search/AI+and+Data+Science+Department+QUEST+Nawabshah",
    bm: "https://www.google.com/maps/search/Bio+Medical+Engineering+Department+QUEST+Nawabshah",
    math: "https://www.google.com/maps/search/Mathematics+Department+QUEST+Nawabshah",
    ene: "https://www.google.com/maps/search/Environment+Engineering+Department+QUEST+Nawabshah",
    physics: "https://www.google.com/maps/search/Physics+Department+QUEST+Nawabshah",
    bba: "https://www.google.com/maps/search/Business+Administration+Department+QUEST+Nawabshah",
  };

  const pdfs = [
    { name: "WIFI Form", file: "wifi-form.pdf" },
    { name: "ACR Officers 17+ 2024", file: "ACROfficers17above2024.pdf" },
    { name: "ACR Proforma B5 to 16", file: "ACRProformaB5to16.doc" },
    { name: "Complaint Form", file: "complaintform.pdf" },
    { name: "Alumni Form", file: "_alumniform.pdf" },
    { name: "Degree Bachelors", file: "degreeBachelors.pdf" },
    { name: "Degree Masters", file: "degreeMasters.pdf" },
    { name: "Employment Form HEC", file: "employmentformhec.pdf" },
    { name: "Registered Graduates Form", file: "registeredgraduatesform.pdf" },
    { name: "Semester Admission Form 2024", file: "SemesterAdmissionForm2024.docx" },
    { name: "Smart Uni Reg Form Staff", file: "SmartUniRegFormStaff.pdf" },
    { name: "Teachers ACR Modified 2024", file: "TeachersACRmodified2024.pdf" },
    { name: "Transcript Bachelors", file: "transcriptBachelors.pdf" },
    { name: "Transcript Masters", file: "transcriptMasters.pdf" },
    { name: "Verification of Academic Certificates", file: "VERIFICATIONISSUANCE OF ACADEMIC CERTIFICATES.pdf" },
    { name: "NIDA-11", file: "NIDA-11.pdf" }
  ];

  // ----------------- Helper: Text to Speech -----------------
  function speak(text: string) {
    try {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      synth.cancel(); // cancel any existing
      synth.speak(utter);
    } catch (e) {
      // ignore if speech unsupported
      console.warn("SpeechSynthesis error", e);
    }
  }

  // ----------------- Match Command -----------------
  function getBestMatch(input: string) {
    input = input.toLowerCase();
    for (const [cmd, options] of Object.entries(commands)) {
      if (options.some(opt => input.includes(opt.toLowerCase()))) {
        return cmd;
      }
    }
    return null;
  }

  // ----------------- Extract Batch Name -----------------
  function extractBatchName(text: string): string | null {
    const match = text.match(/(21|22|23|24)\s?(it|cs|se|ce|ee|me|ai|bm|math|ene)/i);
    return match ? match[0].toUpperCase().replace(" ", "") : null;
  }

  // ----------------- Load Chat History -----------------
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // ----------------- Load Timetable -----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/timetable');
        if (res.ok) {
          const data = await res.json();
          setTimetable(data);
        }
      } catch (e) {
        // ignore fetch errors
      }
    };
    fetchData();
  }, []);

  // ================= NLP Normalization =================
  function normalizeText(input: string): string {
    const map: Record<string, string> = {
      // Urdu
      "امتحان": "exam",
      "پیپر": "exam",
      "ٹیسٹ": "exam",
      "کلاس": "class",
      "شیڈول": "schedule",
      "ٹائم ٹیبل": "schedule",
      "فائنل": "final",
      "مڈ": "midterm",
      "اگلا": "next",
      "سارے": "all",
      "تمام": "all",
      "ایونٹ": "event",
      "پروگرام": "event",

      // Sindhi
      "پيپر": "exam",
      "ٽيسٽ": "exam",
      "ڪلاس": "class",
      "جدول": "schedule",
      "ٽائيم ٽيبل": "schedule",
      "مڊ": "midterm",
      "اڳيون": "next",
      "سڀ": "all",
      "ايونٽ": "event",

      // Roman Urdu / English
      "imtihan": "exam",
      "imtihaan": "exam",
      "paper": "exam",
      "test": "exam",
      "class": "class",
      "schedule": "schedule",
      "final": "final",
      "mid": "midterm",
      "midterm": "midterm",
      "next": "next",
      "all": "all",
      "event": "event",
      "program": "event",
      "activity": "event",
    };

    let normalized = input.toLowerCase();
    for (const [key, val] of Object.entries(map)) {
      if (normalized.includes(key)) {
        normalized = normalized.replace(new RegExp(key, "gi"), val);
      }
    }
    // remove punctuation, extra spaces
    normalized = normalized.replace(/[^\w\s\u0600-\u06FF\u0750-\u077F]/g, " ");
    normalized = normalized.replace(/\s+/g, " ").trim();
    return normalized;
  }

  // ---------------- Library map (centralized) ----------------
  const libraryMap: Record<string, string> = {
    physics: "/library/physics",
    "physics library": "/library/physics",
    cs: "/library/cs",
    "cs library": "/library/cs",
    "computer science library": "/library/cs",
    digital: "/library/digital",
    "digital library": "/library/digital",
    math: "/library/math",
    "math library": "/library/math",
    "mathematics library": "/library/math",
    ai: "/library/ai",
    "ai library": "/library/ai",
    se: "/library/se",
    "se library": "/library/se",
    "software engineering library": "/library/se",
    ce: "/library/ce",
    "ce library": "/library/ce",
    "civil engineering library": "/library/ce",
    ee: "/library/ee",
    "ee library": "/library/ee",
    "electrical engineering library": "/library/ee",
    me: "/library/me",
    "me library": "/library/me",
    "mechanical engineering library": "/library/me",
    bba: "/library/bba",
    "bba library": "/library/bba",
    chem: "/library/chem",
    "chemistry library": "/library/chem",
    bio: "/library/bio",
    "biology library": "/library/bio",
    eco: "/library/eco",
    "economics library": "/library/eco",
    law: "/library/law",
    "law library": "/library/law",
    med: "/library/med",
    "medical library": "/library/med",
    geo: "/library/geo",
    "geography library": "/library/geo",
    hist: "/library/hist",
    "history library": "/library/hist",
    lit: "/library/lit",
    "literature library": "/library/lit",
    phil: "/library/phil",
    "philosophy library": "/library/phil",
    art: "/library/art",
    "arts library": "/library/art",
  };

  // ================== MAIN HANDLE COMMAND ==================
  const handleCommand = async (text: string) => {
    const lowerText = normalizeText(text.toLowerCase()); // ✅ Apply NLP
    const cmd = getBestMatch(lowerText);
    const batchName = extractBatchName(lowerText);

    // ✅ Greetings
    const greetings = ["hello", "hi", "how are you", "hey", "assalam", "assalamualaikum", "salam"];
    if (greetings.some(g => lowerText.includes(g))) {
      speak("I am your voice assistant. How can I help you?");
      return "🤖 I am your voice assistant. How can I help you?";
    }

    // ----------------- PDF Download Voice Command -----------------
    if (lowerText.includes("download")) {
      // Remove "download" and common extra words
      let requestedForm = lowerText
        .replace("download", "")
        .replace("form", "")
        .replace("from", "")
        .replace(/\s+/g, "")       // remove spaces
        .replace(/[-+_]/g, "")     // remove special chars
        .toLowerCase();

      // Find PDF ignoring spaces, special chars, and case
      const foundPdf = pdfs.find(pdf => {
        const normalizedPdf = pdf.name
          .replace(/\s+/g, "")
          .replace(/[-+_]/g, "")
          .toLowerCase();
        return normalizedPdf.includes(requestedForm);
      });

      if (foundPdf) {
        const link = document.createElement("a");
        link.href = `/files/${foundPdf.file}`;
        link.download = foundPdf.file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        speak(`Downloading ${foundPdf.name}`);
        return `⬇️ Downloading ${foundPdf.name}`;
      } else {
        speak(`Sorry, I could not find the form "${requestedForm}"`);
        return `❌ Form not found: ${requestedForm}`;
      }
    }

    // ----------------- 1️⃣ Department Location / Map -----------------
    if (["location","map","directions","kahan","kahaan"].some(k => lowerText.includes(k))) {
      const foundDeptMap = Object.keys(departmentLocations).find(
        dept => new RegExp(`\\b${dept}\\b`, 'i').test(lowerText)
      );

      if (foundDeptMap) {
        const openMap = (url: string) => {
          window.open(url, "_blank");
          speak(`This is ${deptFullForms[foundDeptMap]} department location`);
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              const lat = pos.coords.latitude, lon = pos.coords.longitude;
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${encodeURIComponent(deptFullForms[foundDeptMap] + " Department QUEST Nawabshah")}`;
              openMap(mapsUrl);
            },
            () => openMap(departmentLocations[foundDeptMap])
          );
        } else {
          openMap(departmentLocations[foundDeptMap]);
        }

        return `📍 Showing map for ${deptFullForms[foundDeptMap]} department.`;
      }
    }

    // ----------------- 2️⃣ Open Department Page -----------------
    if (lowerText.includes("open department") || lowerText.includes("show department")) {
      const foundDeptPage = Object.keys(deptFullForms).find(
        dept => new RegExp(`\\b${dept}\\b`, 'i').test(lowerText)
      );

      if (foundDeptPage) {
        speak(`Opening ${deptFullForms[foundDeptPage]} department page`);
        router.push(`/departments/${foundDeptPage}`);
        return `🔎 Opening ${deptFullForms[foundDeptPage]} Department Page.`;
      }
    }

    // ----------------- 3️⃣ Batch Commands (Classes / Courses / Exams / Events) -----------------
    // ==================== WEEKLY SCHEDULE ====================
    if (lowerText.includes("class") || lowerText.includes("schedule")) {
      if (!batchName) return "❌ Please mention batch (e.g. 21IT Tuesday classes).";
      try {
        const res = await fetch(`/api/weeklyschedule?batchName=${batchName}`);
        const data = await res.json();
        if (!data || data.length === 0) return `❌ No schedule found for ${batchName}`;

        const days = ["monday","tuesday","wednesday","thursday","friday"];
        const askedDay = days.find(d => lowerText.includes(d));

        if (askedDay) {
          const dayClasses = data.filter((c: any) => c.DayOfWeek.toLowerCase() === askedDay);
          if (dayClasses.length === 0) return `❌ No classes for ${batchName} on ${askedDay}`;
          return dayClasses.map((c: any) =>
            `📘 ${c.CourseName} - ${c.DayOfWeek} (${c.StartTime} - ${c.EndTime})`
          ).join("\n");
        }

        if (lowerText.includes("all")) {
          return data.map((c: any) =>
            `📘 ${c.CourseName} - ${c.DayOfWeek} (${c.StartTime} - ${c.EndTime})`
          ).join("\n");
        }

        if (lowerText.includes("next")) {
          const now = new Date();
          const currentDay = now.toLocaleString("en-US", { weekday: "long" });
          const currentTime = now.getHours() * 60 + now.getMinutes();

          const toMinutes = (t: string) => {
            const [h, m, s] = t.split(":").map(Number);
            return h * 60 + m;
          };

          const upcoming = data
            .filter((c: any) => c.DayOfWeek.toLowerCase() === currentDay.toLowerCase())
            .filter((c: any) => toMinutes(c.StartTime) > currentTime);

          if (upcoming.length > 0) {
            const next = upcoming[0];
            return `📖 Next Class: ${next.CourseName} on ${next.DayOfWeek} at ${next.StartTime}`;
          } else {
            return "✅ No more classes today.";
          }
        }

        return `📖 First Class for ${batchName}: ${data[0].CourseName} on ${data[0].DayOfWeek} at ${data[0].StartTime}`;
      } catch (e) {
        return `❌ Error fetching schedule.`;
      }
    }

    // ----------------- SCHOLARSHIPS -----------------
    const scholarships = [
  { name: "Merit Scholarship", description: "Awarded for academic excellence.", deadline: "2025-09-30" },
  { name: "Need-Based Scholarship", description: "Financial support for deserving students.", deadline: "2025-10-15" },
  { name: "Sports Scholarship", description: "For outstanding athletes.", deadline: "2025-11-10" },
  { name: "Research Grant", description: "Support for research projects.", deadline: "2025-12-01" },
  { name: "Women in STEM", description: "Scholarship for female students in STEM.", deadline: "2025-11-20" },
  { name: "International Student Scholarship", description: "For students from other countries.", deadline: "2025-12-31" },
  { name: "Alumni Sponsored Scholarship", description: "Funded by alumni for deserving students.", deadline: "2026-01-15" },
  { name: "Community Service Scholarship", description: "For students with community service achievements.", deadline: "2026-02-28" },
  { name: "Innovation Scholarship", description: "For innovative project submissions.", deadline: "2026-03-30" },
  { name: "Leadership Scholarship", description: "For student leaders and campus influencers.", deadline: "2026-04-15" },
];

if (lowerText.includes("all scholarships")) {
  return `🎓 Available Scholarships:\n${scholarships
    .map((s, i) => `${i + 1}. ${s.name} - Deadline: ${new Date(s.deadline).toLocaleDateString("en-GB")}`)
    .join("\n")}`;
}

if (lowerText.includes("next scholarship")) {
  const now = new Date();
  const upcoming = scholarships
    .filter((s) => new Date(s.deadline) > now)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  if (upcoming.length > 0) {
    const next = upcoming[0];
    return `📅 Next Scholarship:\n${next.name} - ${next.description}\nDeadline: ${new Date(next.deadline).toLocaleDateString("en-GB")}`;
  }
  return "✅ No upcoming scholarships.";
}

const found = scholarships.find((s) => lowerText.includes(s.name.toLowerCase()));
if (found) {
  return `🎓 ${found.name}:\nDescription: ${found.description}\nDeadline: ${new Date(found.deadline).toLocaleDateString("en-GB")}`;
}

if (lowerText.includes("scholarship")) {
  const random = scholarships[Math.floor(Math.random() * scholarships.length)];
  return `🎓 Random Scholarship:\n${random.name} - ${random.description}\nDeadline: ${new Date(random.deadline).toLocaleDateString("en-GB")}`;
}


    // ----------------- Vice Chancellors -----------------
    if (["current vice chancellor", "quest vice chancellor", "quest vc"].some(cmd =>
      lowerText.toLowerCase().includes(cmd.toLowerCase())
    )) {
      return `📜 Current Vice Chancellor of QUEST:\n- Prof. Dr. Saleem Raza Samo (Current)`;
    }

    if (["vice chancellor","past vice chancellors"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Vice Chancellors of QUEST:\n- Prof. Dr. Abdul Rehman Memon (Tenure: 15-08-1996)\n- Prof. Jan Muhammad Keerio (Tenure: 03-09-1996)\n- Prof. Dr. Ali Bux Soomro (Tenure: 25-02-2010)\n- Prof. Dr. Saleem Raza Samo (Current)`;
    }

    // Departments info (IT / CS / SE / EE / CE / ME / AI / BM / Math / ENE)
    if (["it department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 IT Department Chairman:\n- Prof. Dr. Muhammad Sulleman Memon (Chairman)`;
    }
    if (["it department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 IT Department Staff:\n- Prof. Dr. Muhammad Sulleman Memon (Chairman)\n- Prof. Dr. Muhammad Ibrahim Channa (Dean)\n- Prof. Dr. Zahid Hussain Abro (Professor)\n- Dr. Shahzaman Niazamai (Associate Professor)\n- Prof. Dr. Saifullah Memon (Assistant Professor)\n- Dr. Baqir Ali Zardari (Assistant Professor)`;
    }

    if (["cs department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 CS Department Chairman:\n- Prof. Dr. Muhammad Saleem Vighio (Chairman, Computer Science)`;
    }
    if (["cs department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 CS Department Staff:\n- Prof. Dr. Muhammad Saleem Vighio\n- Prof. Dr. Mukhtiar Ahmed Memon (Professor)\n- Prof. Dr. Zahid Hussain Abro (Professor)\n- Dr. Shahzaman Niazamai (Associate Professor)\n- Prof. Dr. Saifullah Memon (Assistant Professor)\n- Dr. Baqir Ali Zardari (Assistant Professor)`;
    }

    if (["se department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 SE Department Chairman:\n- Prof. Dr. Pardeep Kumar (Chairman, Software Engineering)`;
    }
    if (["se department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 SE Department Staff:\n- Prof. Dr. Pardeep Kumar\n- Prof. Dr. Mukhtiar Ahmed Memon (Professor)\n- Prof. Dr. Zahid Hussain Abro (Professor)\n- Dr. Shahzaman Niazamai (Associate Professor)\n- Prof. Dr. Saifullah Memon (Assistant Professor)\n- Dr. Baqir Ali Zardari (Assistant Professor)`;
    }

    if (["ee department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 EE Department Chairman:\n- Prof. Dr. Abdul Sattar Saand (Chairman, Electrical Engineering)`;
    }
    if (["ee department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 EE Department Staff:\n- Prof. Dr. Abdul Sattar Saand\n- Prof. Dr. Abdul Nasir Laghari (Chairman)\n- Dr. Ahsanullah Soomro (Associate Professor)\n- Dr. Asif Saleh Qureshi (Assistant Professor)\n- Dr. Imran Ahmed Samo (Assistant)\n- Dr. Asif Ali Siyal (Assistant Professor)\n- Engr. Aman Abdul Raqeeb Bhutto (Lab Instructor)`;
    }

    if (["ce department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 CE Department Chairman:\n- Prof. Dr. Daddan Khan Bangwar (Chairman, Civil Engineering)`;
    }
    if (["ce department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 CE Department Staff:\n- Prof. Dr. Daddan Khan Bangwar\n- Dr. Bashir Ahmed Memon (Professor)\n- Prof. Dr. Ahsan Ali Buriro (Professor)\n- Dr. Aftab Hameed Memon (Professor)\n- Dr. Mukhtiar Ali Samroo (Associate Professor)\n- Dr. Riaz Bhambro (Associate Professor)\n- Engr. Ubaidullah Memon (Associate Professor)`;
    }

    // ME
    if (["me department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 ME Department Chairman:\n- Prof. Dr. Abdul Rehman Jatoi (Chairman, Mechanical Engineering)`;
    }
    if (["me department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 ME Department Staff:\n- Prof. Dr. Abdul Rehman Jatoi\n- Dr. Bashir Ahmed Memon (Professor)\n- Prof. Dr. Ahsan Ali Buriro (Professor)\n- Dr. Aftab Hameed Memon (Professor)\n- Dr. Mukhtiar Ali Samroo (Associate Professor)\n- Dr. Riaz Bhambro (Associate Professor)\n- Engr. Ubaidullah Memon (Associate Professor)`;
    }

    // AI & DS
    if (["ai department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 AI & DS Department Chairman:\n- Dr. Mehwish Leghari (Chairman, AI & Data Science)`;
    }
    if (["ai department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 AI & DS Department Staff:\n- Dr. Mehwish Leghari\n- Engr. Jawaid Akhtar Unar (Assistant Professor)`;
    }

    // BM
    if (["bm department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Bio Medical Department Chairman:\n- Dr. Abdul Aleem Jamali (Chairman, Bio Medical Engineering)`;
    }
    if (["bm department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Bio Medical Department Staff:\n- Dr. Abdul Aleem Jamali\n- Ms. Ayesha Khan`;
    }

    // Mathematics
    if (["math department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Mathematics Department Chairman:\n- Prof. Rajab Ali Malookani (Chairman, Mathematics)`;
    }
    if (["math department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Mathematics Department Staff:\n- Prof. Rajab Ali Malookani\n- Prof. Dr. Khuda Bux Amur (Professor)\n- Prof. Dr. Sajjad Hussain Sandhio (Professor)\n- Dr. Shakeel Ahmed Kambohi (Associate Professor)\n- Mr. Iqrar Ali Pali (Assistant Professor)`;
    }

    // Environmental (ENE)
    if (["ene department chairman"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Environmental Engineering Department Chairman:\n- Prof. Dr. Sana Qureshi (Chairman, Environmental Engineering)`;
    }
    if (["ene department staff"].some(cmd => lowerText.includes(cmd))) {
      return `📜 Environmental Engineering Department Staff:\n- Prof. Dr. Sana Qureshi\n- Dr. Ali Raza (Professor)\n- Dr. Amina Khan (Assistant Professor)`;
    }

    // Library Timing
    if (["library timing", "library hours", "library time"].some(cmd => lowerText.includes(cmd))) {
      return `📚 Library Timing:\n- Monday to Friday: 8:00 AM to 8:00 PM\n- Saturday & Sunday: 8:00 AM to 4:00 PM`;
    }

    // ==================== COURSES ====================
    if (lowerText.includes("course") || lowerText.includes("courses")) {
      if (!batchName) return "❌ Please mention batch (e.g. 21IT courses).";
      try {
        const res = await fetch(`/api/courses?batchName=${batchName}`);
        const courses = await res.json();
        if (!courses || courses.length === 0) return `❌ No courses found for ${batchName}`;
        return `📚 Courses for ${batchName}:\n` + courses.map((c: any) => `- ${c.CourseName}`).join("\n");
      } catch (e) {
        return `❌ Error fetching courses.`;
      }
    }

    // ==================== EXAMS ====================
       if (lowerText.includes("exam") || lowerText.includes("paper") || lowerText.includes("imtihaan")) {
  if (!batchName) return "❌ Please mention batch (e.g. 21IT all exams).";

  const res = await fetch(`/api/exams?batchName=${batchName}`);
  const exams = await res.json();

  if (!exams || exams.length === 0) return `❌ No exams found for ${batchName}`;

  // ✅ Helper functions
  // Parse exam date + time into one Date object
const parseDateTime = (exam: any) => {
  if (!exam.ExamDate) return null;

  const d = new Date(exam.ExamDate); // ExamDate is timestamp or ISO string
  if (isNaN(d.getTime())) return null;

  // Combine date + time (if time exists)
  const [hours, minutes, seconds] = (exam.ExamTime || "00:00:00")
    .split(":")
    .map((x: string) => parseInt(x, 10));

  d.setHours(hours || 0, minutes || 0, seconds || 0, 0);

  return d;
};

// Format date nicely (fallback: "Unknown Date")
const formatDate = (dateVal: any) => {
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? "Unknown Date" : d.toLocaleDateString("en-GB");
};


  // 📌 All exams
  if (lowerText.includes("all")) {
    return exams
      .sort((a: any, b: any) => parseDateTime(a).getTime() - parseDateTime(b).getTime())
      .map(
        (e: any) =>
          `📝 ${(e.ExamType || "Exam")} - ${e.CourseName || "No Course"} on ${formatDate(
            e.ExamDate
          )} at ${e.ExamTime || "00:00"}`
      )
      .join("\n");
  }

  // 📌 Midterm exams
  if (lowerText.includes("midterm")) {
    const mids = exams.filter((e: any) => (e.ExamType || "").toLowerCase() === "midterm");
    if (mids.length === 0) return `❌ No midterm exams for ${batchName}`;

    return mids
      .sort((a: any, b: any) => parseDateTime(a).getTime() - parseDateTime(b).getTime())
      .map(
        (e: any) =>
          `📝 Midterm - ${e.CourseName || "No Course"} on ${formatDate(
            e.ExamDate
          )} at ${e.ExamTime || "00:00"}`
      )
      .join("\n");
  }

  // 📌 Final exams
  if (lowerText.includes("final")) {
    const finals = exams.filter((e: any) => (e.ExamType || "").toLowerCase() === "final");
    if (finals.length === 0) return `❌ No final exams for ${batchName}`;

    return finals
      .sort((a: any, b: any) => parseDateTime(a).getTime() - parseDateTime(b).getTime())
      .map(
        (e: any) =>
          `📝 Final - ${e.CourseName || "No Course"} on ${formatDate(
            e.ExamDate
          )} at ${e.ExamTime || "00:00"}`
      )
      .join("\n");
  }

  // 📌 Next exam (sabse kareeb)
  if (lowerText.includes("next exam")) {
  const now = new Date();

  const upcoming = exams
    .map((e: any) => {
      const examDateTime = parseDateTime(e);
      return examDateTime ? { ...e, examDateTime } : null;
    })
    .filter((e: any) => e && e.examDateTime > now)
    .sort((a: any, b: any) => a.examDateTime - b.examDateTime);

  if (upcoming.length > 0) {
    const next = upcoming[0];
    return `📖 Next Exam: ${next.CourseName} (${next.ExamType}) on ${formatDate(
      next.examDateTime
    )} at ${next.ExamTime}`;
  } else {
    return `✅ No upcoming exams for ${batchName}`;
  }
}


  // 📌 Default guide
  return `📅 Exams for ${batchName} (say "all exams", "next exam", "midterm exams", or "final exams")`;
}

    // ==================== EVENTS ====================
    if (lowerText.includes("event") || lowerText.includes("program") || lowerText.includes("activity")) {
      if (!batchName) return "❌ Please mention batch (e.g. 21IT events).";
      const res = await fetch(`/api/events?batchName=${batchName}`);
      const events = await res.json();
      if (!events || events.length === 0) return `❌ No events found for ${batchName}`;

      if (lowerText.includes("all")) {
        return events.map((e: any) =>
          `🎉 ${e.EventName} on ${e.EventDate} at ${e.EventTime} - ${e.Description}`
        ).join("\n");
      }

      if (lowerText.includes("next")) {
  const now = new Date();

  const upcoming = (Array.isArray(events) ? events : [])
    .filter((e: any) => {
      const eventDateTime = new Date(e.EventDate); 
      if (e.EventTime) {
        const [h, m] = e.EventTime.split(":");
        eventDateTime.setHours(Number(h), Number(m));
      }
      return eventDateTime > now;
    })
    .sort((a: any, b: any) => {
      const dateA = new Date(a.EventDate);
      const dateB = new Date(b.EventDate);

      if (a.EventTime) {
        const [h, m] = a.EventTime.split(":");
        dateA.setHours(Number(h), Number(m));
      }
      if (b.EventTime) {
        const [h, m] = b.EventTime.split(":");
        dateB.setHours(Number(h), Number(m));
      }

      return dateA.getTime() - dateB.getTime();
    });

  if (upcoming.length > 0) {
  const next = upcoming[0];

  let dateStr = "Unknown Date";
  try {
    const eventDateObj = next.EventDate instanceof Date 
      ? next.EventDate 
      : new Date(next.EventDate);

    if (!isNaN(eventDateObj.getTime())) {
      dateStr = eventDateObj.toLocaleDateString("en-GB");
    }
  } catch (err) {
    console.error("Date parse error:", err);
  }

  return `📅 Next Event: ${next.EventName} on ${dateStr} at ${next.EventTime}`;
}


  return "📭 No upcoming events found.";
}


      return `📅 Events for ${batchName} (say "all events" or "next event")`;
    }

    // ----------------- Navigation (command map) -----------------
    switch (cmd) {
      case "home": router.push('/'); return "🏠 Navigating to Home Page.";
      case "about": router.push('/about'); return "ℹ️ About Page.";
      case "contact": router.push('/contact'); return "📞 Contact Page.";
      case "libraryPage": router.push('/library'); return "📚 Navigating to Library Page.";
      case "repository": window.open('https://www.digitallibrary.edu.pk/quaideawam.html', '_blank'); return "🌐 Opening Digital Repository.";
      case "elibrary": window.open('https://opac.quest.edu.pk/', '_blank'); return "📚 Opening e-Library Portal.";
      case "journals": window.open('https://www.hec.gov.pk', '_blank'); return "📖 Opening Research Journals.";
      // default: continue to library map checks
    }

    // ----------------- Library map checks (flexible) -----------------
    for (const key of Object.keys(libraryMap)) {
      if (lowerText.includes(key)) {
        const route = libraryMap[key];
        try {
          router.push(route);
        } catch (e) {
          window.location.href = route;
        }
        return `📖 Opening ${key.replace(" library", "")} Library...`;
      }
    }

    // final fallback
    return "❌ Sorry, I didn’t understand that.";
  };

  // ----------------- Handle Send -----------------
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    const botText = await handleCommand(input);
    const botReply = { sender: 'bot', text: botText };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInput('');
    setEditIndex(null);
  };

  // ----------------- quick voice helper for single-shot recognition -----------------
  const handleVoice = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { sender: "User", text: transcript }]);

      // optional: send to backend (kept from your original code)
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: transcript }),
        });
        const data = await res.json();
        let reply = "";
        if (Array.isArray(data.answer)) {
          reply = data.answer.map((s: any) => `${s.title} (Deadline: ${new Date(s.deadline).toDateString()})`).join("\n");
        } else if (data.answer?.title) {
          reply = `${data.answer.title}: ${data.answer.description}. Deadline: ${new Date(data.answer.deadline).toDateString()}`;
        } else if (data.answer) {
          reply = data.answer;
        } else {
          reply = await handleCommand(transcript);
        }

        setMessages((prev) => [...prev, { sender: "Assistant", text: reply }]);
        speak(reply);
      } catch (e) {
        const reply = await handleCommand(transcript);
        setMessages((prev) => [...prev, { sender: "Assistant", text: reply }]);
        speak(reply);
      }
    };

    recognition.onerror = (err: any) => {
      console.error("Voice error:", err);
    };

    recognition.start();
  };

  // ----------------- Continuous listening (mic button) -----------------
  const startListening = () => {
    if (!SpeechRecognition) {
      speak("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    setListening(true);

    recognition.onresult = async (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setShowChat(true);
      setMessages((prev) => [...prev, { sender: "You", text: transcript }]);

      const lower = transcript.toLowerCase();
      // stop commands
      if (lower.includes("stop listening") || lower.includes("stop")) {
        recognition.stop();
        setListening(false);
        setMessages((prev) => [...prev, { sender: "Nova", text: "Ok Sir" }]);
        speak("Ok Sir");
        return;
      }

      const response = await handleCommand(transcript);
      setMessages((prev) => [...prev, { sender: "Nova", text: response }]);
      speak(response);
    };

   recognition.onerror = () => { setListening(false); speak("❌ Error in listening, restarting..."); startListening(); };



    recognition.onend = () => {
      // if still intended to listen, restart
      if (listening) {
        try {
          recognition.start();
        } catch (e) {
          // ignore
        }
      }
    };

    try {
      recognition.start();
    } catch (e) {
      // ignore start errors
    }
  };

  return (
    <>
      {/* 🎙 Mic Button */}
      <div
        onClick={() => {
          if (listening) {
            // stop listening by toggling flag; restart handled in recognition.onend
            setListening(false);
            speak("Stopped listening");
            setMessages(prev => [...prev, { sender: "Nova", text: "Stopped listening" }]);
          } else {
            startListening();
          }
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: listening ? '#27ae60' : '#2c3e50',
          color: '#fff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <FiMic />
      </div>

      {/* 💬 Chat Box */}
      {showChat && messages.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '320px',
          maxHeight: '420px',
          overflowY: 'auto',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          fontSize: '14px',
          zIndex: 9999
        }}>
          <button
            onClick={() => setShowChat(false)}
            style={{
              background: 'red',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '3px 8px',
              cursor: 'pointer',
              float: 'right',
              fontSize: '12px'
            }}
          >
            ❌
          </button>

          <h4 style={{ margin: '5px 0' }}>💬 Nova Assistant</h4>
          {messages.map((msg, i) => (
            <p key={i}><strong>{msg.sender}:</strong> {msg.text}</p>
          ))}
        </div>
      )}
    </>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { FiMic } from 'react-icons/fi';

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const SpeechRecognition =
//   typeof window !== 'undefined' &&
//   (window.SpeechRecognition || window.webkitSpeechRecognition);

// export default function VoiceAssistant() {
  // const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  // const [input, setInput] = useState('');
  // const [listening, setListening] = useState(false);
  // const [showChat, setShowChat] = useState(false);
  // const router = useRouter();

  // const pdfs = [
  //   { name: "WIFI Form", file: "wifi-form.pdf" },
  //   { name: "ACR Officers 17+ 2024", file: "ACROfficers17above2024.pdf" },
  //   { name: "ACR Proforma B5 to 16", file: "ACRProformaB5to16.doc" },
  //   { name: "Complaint Form", file: "complaintform.pdf" },
  //   { name: "Alumni Form", file: "_alumniform.pdf" },
  //   { name: "Degree Bachelors", file: "degreeBachelors.pdf" },
  //   { name: "Degree Masters", file: "degreeMasters.pdf" },
  //   { name: "Employment Form HEC", file: "employmentformhec.pdf" },
  //   { name: "Registered Graduates Form", file: "registeredgraduatesform.pdf" },
  //   { name: "Semester Admission Form 2024", file: "SemesterAdmissionForm2024.docx" },
  //   { name: "Smart Uni Reg Form Staff", file: "SmartUniRegFormStaff.pdf" },
  //   { name: "Teachers ACR Modified 2024", file: "TeachersACRmodified2024.pdf" },
  //   { name: "Transcript Bachelors", file: "transcriptBachelors.pdf" },
  //   { name: "Transcript Masters", file: "transcriptMasters.pdf" },
  //   { name: "Verification of Academic Certificates", file: "VERIFICATIONISSUANCE OF ACADEMIC CERTIFICATES.pdf" },
  // ];

//   const commands: Record<string, string[]> = {
//     home: ["home", "ghar", "start", "homepage"],
//     about: ["about", "introduction", "info", "about page"],
//     contact: ["contact", "rabta", "number", "call", "contact page"],
//     library: ["library", "kitab", "کتب", "book info", "time", "hours", "library page"],
//   };

//   function speak(text: string) {
//     const synth = window.speechSynthesis;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     synth.speak(utter);
//   }

  // function getBestMatch(input: string) {
  //   input = input.toLowerCase();
  //   for (const [cmd, options] of Object.entries(commands)) {
  //     if (options.some(opt => input.includes(opt.toLowerCase()))) return cmd;
  //   }
  //   return null;
  // }

//   function normalizeText(input: string): string {
//     const map: Record<string, string> = {
//       "hi": "hello",
//       "hey": "hello",
//       "how are you": "hello",
//       "imtihan": "exam",
//       "imtihaan": "exam",
//       "paper": "exam",
//       "test": "exam",
//       "class": "class",
//       "schedule": "schedule",
//       "final": "final",
//       "mid": "midterm",
//       "midterm": "midterm",
//       "next": "next",
//       "all": "all",
//       "event": "event",
//       "program": "event",
//       "activity": "event",
//     };
//     let normalized = input.toLowerCase();
//     for (const [key, val] of Object.entries(map)) {
//       normalized = normalized.replace(new RegExp(key, "gi"), val);
//     }
//     return normalized;
//   }

//   const handleCommand = async (text: string) => {
//     const lowerText = normalizeText(text.toLowerCase());

//     // ----------------- Greetings -----------------
//     if (["hello"].some(g => lowerText.includes(g))) {
//       speak("I am your voice assistant. How can I help you?");
//       return "🤖 I am your voice assistant. How can I help you?";
//     }

//     // ----------------- Page Navigation -----------------
//     const pageCmd = getBestMatch(lowerText);
//     switch (pageCmd) {
//       case "home": router.push('/'); return "🏠 Navigating to Home Page.";
//       case "about": router.push('/about'); return "ℹ️ About Page.";
//       case "contact": router.push('/contact'); return "📞 Contact Page.";
//       case "library": router.push('/library'); return "📚 Navigating to Library Page.";
//     }

//     // ----------------- PDF Download Voice Command -----------------
// if (lowerText.includes("download")) {
//   // Remove "download" and common extra words
//   let requestedForm = lowerText
//     .replace("download", "")
//     .replace("form", "")
//     .replace("from", "")
//     .replace(/\s+/g, "")       // remove spaces
//     .replace(/[-+_]/g, "")     // remove special chars
//     .toLowerCase();

//   // Find PDF ignoring spaces, special chars, and case
//   const foundPdf = pdfs.find(pdf => {
//     const normalizedPdf = pdf.name
//       .replace(/\s+/g, "")
//       .replace(/[-+_]/g, "")
//       .toLowerCase();
//     return normalizedPdf.includes(requestedForm);
//   });

//   if (foundPdf) {
//     const link = document.createElement("a");
//     link.href = `/files/${foundPdf.file}`;
//     link.download = foundPdf.file;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     speak(`Downloading ${foundPdf.name}`);
//     return `⬇️ Downloading ${foundPdf.name}`;
//   } else {
//     speak(`Sorry, I could not find the form "${requestedForm}"`);
//     return `❌ Form not found: ${requestedForm}`;
//   }
// }


//     return "❌ Sorry, I didn’t understand that.";
//   };

//   const startListening = () => {
//     if (!SpeechRecognition) {
//       speak("Speech recognition is not supported in your browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     setListening(true);

//     recognition.onresult = async (event: any) => {
//       const transcript = event.results[event.results.length - 1][0].transcript;
//       setShowChat(true);
//       setMessages((prev) => [...prev, { sender: "You", text: transcript }]);

//       if (transcript.toLowerCase().includes("stop listening")) {
//         recognition.stop();
//         setListening(false);
//         setMessages((prev) => [...prev, { sender: "Nova", text: "🛑 Ok Sir" }]);
//         speak("🛑 Ok Sir");
//         return;
//       }

//       const response = await handleCommand(transcript);
//       setMessages((prev) => [...prev, { sender: "Nova", text: response }]);
//       speak(response);
//     };

//     recognition.onerror = () => {
//       setListening(false);
//       speak("❌ Error in listening, restarting...");
//       startListening();
//     };

//     recognition.onend = () => {
//       if (listening) recognition.start();
//     };

//     recognition.start();
//   };

//   return (
//     <>
//       {/* 🎙 Mic Button */}
//       <div
//         onClick={startListening}
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           background: listening ? '#27ae60' : '#2c3e50',
//           color: '#fff',
//           borderRadius: '50%',
//           width: '60px',
//           height: '60px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '24px',
//           cursor: 'pointer',
//           zIndex: 9999,
//           boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//         }}
//       >
//         <FiMic />
//       </div>

//       {/* 💬 Chat Box */}
//       {showChat && messages.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           bottom: '100px',
//           right: '20px',
//           width: '300px',
//           maxHeight: '400px',
//           overflowY: 'auto',
//           background: '#fff',
//           border: '1px solid #ccc',
//           borderRadius: '10px',
//           padding: '10px',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//           fontSize: '14px',
//           zIndex: 9999
//         }}>
//           <button
//             onClick={() => setShowChat(false)}
//             style={{
//               background: 'red',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               padding: '3px 8px',
//               cursor: 'pointer',
//               float: 'right',
//               fontSize: '12px'
//             }}
//           >
//             ❌
//           </button>

//           <h4 style={{ margin: '5px 0' }}>💬 Nova Assistant</h4>
//           {messages.map((msg, i) => (
//             <p key={i}><strong>{msg.sender}:</strong> {msg.text}</p>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }


