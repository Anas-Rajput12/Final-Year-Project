// // File: /app/api/scholarships/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { createConnection } from "../../../lib/db";

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const title = url.searchParams.get("title"); // e.g., merit or need-based

//     let query = "SELECT id, title, description, deadline, slug, createdAt FROM scholarships";
//     const values: string[] = [];

//     if (title) {
//       query += " WHERE title = ?";
//       values.push(title);
//     }

//     query += " ORDER BY deadline ASC";

//     const connection = await createConnection();
//     const [rows] = await connection.query(query, values);

//     return NextResponse.json(rows);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Database error" }, { status: 500 });
//   }
// }
// File: /app/api/scholarships/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase"; // your Firestore instance
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  CollectionReference,
  DocumentData,
  Query,
} from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const title = url.searchParams.get("title"); // e.g., merit or need-based

    const scholarshipsRef: CollectionReference<DocumentData> = collection(db, "scholarships");
    let q: Query<DocumentData> = scholarshipsRef;

    if (title) {
      q = query(scholarshipsRef, where("title", "==", title), orderBy("deadline"));
    } else {
      q = query(scholarshipsRef, orderBy("deadline"));
    }

    const snapshot = await getDocs(q);

    const scholarships = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(scholarships);
  } catch (err) {
    console.error("❌ Error fetching scholarships:", err);
    return NextResponse.json({ error: "Failed to fetch scholarships" }, { status: 500 });
  }
}
