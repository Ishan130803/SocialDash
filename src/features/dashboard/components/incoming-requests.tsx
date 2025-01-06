iimport { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Trash2 } from "lucide-react";

const friendsData = [
  {
    _id: 1,
    name: "Alice",
    email: "jklajsdlfkj",
    image: "Just finished a great book!",
  },
  {
    _id: 2,
    name: "Bob",
    email: "jklajsdlfkj",
    image: "Check out my new photo album",
  },
  {
    _id: 3,
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: 1,
    name: "Alice",
    email: "jklajsdlfkj",
    image: "Just finished a great book!",
  },
  {
    _id: 2,
    name: "Bob",
    email: "jklajsdlfkj",
    image: "Check out my new photo album",
  },
  {
    _id: 3,
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: 1,
    name: "Alice",
    email: "jklajsdlfkj",
    image: "Just finished a great book!",
  },
  {
    _id: 2,
    name: "Bob",
    email: "jklajsdlfkj",
    image: "Check out my new photo album",
  },
  {
    _id: 3,
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: 1,
    name: "Alice",
    email: "jklajsdlfkj",
    image: "Just finished a great book!",
  },
  {
    _id: 2,
    name: "Bob",
    email: "jklajsdlfkj",
    image: "Check out my new photo album",
  },
  {
    _id: 3,
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
  {
    _id: 1,
    name: "Alice",
    email: "jklajsdlfkj",
    image: "Just finished a great book!",
  },
  {
    _id: 2,
    name: "Bob",
    email: "jklajsdlfkj",
    image: "Check out my new photo album",
  },
  {
    _id: 3,
    name: "Charlie",
    email: "jklajsdlfkj",
    image: "Who's up for a game night?",
  },
];

export async function IncomingRequestTable() {
  // const userId = (await getServerSession(authOptions))?.user.id;
  // if (!userId) {
  //   return null;
  // }
  // console.log(userId);
  // const userData = await getUserData(userId);
  // const userFriends = userData.data?.friends ?? [];
  // const friendsData = (await bulkGetBasicUserData(userFriends)).data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incoming Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {friendsData.map((friend) => (
            <li
              key={friend._id}
              className="border-b pb-2 last:border-b-0 flex items-center gap-3"
            >
              <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                <AvatarImage src={friend.image} />
                <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                  {"u"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <span>{friend.name}</span>
                <span>{friend.email}</span>
              </div>
              <div className="w-full"></div>
              <div className="hover:bg-neutral-200 p-2 rounded-md cursor-pointer group relative">
                <Trash2 className="" />
                <span className="absolute hidden opacity-0 group-hover:block group-hover:opacity-100 transition bg-secondary right-20 text-nowrap top-2 py-1 px-2">
                  Delete Request
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
