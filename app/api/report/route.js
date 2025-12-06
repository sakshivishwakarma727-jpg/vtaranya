import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Report";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const contactOrEmail = formData.get("contactOrEmail");
    const issue = formData.get("issue");
    const description = formData.get("description");
    const law = formData.get("law");
    const lat = formData.get("lat");
    const lng = formData.get("lng");

    const file = formData.get("file");

    let mediaUrl = null;
    let mediaType = null;

    // FILE HANDLING
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      mediaUrl = `/uploads/${fileName}`;
      mediaType = file.type.startsWith("image") ? "image" : "video";
    }

    const newReport = await Report.create({
      name,
      contactOrEmail,
      issue,
      description,
      law,
      location: {
        lat: parseFloat(lat) || null,
        lng: parseFloat(lng) || null,
      },
      mediaUrl,
      mediaType,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Report submitted successfully!",
        trackingId: newReport._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error submitting report:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit report" },
      { status: 500 }
    );
  }
}
