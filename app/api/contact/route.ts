import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Always ensure string (Firestore null/undefined error avoid)
    await addDoc(collection(db, "contact"), {
      name: String(name || ""),
      email: String(email || ""),
      subject: String(subject || ""),
      message: String(message || ""),
      submitted_at: serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("🔥 Firestore Save Error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from 'next/server';
// import mysql from 'mysql2/promise';

// const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "", // change your MySQL password
//   database: "myproject",  // change your DB name
// };

// export async function POST(req: Request) {
//   try {
//     const { name, email, subject, message } = await req.json();

//     if (!name || !email || !subject || !message) {
//       return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
//     }

//     const connection = await mysql.createConnection(dbConfig);

//     await connection.execute(
//       'INSERT INTO contact (name, email, subject, message, submitted_at) VALUES (?, ?, ?, ?, NOW())',
//       [name, email, subject, message]
//     );

//     await connection.end();

//     return NextResponse.json({ message: 'Form submitted successfully!' });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Database error. Please try again.' }, { status: 500 });
//   }
// }
