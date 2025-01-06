import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SignInPage() {
  const session = await auth()
  if (session) {
    redirect("/dashboard");
  }

  return <SignUpCard></SignUpCard>;
}

export default SignInPage;
