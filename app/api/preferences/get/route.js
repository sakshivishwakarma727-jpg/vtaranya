import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

      const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("preferences");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ SAFE DEFAULTS (IMPORTANT)
    const preferences = user.preferences || {
      theme: "light",
      language: "en",
    };

    return NextResponse.json(preferences, { status: 200 });
  } catch (err) {
    console.error("Preferences GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
