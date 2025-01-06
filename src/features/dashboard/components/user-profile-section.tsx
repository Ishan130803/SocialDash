import { DottedSeparator } from "@/components/DottedSeparator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { PeopleYouMayKnowSection } from "./people-you-may-know";

async function UserProfileSection() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const avatarFallback = session?.user.name?.charAt(0) || "U";

  return (
    <>
      <section className="w-full pt-10">
        <div className="w-full grid grid-cols-1 gap-10 lg:grid-cols-2 place-items-center">
          <div>
            <Avatar className="rounded-xl size-36 transition border border-neutral-300">
              <AvatarImage
                className="rounded-xl"
                src={session.user.image ?? ""}
              />
              <AvatarFallback className="rounded-xl bg-neutral-200 text-3xl font-medium text-neutral-500 flex items-center justify-center">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col w-full h-full lg:justify-center">
            <h1 className="text-4xl md:4xl lg:6xl self-center">
              {session.user.name}
            </h1>
            <div className="contents group cursor-pointer select-none">
              <span className="self-center mt-4 font-semibold text-xl group-hover:text-blue-600 hover:cursor-pointer peer">
                {100}
              </span>
              <span className="self-center mt-0 group-hover:text-blue-700">
                Friends
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="p-7">
        <DottedSeparator />
      </div>
      <PeopleYouMayKnowSection />
    </>
  );
}

export { UserProfileSection };
