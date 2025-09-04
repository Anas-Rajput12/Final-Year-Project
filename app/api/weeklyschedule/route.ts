// // import { NextResponse } from "next/server";
// // import { createConnection } from "../../../lib/db";


// // export async function GET(req: Request) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const batchId = searchParams.get("batch"); // e.g. ?batch=1

// //     let query = `
// //       SELECT w.*, c.CourseName 
// //       FROM WeeklySchedule w 
// //       JOIN Courses c ON w.CourseID = c.CourseID
// //     `;
// //     let values: any[] = [];

// //     if (batchId) {
// //       query += " WHERE w.BatchID = ?";
// //       values.push(batchId);
// //     }

// //     const connection = await createConnection();
// //     const [rows] = await connection.query(query, values);
// //     return NextResponse.json(rows);
// //   } catch (error: any) {
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import { createConnection } from "../../../lib/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const batchName = searchParams.get("batchName");  // e.g. 21IT, 22CS
//     const deptId = searchParams.get("deptId");        // optional

//     let query = `
//       SELECT w.*, c.CourseName, b.BatchName, d.DepartmentName
//       FROM WeeklySchedule w
//       JOIN Courses c ON w.CourseID = c.CourseID
//       JOIN Batches b ON w.BatchID = b.BatchID
//       JOIN Departments d ON w.DepartmentID = d.DepartmentID
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

//     if (where.length > 0) {
//       query += " WHERE " + where.join(" AND ");
//     }

//     const connection = await createConnection();
//     const [rows] = await connection.query(query, values);
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// File: /app/api/weekly-schedule/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const batchName = searchParams.get("batchName"); // e.g. "21IT"
    console.log("👉 BatchName from query:", batchName);

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

    console.log("👉 Batch query size:", batchSnap.size);

    if (batchSnap.empty) {
      console.log("❌ No batch found for:", batchName);
      return NextResponse.json([], { status: 200 });
    }

    const batchDoc = batchSnap.docs[0].data();
    console.log("✅ Batch found:", batchDoc);

    const batchId = batchDoc.BatchID;
    const deptId = batchDoc.DepartmentID;

    // Step 2: Get Weekly Schedule
    const scheduleQuery = query(
      collection(db, "weeklyschedule"),
      where("BatchID", "==", batchId),
      where("DepartmentID", "==", deptId)
    );
    const scheduleSnap = await getDocs(scheduleQuery);

    console.log("👉 Weekly schedule size:", scheduleSnap.size);

    // Step 3: Map schedule data + fetch course name
    const schedules = await Promise.all(
      scheduleSnap.docs.map(async (docSnap) => {
        const data = docSnap.data();

        // 🔹 Step 3a: Fetch Course Name
        let courseName = "No Course";
        if (data.CourseID) {
          const courseQuery = query(
            collection(db, "courses"),
            where("CourseID", "==", data.CourseID),
            where("BatchID", "==", batchId),
            where("DepartmentID", "==", deptId)
          );
          const courseSnap = await getDocs(courseQuery);
          if (!courseSnap.empty) {
            courseName = courseSnap.docs[0].data().CourseName || "No Course";
          }
        }

        return {
          id: docSnap.id,
          ScheduleID: data.ScheduleID,
          CourseID: data.CourseID,
          CourseName: courseName, // ✅ Added CourseName
          DayOfWeek: data.DayOfWeek || "Unknown",
          StartTime: data.StartTime || "00:00",
          EndTime: data.EndTime || "00:00",
          BatchID: data.BatchID,
          DepartmentID: data.DepartmentID,
        };
      })
    );

    console.log("✅ Final schedules:", schedules);

    return NextResponse.json(schedules);
  } catch (error: any) {
    console.error("❌ Firestore error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch weekly schedule" },
      { status: 500 }
    );
  }
}
