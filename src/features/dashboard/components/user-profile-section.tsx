import { DottedSeparator } from "@/components/DottedSeparator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { KnowPeopleBanner } from "./know-people-banner";
import { client } from "@/lib/rpc";
import { getAllUsers, getUserData } from "@/features/api/actions";

async function UserProfileSection() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const curr_user_id = session.user.id;

  const avatarFallback = session?.user.name?.charAt(0) || "U";

  const user_ids = (await getAllUsers()).data;
  const response = await client.api.data["bulk-get"].$post({
    json: user_ids,
  });

  if (!response.ok) {
    return null;
  }
  const parsed_data = ((await response.json()).data ?? []) as {
    _id: string;
    name: string;
    email: string;
    image: string;
  }[];

  const user_data = (await getUserData(curr_user_id)).data as createdUser;
  const status_mapped_parsed_data = parsed_data.map((item) => {
    if (user_data.friends.includes(item._id)) {
      return { ...item, friend_status: 1 };
    } else if (user_data.sent_requests.includes(item._id)) {
      return { ...item, friend_status: 2 };
    } else if (user_data.pending_requests.includes(item._id)) {
      return { ...item, friend_status: 3 };
    } else {
      return { ...item, friend_status: 0 };
    }
  });

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
      <section className="max-w-full">
        <h2 className="mx-10 text-xl my-5 font-bold ">People you may know</h2>
        <div className="flex gap-2 overflow-x-scroll mx-10">
          {status_mapped_parsed_data.map((item) => (
            <KnowPeopleBanner {...item} key={item._id} />
          ))}
        </div>
      </section>
    </>
  );
}

export { UserProfileSection };
