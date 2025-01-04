
import Dashboard from "@/components/dashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession()
  if (!session) {
    redirect("/sign-in")
  }
  return <Dashboard />;
}

export default Page;
