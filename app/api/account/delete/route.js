import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import DeletedUser from "@/models/Archeiveduser";

export async function DELETE() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🗄️ ARCHIVE USER FIRST
    const archived = await DeletedUser.create({
      originalUserId: user._id,
      name: user.name,
      email: user.email,
      reason: "User initiated account deletion",
    });

    if (!archived) {
      return NextResponse.json(
        { error: "Failed to archive user" },
        { status: 500 }
      );
    }

    // ❌ DELETE USER
    const deleted = await User.findByIdAndDelete(user._id);

    if (!deleted) {
      return NextResponse.json(
        { error: "User deletion failed" },
        { status: 500 }
      );
    }

    // 🍪 CLEAR COOKIE
    const res = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );

    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
