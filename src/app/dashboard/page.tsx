import { FriendsSection } from "@/features/dashboard/components/friends-section";
import { UserProfileSection } from "@/features/dashboard/components/user-profile-section";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type routeParams = {
  searchParams: {
    page: string;
  };
};

async function Page({ searchParams: { page } }: routeParams) {
  const session = await auth()
  console.log("dashboard", session)
  if (!session) {
    redirect("/sign-in");
  }
  if (page === "friends") {
    return <FriendsSection />;
  }
  return <UserProfileSection />;
}

export default Page;
