import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

/* ================= GET ================= */
export async function GET() {
  try {
    await connectDB();

    // ✅ cookies() IS ASYNC
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("preferences");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      theme: user.preferences?.theme || "light",
    });
  } catch (err) {
    console.error("GET preferences error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ================= PUT ================= */
export async function PUT(req) {
  try {
    await connectDB();

    // ✅ cookies() IS ASYNC
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { theme } = await req.json();

    if (!["light", "dark"].includes(theme)) {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: { "preferences.theme": theme } },
      { new: true }
    ).select("preferences");

    return NextResponse.json({
      theme: user.preferences.theme,
    });
  } catch (err) {
    console.error("PUT preferences error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
