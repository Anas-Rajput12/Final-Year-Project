'use client';

// import { useState, useEffect } from 'react';
import React, { useState, useRef, useEffect } from "react";

import { useRouter } from 'next/navigation';


// 🔹 All Supported Commands with Synonyms
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
};

// ✅ Department Locations for Maps
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
};

// ✅ Forms / PDFs
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

// 🔹 Normalize text for better matching
function normalize(str: string) {
  return str.replace(/\s+/g, "").replace(/[-_+]/g, "").toLowerCase();
}

// 🔹 Helper: Command Match
function getBestMatch(input: string) {
  input = input.toLowerCase();
  for (const [cmd, options] of Object.entries(commands)) {
    if (options.some(opt => input.includes(opt.toLowerCase()))) {
      return cmd;
    }
  }
  return null;
}

// 🟢 Extract BatchName (e.g. "21IT")
function extractBatchName(text: string): string | null {
  const match = text.match(/(21|22|23|24)\s?(it|cs|se|ce|ee|me|ai|bm|math|ene)/i);
  return match ? match[0].toUpperCase().replace(" ", "") : null;
}

// 🔹 Helper: Text to Speech
function speak(text: string) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  synth.speak(utter);
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [timetable, setTimetable] = useState<any[]>([]);
  const router = useRouter();

  const chatRef = useRef<HTMLDivElement>(null);

  // ✅ Scroll always to bottom when messages update
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);


  // Load chat history
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Load timetable from API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/timetable');
      const data = await res.json();
      setTimetable(data);
    };
    fetchData();
  }, []);

  const handleEdit = (index: number) => {
    setInput(messages[index].text);
    setEditIndex(index);
  };

  // 🧠 Handle Commands
  const handleCommand = async (text: string) => {
    const lowerText = text.toLowerCase();
    const cmd = getBestMatch(lowerText);
    const batchName = extractBatchName(lowerText);

    // ==================== PDF DOWNLOAD ====================
    if (lowerText.includes("download")) {
      let requestedForm = normalize(
        lowerText.replace("download", "").replace("form", "").replace("from", "")
      );

      const foundPdf = pdfs.find(pdf =>
        normalize(pdf.name).includes(requestedForm)
      );

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
        const available = pdfs.map(p => p.name).join(", ");
        speak("Sorry, I could not find the form");
        return `❌ Form not found: ${requestedForm}\n✅ Available forms: ${available}`;
      }
    }

    // ==================== WEEKLY SCHEDULE ====================
    if (lowerText.includes("class") || lowerText.includes("schedule")) {
      if (!batchName) return "❌ Please mention batch (e.g. 21IT Tuesday classes).";
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
    }

    // ==================== COURSES ====================
    if (lowerText.includes("course") || lowerText.includes("courses")) {
      if (!batchName) return "❌ Please mention batch (e.g. 21IT courses).";

      const res = await fetch(`/api/courses?batchName=${batchName}`);
      const courses = await res.json();

      if (!courses || courses.length === 0) return `❌ No courses found for ${batchName}`;

      return `📚 Courses for ${batchName}:\n` + courses.map((c: any) => `- ${c.CourseName}`).join("\n");
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
    // ----------------- Vice Chancellors -----------------
// ----------------- Current Vice Chancellor -----------------
if (["current vice chancellor", "quest vice chancellor", "quest vc"].some(cmd =>
  lowerText.toLowerCase().includes(cmd.toLowerCase())
)) {
  return `📜 Current Vice Chancellor of QUEST:
- Prof. Dr. Saleem Raza Samo (Current)`;
}

if (["vice chancellor","past vice chancellors"].some(cmd => lowerText.includes(cmd))) {
  return `📜 Vice Chancellors of QUEST:
- Prof. Dr. Abdul Rehman Memon (Tenure: 15-08-1996)
- Prof. Jan Muhammad Keerio (Tenure: 03-09-1996)
- Prof. Dr. Ali Bux Soomro (Tenure: 25-02-2010)
- Prof. Dr. Saleem Raza Samo (Current)`;
}

if (["it department chairman"].some(cmd => lowerText.includes(cmd))) {
  return `📜 IT Department Chairman:
- Prof. Dr. Muhammad Sulleman Memon (Chairman)`;
}

if (["it department staff"].some(cmd => lowerText.includes(cmd))) {
  return `📜 IT Department Staff:
- Prof. Dr. Muhammad Sulleman Memon (Chairman)
- Prof. Dr. Muhammad Ibrahim Channa (Dean)
- Prof. Dr. Zahid Hussain Abro (Professor)
- Dr. Shahzaman Niazamai (Associate Professor)
- Prof. Dr. Saifullah Memon (Assistant Professor)
- Dr. Baqir Ali Zardari (Assistant Professor)`;
}

if (["cs department chairman"].some(cmd => lowerText.includes(cmd))) {
  return `📜 CS Department Chairman:
- Prof. Dr. Muhammad Saleem Vighio (Chairman, Computer Science)`;
}

if (["cs department staff"].some(cmd => lowerText.includes(cmd))) {
  return `📜 CS Department Staff:
- Prof. Dr. Muhammad Saleem Vighio
- Prof. Dr. Mukhtiar Ahmed Memon (Professor)
- Prof. Dr. Zahid Hussain Abro (Professor)
- Dr. Shahzaman Niazamai (Associate Professor)
- Prof. Dr. Saifullah Memon (Assistant Professor)
- Dr. Baqir Ali Zardari (Assistant Professor)`;
}


if (["se department chairman"].some(cmd => lowerText.includes(cmd))) {
  return `📜 SE Department Chairman:
- Prof. Dr. Pardeep Kumar (Chairman, Software Engineering)`;
}

if (["se department staff"].some(cmd => lowerText.includes(cmd))) {
  return `📜 SE Department Staff:
- Prof. Dr. Pardeep Kumar
- Prof. Dr. Mukhtiar Ahmed Memon (Professor)
- Prof. Dr. Zahid Hussain Abro (Professor)
- Dr. Shahzaman Niazamai (Associate Professor)
- Prof. Dr. Saifullah Memon (Assistant Professor)
- Dr. Baqir Ali Zardari (Assistant Professor)`;
}


if (["ee department chairman"].some(cmd => lowerText.includes(cmd))) {
  return `📜 EE Department Chairman:
- Prof. Dr. Abdul Sattar Saand (Chairman, Electrical Engineering)`;
}

if (["ee department staff"].some(cmd => lowerText.includes(cmd))) {
  return `📜 EE Department Staff:
- Prof. Dr. Abdul Sattar Saand
- Prof. Dr. Abdul Nasir Laghari (Chairman)
- Dr. Ahsanullah Soomro (Associate Professor)
- Dr. Asif Saleh Qureshi (Assistant Professor)
- Dr. Imran Ahmed Samo (Assistant)
- Dr. Asif Ali Siyal (Assistant Professor)
- Engr. Aman Abdul Raqeeb Bhutto (Lab Instructor)`;
}

if (["ce department chairman"].some(cmd => lowerText.includes(cmd))) {
  return `📜 CE Department Chairman:
- Prof. Dr. Daddan Khan Bangwar (Chairman, Civil Engineering)`;
}

if (["ce department staff"].some(cmd => lowerText.includes(cmd))) {
  return `📜 CE Department Staff:
- Prof. Dr. Daddan Khan Bangwar
- Dr. Bashir Ahmed Memon (Professor)
- Prof. Dr. Ahsan Ali Buriro (Professor)
- Dr. Aftab Hameed Memon (Professor)
- Dr. Mukhtiar Ali Samroo (Associate Professor)
- Dr. Riaz Bhambro (Associate Professor)
- Engr. Ubaidullah Memon (Associate Professor)`;
}


// ME Department
  if (["me department chairman"].some(cmd => lowerText.includes(cmd))) {
    return `📜 ME Department Chairman:
- Prof. Dr. Abdul Rehman Jatoi (Chairman, Mechanical Engineering)`;
  }
  if (["me department staff"].some(cmd => lowerText.includes(cmd))) {
    return `📜 ME Department Staff:
- Prof. Dr. Abdul Rehman Jatoi
- Dr. Bashir Ahmed Memon (Professor)
- Prof. Dr. Ahsan Ali Buriro (Professor)
- Dr. Aftab Hameed Memon (Professor)
- Dr. Mukhtiar Ali Samroo (Associate Professor)
- Dr. Riaz Bhambro (Associate Professor)
- Engr. Ubaidullah Memon (Associate Professor)`;
  }


// AI & Data Science Department
  if (["ai department chairman"].some(cmd => lowerText.includes(cmd))) {
    return `📜 AI & DS Department Chairman:
- Dr. Mehwish Leghari (Chairman, AI & Data Science)`;
  }
  if (["ai department staff"].some(cmd => lowerText.includes(cmd))) {
    return `📜 AI & DS Department Staff:
- Dr. Mehwish Leghari
- Engr. Jawaid Akhtar Unar (Assistant Professor)`;
  }
  
  // Bio Medical Department
  if (["bm department chairman"].some(cmd => lowerText.includes(cmd))) {
    return `📜 Bio Medical Department Chairman:
- Dr. Abdul Aleem Jamali (Chairman, Bio Medical Engineering)`;
  }
  if (["bm department staff"].some(cmd => lowerText.includes(cmd))) {
    return `📜 Bio Medical Department Staff:
- Dr. Abdul Aleem Jamali
- Ms. Ayesha Khan`;
  }

  // Mathematics Department
  if (["math department chairman"].some(cmd => lowerText.includes(cmd))) {
    return `📜 Mathematics Department Chairman:
- Prof. Rajab Ali Malookani (Chairman, Mathematics)`;
  }
  if (["math department staff"].some(cmd => lowerText.includes(cmd))) {
    return `📜 Mathematics Department Staff:
- Prof. Rajab Ali Malookani
- Prof. Dr. Khuda Bux Amur (Professor)
- Prof. Dr. Sajjad Hussain Sandhio (Professor)
- Dr. Shakeel Ahmed Kambohi (Associate Professor)
- Mr. Iqrar Ali Pali (Assistant Professor)`;
  }

  // Pharmacy Department
  if (["ene department chairman"].some(cmd => lowerText.includes(cmd))) {
    return `📜 Environmental Engineering Department Chairman:
- Prof. Dr. Sana Qureshi (Chairman, Environmental Engineering)`;
  }
  if (["ene department staff"].some(cmd => lowerText.includes(cmd))) {
    return `📜 Environmental Engineering Department Staff:
- Prof. Dr. Sana Qureshi
- Dr. Ali Raza (Professor)
- Dr. Amina Khan (Assistant Professor)`;
  }

  // Library Timing
if (["library timing", "library hours", "library time"].some(cmd => lowerText.includes(cmd))) {
  return `📚 Library Timing:
- Monday to Friday: 8:00 AM to 8:00 PM
- Saturday & Sunday: 8:00 AM to 4:00 PM`;
}
// const lowerText = text.toLowerCase();

 


    // ==================== NAVIGATION ====================
    switch (cmd) {
      case "home": router.push('/'); return "🏠 Navigating to Home Page.";
      case "about": router.push('/about'); return "ℹ️ About Page.";
      case "contact": router.push('/contact'); return "📞 Contact Page.";
      case "libraryPage": router.push('/library'); return "📚 Navigating to Library Page.";
      case "repository": window.open('https://www.digitallibrary.edu.pk/quaideawam.html', '_blank'); return "🌐 Opening Digital Repository.";
      case "elibrary": window.open('https://opac.quest.edu.pk/', '_blank'); return "📚 Opening e-Library Portal.";
      case "journals": window.open('https://www.hec.gov.pk', '_blank'); return "📖 Opening Research Journals.";
    }
     if (lowerText.includes("physics library")) {
    router.push("/library/physics");
    return "Opening Physics Library...";
  }
  if (lowerText.includes("cs library") || lowerText.includes("computer science library")) {
    router.push("/library/cs");
    return "Opening Computer Science Library...";
  }
  if (lowerText.includes("digital library")) {
    router.push("/library/digital");
    return "Opening Digital Library...";
  }
  if (lowerText.includes("math library") || lowerText.includes("mathematics library")) {
    router.push("/library/math");
    return "Opening Mathematics Library...";
  }
  if (lowerText.includes("ai library") || lowerText.includes("artificial intelligence library")) {
    router.push("/library/ai");
    return "Opening AI Library...";
  }
  if (lowerText.includes("se library") || lowerText.includes("software engineering library")) {
    router.push("/library/se");
    return "Opening Software Engineering Library...";
  }
  if (lowerText.includes("ce library") || lowerText.includes("civil engineering library")) {
    router.push("/library/ce");
    return "Opening Civil Engineering Library...";
  }
  if (lowerText.includes("ee library") || lowerText.includes("electrical engineering library")) {
    router.push("/library/ee");
    return "Opening Electrical Engineering Library...";
  }
  if (lowerText.includes("me library") || lowerText.includes("mechanical engineering library")) {
    router.push("/library/me");
    return "Opening Mechanical Engineering Library...";
  }
  if (lowerText.includes("bba library")) {
    router.push("/library/bba");
    return "Opening BBA Library...";
  }
  if (lowerText.includes("chemistry library")) {
    router.push("/library/chem");
    return "Opening Chemistry Library...";
  }
  if (lowerText.includes("biology library")) {
    router.push("/library/bio");
    return "Opening Biology Library...";
  }
  if (lowerText.includes("economics library")) {
    router.push("/library/eco");
    return "Opening Economics Library...";
  }
  if (lowerText.includes("law library")) {
    router.push("/library/law");
    return "Opening Law Library...";
  }
  if (lowerText.includes("medical library")) {
    router.push("/library/med");
    return "Opening Medical Library...";
  }
  if (lowerText.includes("geography library")) {
    router.push("/library/geo");
    return "Opening Geography Library...";
  }
  if (lowerText.includes("history library")) {
    router.push("/library/hist");
    return "Opening History Library...";
  }
  if (lowerText.includes("literature library")) {
    router.push("/library/lit");
    return "Opening Literature Library...";
  }
  if (lowerText.includes("philosophy library")) {
    router.push("/library/phil");
    return "Opening Philosophy Library...";
  }
  if (lowerText.includes("arts library")) {
    router.push("/library/art");
    return "Opening Arts Library...";
  }


    const deptFullForms: Record<string, string> = {
      it: 'Information Technology',
      cs: 'Computer Science',
      se: 'Software Engineering',
      ce: 'Civil Engineering',
      ee: 'Electrical Engineering',
      me: 'Mechanical Engineering',
      ai: 'Artificial Intelligence',
      bm: 'Bio Medical Engineering',
      math: 'Mathematics',
      ene: 'Environment Engineering',
    };

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

    // --- Department Locations
    if (["location","map","directions","kahan","kahaan"].some(k => lowerText.includes(k))) {
      const foundDept = Object.keys(departmentLocations).find(dept => lowerText.includes(dept));
      if (foundDept) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              const lat = pos.coords.latitude, lon = pos.coords.longitude;
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${encodeURIComponent(foundDept + " department QUEST Nawabshah")}`;
              window.open(mapsUrl, "_blank");
              speak(`This is ${foundDept.toUpperCase()} department location`);
            },
            () => speak("Please turn on your location first.")
          );
        } else {
          window.open(departmentLocations[foundDept], "_blank");
          speak("Your browser does not support GPS. Opening map instead.");
        }
        return `📍 Showing map for ${foundDept.toUpperCase()} department.`;
      }
    }

    return "❌ Sorry, I didn’t understand that.";
  };

  // 🚀 Handle Send
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    const botReply = { sender: 'bot', text: await handleCommand(input) };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInput('');
    setEditIndex(null);
  };


  return (
    <div>
      {/* 💬 Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          background: "#2c3e50",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        💬
      </div>

      {/* 🪟 Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            left: "20px",
            width: "320px",
            height: "400px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#2c3e50",
              color: "#fff",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Student Support Chatbot 🤖
          </div>

          {/* 👇 Chat Messages */}
          <div
            ref={chatRef} // ✅ add ref here
            style={{ flex: 1, padding: "10px", overflowY: "auto" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  margin: "6px 0",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background:
                      msg.sender === "user" ? "#3498db" : "#ecf0f1",
                    color: msg.sender === "user" ? "#fff" : "#2c3e50",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
                {msg.sender === "user" && (
                  <button
                    onClick={() => handleEdit(i)}
                    style={{
                      marginLeft: "6px",
                      fontSize: "14px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#888",
                    }}
                  >
                    ✏️
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 👇 Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                outline: "none",
              }}
              placeholder={
                editIndex !== null
                  ? "Edit your message..."
                  : "Type your message..."
              }
            />
            <button
              onClick={handleSend}
              style={{
                border: "none",
                background: "#3498db",
                color: "#fff",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              {editIndex !== null ? "✔️" : "➤"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// // 🔹 All Supported Commands with Synonyms
// const commands: Record<string, string[]> = {
//   home: ["home", "ghar", "start", "homepage"],
//   about: ["about", "introduction", "ادارو", "info"],
//   contact: ["contact", "rabta", "number", "call"],
//   libraryPage: ["library page", "books page", "kitab page"],
//   exam: ["exam", "paper", "imtihaan", "test"],
//   library: ["library", "kitab", "کتب", "book info", "time", "hours"],
//   event: ["event", "program", "تقریب", "festival"],
//   timetable: ["timetable", "schedule", "class", "jadwal"],
//   weeklyschedule: ["weeklyschedule", "schedule", "class", "jadwal", "batch"],
//   repository: ["digital repository", "ریپوزٹری", "repository"],
//   elibrary: ["e library", "elibrary", "کتب خانہ", "online library"],
//   journals: ["research journal", "journals", "جرنلز", "magazine"],
// };

// // ✅ Department Locations for Maps
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
// };

// // ✅ Forms / PDFs
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
//   {name: "NIDA-11", file: "NIDA-11.pdf" }
// ];

// // 🔹 Helper: Command Match
// function getBestMatch(input: string) {
//   input = input.toLowerCase();
//   for (const [cmd, options] of Object.entries(commands)) {
//     if (options.some(opt => input.includes(opt.toLowerCase()))) {
//       return cmd;
//     }
//   }
//   return null;
// }

// // 🔹 Normalize text for better matching
// function normalize(str: string) {
//   return str.replace(/\s+/g, "").replace(/[-_+]/g, "").toLowerCase();
// }

// // 🔹 Text to Speech
// function speak(text: string) {
//   const synth = window.speechSynthesis;
//   const utter = new SpeechSynthesisUtterance(text);
//   utter.lang = "en-US";
//   synth.speak(utter);
// }

// export default function ChatBot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   const [input, setInput] = useState('');
//   const [listening, setListening] = useState(false);
//   const router = useRouter();

//   // 🎤 Voice Recognition Setup
//   let recognition: any;
//   if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
//     recognition = new (window as any).webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event: any) => {
//       const voiceText = event.results[0][0].transcript;
//       handleSend(voiceText);
//     };

//     recognition.onerror = () => setListening(false);
//     recognition.onend = () => setListening(false);
//   }

//   // 🧠 Handle Commands
//   const handleCommand = async (text: string) => {
//     const lowerText = text.toLowerCase();
//     const cmd = getBestMatch(lowerText);

//     // ✅ PDF DOWNLOAD
//     if (lowerText.includes("download")) {
//       let requestedForm = normalize(
//         lowerText.replace("download", "").replace("form", "").replace("from", "")
//       );

//       const foundPdf = pdfs.find(pdf =>
//         normalize(pdf.name).includes(requestedForm)
//       );

//       if (foundPdf) {
//         const link = document.createElement("a");
//         link.href = `/files/${foundPdf.file}`;
//         link.download = foundPdf.file;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         speak(`Downloading ${foundPdf.name}`);
//         return `⬇️ Downloading ${foundPdf.name}`;
//       } else {
//         speak(`Sorry, I could not find the form`);
//         return `❌ Form not found: ${requestedForm}`;
//       }
//     }

//     // ✅ Navigation
//     switch (cmd) {
//       case "home": router.push('/'); return "🏠 Home Page.";
//       case "about": router.push('/about'); return "ℹ️ About Page.";
//       case "contact": router.push('/contact'); return "📞 Contact Page.";
//       case "libraryPage": router.push('/library'); return "📚 Library Page.";
//       case "repository": window.open('https://www.digitallibrary.edu.pk/quaideawam.html', '_blank'); return "🌐 Digital Repository.";
//       case "elibrary": window.open('https://opac.quest.edu.pk/', '_blank'); return "📚 e-Library Portal.";
//       case "journals": window.open('https://www.hec.gov.pk', '_blank'); return "📖 Research Journals.";
//     }

//     return "❌ Sorry, I didn’t understand that.";
//   };

//   // 🚀 Handle Send (User or Voice)
//   const handleSend = async (msg?: string) => {
//     const finalMsg = msg || input;
//     if (!finalMsg.trim()) return;
//     const userMsg = { sender: "user", text: finalMsg };
//     const botReply = { sender: "bot", text: await handleCommand(finalMsg) };
//     setMessages(prev => [...prev, userMsg, botReply]);
//     setInput("");
//   };

//   return (
//     <div>
//       {/* 💬 Floating Button */}
//       <div
//         onClick={() => setOpen(!open)}
//         style={{
//           position: "fixed", bottom: "20px", left: "20px",
//           background: "#2c3e50", color: "#fff", borderRadius: "50%",
//           width: "60px", height: "60px", display: "flex",
//           alignItems: "center", justifyContent: "center",
//           fontSize: "28px", cursor: "pointer", zIndex: 9999
//         }}
//       >
//         💬
//       </div>

//       {/* 🪟 Chat Window */}
//       {open && (
//         <div
//           style={{
//             position: "fixed", bottom: "90px", left: "20px",
//             width: "320px", height: "420px", background: "#fff",
//             borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             display: "flex", flexDirection: "column",
//             overflow: "hidden", zIndex: 9999,
//           }}
//         >
//           <div style={{ background: "#2c3e50", color: "#fff", padding: "10px", fontWeight: "bold" }}>
//             Student Voice Assistant 🤖
//           </div>

//           <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
//             {messages.map((msg, i) => (
//               <div key={i} style={{ margin: "6px 0", textAlign: msg.sender === "user" ? "right" : "left" }}>
//                 <span
//                   style={{
//                     display: "inline-block", padding: "8px 12px",
//                     borderRadius: "12px",
//                     background: msg.sender === "user" ? "#3498db" : "#ecf0f1",
//                     color: msg.sender === "user" ? "#fff" : "#2c3e50",
//                     maxWidth: "80%"
//                   }}
//                 >
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Input + Mic */}
//           <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
//             <input
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && handleSend()}
//               style={{ flex: 1, border: "none", padding: "10px", outline: "none" }}
//               placeholder="Type or use mic..."
//             />
//             <button
//               onClick={() => handleSend()}
//               style={{ border: "none", background: "#3498db", color: "#fff", padding: "10px 15px" }}
//             >
//               ➤
//             </button>
//             <button
//               onClick={() => {
//                 if (recognition) {
//                   setListening(true);
//                   recognition.start();
//                 }
//               }}
//               style={{
//                 border: "none", background: listening ? "red" : "#2ecc71",
//                 color: "#fff", padding: "10px", marginLeft: "5px"
//               }}
//             >
//               🎤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// // 🟢 Extract BatchName (e.g. "21IT")
// // function extractBatchName(text: string): string | null {
// //   const match = text.match(/(21|22|23|24)\s?(it|cs|se|ce|ee|me|ai|bba|math|physics)/i);
// //   return match ? match[0].toUpperCase().replace(" ", "") : null;
// // }

// // // 🟢 Text-to-Speech
// // function speak(text: string) {
// //   const synth = window.speechSynthesis;
// //   const utter = new SpeechSynthesisUtterance(text);
// //   utter.lang = "en-US";
// //   synth.speak(utter);
// // }

//   // const [open, setOpen] = useState(false);
//   // const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   // const [input, setInput] = useState("");
//   // const router = useRouter();

//   // Load chat history
  

//   // 🧠 Handle Commands
//   const handleCommand = async (text: string) => {
//     const lowerText = text.toLowerCase();
//     const batchName = extractBatchName(lowerText);

//     // ==================== WEEKLY SCHEDULE ====================
//     if (lowerText.includes("class") || lowerText.includes("schedule")) {
//       if (!batchName) return "❌ Please mention batch (e.g. 21IT Tuesday classes).";

//       const res = await fetch(`/api/weeklyschedule?batchName=${batchName}`);
//       const data = await res.json();

//       if (!data || data.length === 0) return `❌ No schedule found for ${batchName}`;

//       // Detect Day (Monday-Friday)
//       const days = ["monday","tuesday","wednesday","thursday","friday"];
//       const askedDay = days.find(d => lowerText.includes(d));

//       if (askedDay) {
//         const dayClasses = data.filter((c: any) => c.DayOfWeek.toLowerCase() === askedDay);
//         if (dayClasses.length === 0) return `❌ No classes for ${batchName} on ${askedDay}`;
//         return dayClasses.map((c: any) =>
//           `📘 ${c.CourseName} - ${c.DayOfWeek} (${c.StartTime} - ${c.EndTime})`
//         ).join("\n");
//       }

//       // All Classes
//       if (lowerText.includes("all")) {
//         return data.map((c: any) =>
//           `📘 ${c.CourseName} - ${c.DayOfWeek} (${c.StartTime} - ${c.EndTime})`
//         ).join("\n");
//       }

//       // Next Class
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

    // // ==================== EXAMS ====================
    // if (lowerText.includes("exam") || lowerText.includes("paper") || lowerText.includes("imtihaan")) {
    //   if (!batchName) return "❌ Please mention batch (e.g. 21IT all exams).";

    //   const res = await fetch(`/api/exams?batchName=${batchName}`);
    //   const exams = await res.json();

    //   if (!exams || exams.length === 0) return `❌ No exams found for ${batchName}`;

    //   if (lowerText.includes("all")) {
    //     return exams.map((e: any) =>
    //       `📝 ${e.ExamType} - ${e.CourseName} on ${e.ExamDate} at ${e.ExamTime}`
    //     ).join("\n");
    //   }

    //   if (lowerText.includes("midterm")) {
    //     const mids = exams.filter((e: any) => e.ExamType.toLowerCase() === "midterm");
    //     if (mids.length === 0) return `❌ No midterm exams for ${batchName}`;
    //     return mids.map((e: any) =>
    //       `📝 Midterm - ${e.CourseName} on ${e.ExamDate} at ${e.ExamTime}`
    //     ).join("\n");
    //   }

    //   if (lowerText.includes("final")) {
    //     const finals = exams.filter((e: any) => e.ExamType.toLowerCase() === "final");
    //     if (finals.length === 0) return `❌ No final exams for ${batchName}`;
    //     return finals.map((e: any) =>
    //       `📝 Final - ${e.CourseName} on ${e.ExamDate} at ${e.ExamTime}`
    //     ).join("\n");
    //   }

    //   if (lowerText.includes("next")) {
    //     const now = new Date();
    //     const upcoming = exams.filter((e: any) => new Date(`${e.ExamDate}T${e.ExamTime}`) > now);
    //     if (upcoming.length > 0) {
    //       const next = upcoming[0];
    //       return `📖 Next Exam: ${next.CourseName} (${next.ExamType}) on ${next.ExamDate} at ${next.ExamTime}`;
    //     } else {
    //       return `✅ No upcoming exams for ${batchName}`;
    //     }
    //   }

    //   return `📅 Exams for ${batchName} (say "all exams", "next exam", "midterm exams", or "final exams")`;
    // }

//     // ==================== EVENTS ====================
//     if (lowerText.includes("event") || lowerText.includes("program") || lowerText.includes("activity")) {
//       if (!batchName) return "❌ Please mention batch (e.g. 21IT all events).";

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
//         const upcoming = events.filter((e: any) => new Date(`${e.EventDate}T${e.EventTime}`) > now);
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
//     if (lowerText.includes("home")) { router.push("/"); return "🏠 Navigating to Home Page."; }
//     if (lowerText.includes("about")) { router.push("/about"); return "ℹ️ About Page."; }
//     if (lowerText.includes("contact")) { router.push("/contact"); return "📞 Contact Page."; }

//     return "❌ Sorry, I didn’t understand that.";
//   };

//   // 🚀 Handle Send
  

// //   return (
// //     <div>
// //       {/* Floating Button */}
// //       <div
// //         onClick={() => setOpen(!open)}
// //         style={{
// //           position: "fixed", bottom: "20px", left: "20px",
// //           background: "#2c3e50", color: "#fff", borderRadius: "50%",
// //           width: "60px", height: "60px", display: "flex",
// //           alignItems: "center", justifyContent: "center",
// //           fontSize: "28px", cursor: "pointer", zIndex: 9999,
// //         }}
// //       >
// //         💬
// //       </div>

// //       {/* Chat Window */}
// //       {open && (
// //         <div
// //           style={{
// //             position: "fixed", bottom: "90px", left: "20px",
// //             width: "320px", height: "420px", background: "#fff",
// //             borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
// //             display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 9999,
// //           }}
// //         >
// //           <div style={{ background: "#2c3e50", color: "#fff", padding: "10px", fontWeight: "bold" }}>
// //             Student Support Chatbot 🤖
// //           </div>

// //           <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
// //             {messages.map((msg, i) => (
// //               <div key={i} style={{ margin: "6px 0", textAlign: msg.sender === "user" ? "right" : "left" }}>
// //                 <span
// //                   style={{
// //                     display: "inline-block", padding: "8px 12px", borderRadius: "12px",
// //                     background: msg.sender === "user" ? "#3498db" : "#ecf0f1",
// //                     color: msg.sender === "user" ? "#fff" : "#2c3e50",
// //                     maxWidth: "80%",
// //                   }}
// //                 >
// //                   {msg.text}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>

// //           <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
// //             <input
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //               style={{ flex: 1, border: "none", padding: "10px", outline: "none" }}
// //               placeholder="Type your message..."
// //             />
// //             <button
// //               onClick={handleSend}
// //               style={{ border: "none", background: "#3498db", color: "#fff", padding: "10px 15px", cursor: "pointer" }}
// //             >
// //               ➤
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

