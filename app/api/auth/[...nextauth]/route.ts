// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../../../sanity/lib/client";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const query = `*[_type == "student" && email == $email][0]`;
        const student = await client.fetch(query, { email: credentials?.email });

        if (!student) return null;

        const isValid = await bcrypt.compare(credentials!.password, student.password);
        if (!isValid) return null;

        return {
          id: student._id,
          name: student.name,
          email: student.email,
          rollNumber: student.rollNumber,
          department: student.department,
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  }
});

export { handler as GET, handler as POST };
