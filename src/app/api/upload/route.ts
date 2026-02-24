import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: JPEG, PNG, WebP, SVG" },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 5MB" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Sanitize filename: remove special chars, keep extension
  const ext = path.extname(file.name);
  const safeName = file.name
    .replace(ext, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .substring(0, 50);
  const filename = `${Date.now()}-${safeName}${ext}`;

  const uploadPath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
