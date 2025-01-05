import { DottedSeparator } from "@/components/DottedSeparator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { KnowPeopleBanner } from "./know-people-banner";

const knowPeopleList = [
  {
    _id: "1",
    name: "Alice",
    email: "jklajsdlfkj",
    image: "Just finished a great book!",
  },
  {
    _id: "2",
    name: "Bob",
    email: "jklajsdlfkj",
    image: "Check out my new photo album",
  },
  {
    _id: "3",
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: "3",
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: "3",
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: "3",
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: "3",
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: "3",
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
];

async function UserProfileSection() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return (
    <>
      <section className="w-full pt-10">
        <div className="w-full grid grid-cols-1 gap-10 lg:grid-cols-2 place-items-center">
          <div>
            <Image
              width={500}
              height={500}
              src={session.user.image ?? ""}
              alt="user's image"
              className="object-cover rounded-xl"
            ></Image>
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
          {knowPeopleList.map((item) => (
            <KnowPeopleBanner {...item} key={item._id} />
          ))}
        </div>
      </section>
    </>
  );
}

export { UserProfileSection };
