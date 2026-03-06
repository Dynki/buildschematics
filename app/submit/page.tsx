import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SubmitForm from "./SubmitForm";

export const metadata = {
  title: "Submit a Build",
};

export default async function SubmitPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <SubmitForm />;
}
