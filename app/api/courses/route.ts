// // File: /app/api/courses/route.ts
// import { NextResponse } from "next/server";
// import { createConnection } from "../../../lib/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const batchName = searchParams.get("batchName");  // e.g. 21IT
//     const deptId = searchParams.get("deptId");        // optional

//     let query = `
//       SELECT c.CourseID, c.CourseName, b.BatchName, d.DepartmentName
//       FROM Courses c
//       JOIN Batches b ON c.BatchID = b.BatchID
//       JOIN Departments d ON c.DepartmentID = d.DepartmentID
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
//     if (where.length > 0) query += " WHERE " + where.join(" AND ");

//     query += " ORDER BY c.CourseName";

//     const connection = await createConnection();
//     const [rows] = await connection.query(query, values);
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// File: /app/api/courses/route.ts
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

    // Step 1: Batch find karo
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

    // Step 2: Courses fetch karo
    const coursesQuery = query(
      collection(db, "courses"),
      where("BatchID", "==", batchId),
      where("DepartmentID", "==", deptId)
    );

    const snapshot = await getDocs(coursesQuery);

    // Unique filter by CourseID
    const seen = new Set<number>();
    const courses = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // Firestore ID rakho
          CourseID: data.CourseID,
          CourseName: data.CourseName || "Untitled",
          BatchID: data.BatchID,
          DepartmentID: data.DepartmentID,
        };
      })
      .filter((course) => {
        if (seen.has(course.CourseID)) return false;
        seen.add(course.CourseID);
        return true;
      });

    return NextResponse.json(courses);
  } catch (error: any) {
    console.error("❌ Firestore error (courses):", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
