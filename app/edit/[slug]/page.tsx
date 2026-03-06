import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getBuildBySlugAsync } from "@/lib/utils";
import EditBuildForm from "./EditBuildForm";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `Edit Build` };
}

export default async function EditBuildPage({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const build = await getBuildBySlugAsync(params.slug);
  if (!build) notFound();

  // Only the build's owner can access this page
  if (build.submittedBy !== session.user.id) redirect(`/build/${params.slug}`);

  return <EditBuildForm build={build} />;
}
