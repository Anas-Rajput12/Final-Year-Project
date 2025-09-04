// import { NextResponse } from "next/server";
// import { createConnection } from "../../../lib/db";

// export async function GET() {
//   try{
//     const db = await createConnection()
//     const sql = "SELECT * FROM timetable"
//     const [timetable] = await db.query(sql)
//     return NextResponse.json(timetable)
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// File: /app/api/timetable/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import {
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

export async function GET() {
  try {
    const timetableRef: CollectionReference<DocumentData> = collection(db, "timetable");
    const snapshot = await getDocs(timetableRef);

    const timetable = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        course: data.course ?? "",
        day: data.day ?? "",
        room: data.room ?? "",
        time: data.time ?? null, // null ko safely handle kar liya
      };
    });

    return NextResponse.json(timetable);
  } catch (error: any) {
    console.error("❌ Error fetching timetable:", error);
    return NextResponse.json({ error: "Failed to fetch timetable" }, { status: 500 });
  }
}
