
import Dashboard from "@/components/dashboard";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession()
  console.log(session);
  return <Dashboard />;
}

export default Page;
