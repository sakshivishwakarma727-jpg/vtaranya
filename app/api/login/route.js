import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // -----------------------------
    // BACKEND VALIDATION
    //------------------------------
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // -----------------------------
    // CHECK USER
    // -----------------------------
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    // If future: email verification or blocked user
    if (user.status === "blocked") {
      return NextResponse.json(
        { error: "Your account is blocked" },
        { status: 403 }
      );
    }

    // -----------------------------
    // PASSWORD MATCH
    // -----------------------------
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // -----------------------------
    // CREATE JWT TOKEN
    // -----------------------------
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // -----------------------------
    // SEND COOKIE BACK
    // -----------------------------
    const res = NextResponse.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true, // protect from JS access
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
