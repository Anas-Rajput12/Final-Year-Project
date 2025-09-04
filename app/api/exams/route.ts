// import { NextResponse } from "next/server";
// import { createConnection } from "../../../lib/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const batchName = searchParams.get("batchName");  // e.g. 21IT
//     const deptId = searchParams.get("deptId");        // optional

//     let query = `
//       SELECT e.*, c.CourseName, b.BatchName, d.DepartmentName
//       FROM Exams e
//       JOIN Courses c ON e.CourseID = c.CourseID
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
//     if (where.length > 0) query += " WHERE " + where.join(" AND ");

//     query += " ORDER BY e.ExamDate, e.ExamTime";

//     const connection = await createConnection();
//     const [rows] = await connection.query(query, values);
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// File: /app/api/exams/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

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

    // Step 2: Get Exams
    const examsQuery = query(
      collection(db, "exams"),
      where("BatchID", "==", batchId),
      where("DepartmentID", "==", deptId)
    );
    const snapshot = await getDocs(examsQuery);

    // Step 3: Map exams
    const seen = new Set<string>();
    const exams = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const dateObj = data.ExamDate?.toDate ? data.ExamDate.toDate() : null;

        // ✅ Step 4: Fetch CourseName using CourseID
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
          ExamType: data.ExamType || "Exam",
          CourseName: courseName,
          ExamDate: dateObj ? dateObj.toISOString() : null,
          ExamTime: data.ExamTime || "00:00",
          BatchID: data.BatchID,
          DepartmentID: data.DepartmentID,
        };
      })
    );

    // Step 5: Remove duplicates
    const uniqueExams = exams.filter((exam) => {
      const key = `${exam.ExamType}-${exam.CourseName}-${exam.ExamDate || "nodate"}-${exam.ExamTime}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json(uniqueExams);
  } catch (error: any) {
    console.error("❌ Firestore error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch exams" },
      { status: 500 }
    );
  }
}
