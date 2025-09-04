// import { NextResponse } from "next/server";
// import { db } from "../../../lib/firebase";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const batchName = searchParams.get("batchName");  // e.g. 21IT
//     const deptId = searchParams.get("deptId");        // optional
//     const eventName = searchParams.get("eventName");  // search specific

//     let query = `
//       SELECT e.*, b.BatchName, d.DepartmentName
//       FROM Events e
//       JOIN Batches b ON e.BatchID = b.BatchID
//       JOIN Departments d ON e.DepartmentID = d.DepartmentID
//     `;

//     let where: string[] = [];
//     let values: any[] = [];

//     if (batchName) {
//       where.push("b.BatchName = ?");
//       values.push(batchName);
//     }
//     if (deptId) {
//       where.push("d.DepartmentID = ?");
//       values.push(deptId);
//     }
//     if (eventName) {
//       where.push("e.EventName LIKE ?");
//       values.push(`%${eventName}%`);
//     }

//     if (where.length > 0) query += " WHERE " + where.join(" AND ");

//     query += " ORDER BY e.EventDate, e.EventTime";

//     // const connection = await db();
//     const [rows] = await db().query(query, values);
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const batchName = searchParams.get("batchName"); // e.g. "21IT"

    if (!batchName) {
      return NextResponse.json(
        { error: "batchName is required" },
        { status: 400 }
      );
    }

    // Step 1: Get BatchID + DepartmentID
    const batchQuery = query(
      collection(db, "batches"),
      where("BatchName", "==", batchName)
    );
    const batchSnap = await getDocs(batchQuery);

    if (batchSnap.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const batchDoc = batchSnap.docs[0].data();
    const batchId = batchDoc.BatchID;
    const deptId = batchDoc.DepartmentID;

    // Step 2: Get Events
    const eventsQuery = query(
      collection(db, "events"),
      where("BatchID", "==", batchId),
      where("DepartmentID", "==", deptId)
    );
    const snapshot = await getDocs(eventsQuery);

    // Step 3: Map + remove duplicates
    const seen = new Set<string>();
    const events = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        const dateObj = data.EventDate?.toDate ? data.EventDate.toDate() : null;

        return {
          id: doc.id,
          EventName: data.EventName || "No Name",
          EventDate: dateObj,
          EventTime: data.EventTime || "00:00",
          Description: data.Description || "",
          BatchID: data.BatchID,
          DepartmentID: data.DepartmentID,
        };
      })
      .filter((event) => {
        // unique key bana lo (EventName+Date+Time)
        const key = `${event.EventName}-${event.EventDate?.toISOString?.() || "nodate"}-${event.EventTime}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    return NextResponse.json(events);
  } catch (error: any) {
    console.error("❌ Firestore error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}
