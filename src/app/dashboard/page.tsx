import { FriendsSection } from "@/features/dashboard/components/friends-section";
import { UserProfileSection } from "@/features/dashboard/components/user-profile-section";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type routeParams = {
  searchParams: {
    page: string;
  };
};

async function Page({ searchParams: { page } }: routeParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  console.log(page);
  if (page === "friends") {
    return <FriendsSection />;
  }
  return <UserProfileSection />;
}

export default Page;
