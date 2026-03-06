import { NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("buildschematics");

    const docs = await db
      .collection("builds")
      .find({ submittedBy: session.user.id })
      .sort({ submittedAt: -1 })
      .toArray();

    const builds = docs.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      structure: doc.structure,
      styles: doc.styles ?? [],
      difficulty: doc.difficulty,
      survivalFriendly: Boolean(doc.survivalFriendly),
      estimatedTime: doc.estimatedTime ?? "",
      materials: doc.materials ?? [],
      images: doc.images ?? [],
      description: doc.description ?? "",
      steps: doc.steps ?? [],
      videoUrl: doc.videoUrl ?? undefined,
      requiresResourcePack: Boolean(doc.requiresResourcePack),
      submittedBy: doc.submittedBy,
      submittedAt: doc.submittedAt ?? null,
    }));

    return NextResponse.json({ builds });
  } catch (err) {
    console.error("my-builds fetch error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
