"use client";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function useGetRecommended() {
  const session = useSession();
  const query = useQuery({
    queryKey: ["recommended"],

    queryFn: async () => {
      if (!session || session.status !== "authenticated") {
        throw Error("Session not present");
      }
      const response = await client.api.data["get-all"].$get();
      if (!response.ok) {
        throw Error(await response.text());
      }
      const parsed_data = ((await response.json()) ?? []) as {
        _id: string;
        name: string;
        email: string;
        image: string;
      }[];


      const res = await client.api.user.current.$get();
      if (!res.ok) {
        throw new Error(await res.text());
      }

      const user_data = await res.json();

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

      return status_mapped_parsed_data;
    },
  });
  return query;
}

export { useGetRecommended };
