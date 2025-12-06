import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    console.log("TOKEN COOKIE:", tokenCookie);   // DEBUG

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ loggedIn: false });
    }

    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

    return NextResponse.json({
      loggedIn: true,
      userId: decoded.userId
    });

  } catch (err) {
    console.log("Token invalid:", err);
    return NextResponse.json({ loggedIn: false });
  }
}

