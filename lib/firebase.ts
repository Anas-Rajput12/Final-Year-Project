// import mysql from "mysql2/promise";

// let connection;
// export const createConnection = async () => {
//     if(!connection) {
//         connection = await mysql.createConnection({
//             host: process.env.DATABASE_HOST,
//             user: process.env.DATABASE_USER,
//             password: process.env.DATABASE_PASSWORD,
//             database: process.env.DATABASE_NAME,
//         });
//     }
//     return connection;
// }


// lib/firebase.ts
// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase project config (yaha apna config lagao)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initialize in dev
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);


