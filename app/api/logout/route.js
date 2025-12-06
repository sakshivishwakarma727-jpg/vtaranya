import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", { expires: new Date(0), path: "/" });
  // redirect to landing
  res.headers.set("location", "/");
  return res;
}
