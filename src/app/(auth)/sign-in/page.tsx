import { SignInCard } from "@/features/auth/components/sign-in-card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SignInPage() {
  const session = await auth()
  if (session) {
    redirect("/dashboard");
  }

  return <SignInCard></SignInCard>;
}

export default SignInPage;
