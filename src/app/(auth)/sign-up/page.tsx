import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return <SignUpCard></SignUpCard>;
}

export default SignInPage;
