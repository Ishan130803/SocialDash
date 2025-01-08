"use client";

import {
  ChangeEvent,
  ComponentProps,
  PropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { UserAvatar } from "./user-avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "./use-debounce";
import { client } from "@/lib/rpc";

// {
//   _id: "asdfdf",
//   _name: "Ishan",
//   _email: "Ishan 130803@gmail.com",
//   _image: "",
// },
type UserSearchProps = PropsWithoutRef<ComponentProps<typeof Input>>;
function UserSearch({ ...props }: UserSearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocussed, setIsFocussed] = useState(false);
  const queryClient = useQueryClient();
  const debounced_value = useDebounce(searchValue.trim(), 400);
  const user_data =
    useQuery({
      queryKey: ["search_recommendations"],
      queryFn: async () => {
        const res = await client.api.data.search.$get({
          query: {
            q: debounced_value,
            limit: 6,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to search");
        }
        return await res.json();
      },
    }).data ?? [];
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["search_recommendations"] });
    console.log("Debounded", debounced_value);
  }, [debounced_value]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(() => e.target.value);
  };
  return (
    <>
      <div className="size-fit relative">
        <Input
          {...props}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
          onChange={onChangeHandler}
          value={searchValue}
        />
        {isFocussed && (
          <Card className="absolute z-50  mt-4 w-96 min-h-20 flex flex-col text-sans">
            <CardHeader className="font-medium text-xl">
              {searchValue.length ? (
                user_data.length ? (
                  "Search Result"
                ) : (
                  "No Results Found"
                )
              ) : (
                <span className="text-center">Search friends...</span>
              )}
            </CardHeader>
            {user_data.length !== 0 && (
              <CardContent>
                {user_data
                  ? user_data.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center p-2 gap-2 hover:bg-neutral-100 rounded-lg"
                      >
                        <UserAvatar
                          _email={item.email}
                          _image={item.image}
                          _name={item.name}
                        ></UserAvatar>
                        <div className="flex flex-col justify-center ">
                          <span>{item.name}</span>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    ))
                  : "No userdata"}
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </>
  );
}

export { UserSearch };
