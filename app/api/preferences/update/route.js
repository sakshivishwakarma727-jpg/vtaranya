import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const { key, value } = await req.json();

      const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  await User.findByIdAndUpdate(id, {
    [`preferences.${key}`]: value
  });

  return Response.json({ success: true });
}
