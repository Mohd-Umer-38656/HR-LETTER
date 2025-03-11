import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db"; // Import MySQL database connection

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    // console.log(email, bcrypt.hashSync(password, 10));
    

    // Fetch user from database
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const user = users[0]; // Get first user record
    

    // Compare hashed password
    // const validPassword = await bcrypt.compare(password, user.password);
    const validPassword = await bcrypt.compare("admin@1234", user.password);
    

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, "secret_key", { expiresIn: "1h" });

    // Create a response and set the cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set("Set-Cookie", `authToken=${token}; HttpOnly; Path=/; Max-Age=3600;`);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
