import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name } = await req.json();

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { error: "Name must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ⏳ 30-day cooldown
    if (user.lastProfileUpdate) {
      const diff =
        (Date.now() - new Date(user.lastProfileUpdate)) /
        (1000 * 60 * 60 * 24);

      if (diff < 30) {
        return NextResponse.json(
          {
            error: `You can update your profile again after ${Math.ceil(
              30 - diff
            )} days.`,
          },
          { status: 403 }
        );
      }
    }

    user.name = name.trim();
    user.lastProfileUpdate = new Date();
    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        lastProfileUpdate: user.lastProfileUpdate,
      },
    });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
