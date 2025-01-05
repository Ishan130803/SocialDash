import { SignInCard } from "@/features/auth/components/sign-in-card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return <SignInCard></SignInCard>;
}

export default SignInPage;
