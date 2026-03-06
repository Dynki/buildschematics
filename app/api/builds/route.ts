import { NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
    }

    const body = await req.json();
    const { title, structure, difficulty, estimatedTime, survivalFriendly, requiresResourcePack, videoUrl, materials, description, images } = body;

    if (!title || !structure || !difficulty) {
      return NextResponse.json({ error: "Title, structure and difficulty are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("buildschematics");

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    await db.collection("builds").insertOne({
      title,
      slug,
      structure,
      difficulty,
      estimatedTime: estimatedTime || "",
      survivalFriendly: Boolean(survivalFriendly),
      requiresResourcePack: Boolean(requiresResourcePack),
      videoUrl: videoUrl || null,
      materials: Array.isArray(materials) ? materials : [],
      images: Array.isArray(images) ? images : [],
      description: description || "",
      submittedBy: session.user.id,
      submittedAt: new Date(),
      approved: true,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Build submit error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("buildschematics");

    const build = await db.collection("builds").findOne({ slug });
    if (!build) {
      return NextResponse.json({ error: "Build not found." }, { status: 404 });
    }

    // Only the submitter can delete their own build
    if (build.submittedBy !== session.user.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    await db.collection("builds").deleteOne({ slug });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Build delete error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
