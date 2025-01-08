"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { UserAvatar } from "@/components/user-avatar";

// Sample data for each tab

type tabSchema = {
  id: string;
  title: string;
  description: string;
  items: {
    _id: string;
    name: string;
    email: string;
    image: string;
  }[];
};
const tabData: tabSchema[] = [
  {
    id: "tab1",
    title: "Friends",
    description: "Content for Tab 1",
    items: [],
  },
  {
    id: "tab2",
    title: "Sent Requests",
    description: "Content for Tab 2",
    items: [],
  },
  {
    id: "tab3",
    title: "Incoming Requests",
    description: "Content for Tab 3",
    items: [],
  },
];

export function TabledPreview() {
  const [activeTab, setActiveTab] = React.useState(tabData[0].id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItem, setSelectedItem] = React.useState(tabData[0].items[0]);
  tabData[0].items =
    useQuery({
      queryKey: ["user_friends"],
      queryFn: async () => {
        const res = await client.api.friends["get-friends"].$get();
        if (!res.ok) {
          throw Error("Failed to fetch user_friends");
        }
        const data = await res.json();
        return data;
      },
    }).data ?? [];

  tabData[2].items =
    useQuery({
      queryKey: ["user_pending_requests"],
      queryFn: async () => {
        const res = await client.api.friends["get-pending"].$get();
        if (!res.ok) {
          throw Error("Failed to fetch user_pending_requests");
        }
        const data = await res.json();
        return data;
      },
    }).data ?? [];

  tabData[1].items =
    useQuery({
      queryKey: ["user_sent_request"],
      queryFn: async () => {
        const res = await client.api.friends["get-sent"].$get();
        if (!res.ok) {
          throw Error("Failed to fetch user_pending_requests");
        }
        const data = await res.json();
        return data;
      },
    }).data ?? [];

  return (
    <div className="p-4 w-full h-full flex flex-col lg:flex-row-reverse gap-4">
      {/* <Preview className="hidden w-full md:block h-1/2" item={selectedItem} /> */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-1/2 flex flex-col basis-1"
      >
        <TabsList className="grid w-full grid-cols-3">
          {tabData.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabData.map((tab) => (
          <TabsContent className="h-full" key={tab.id} value={tab.id}>
            <Card className="h-full overflow-y-auto">
              <CardHeader className="sticky top-0 bg-white border-border">
                <CardTitle>{tab.title}</CardTitle>
                <CardDescription>{tab.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tab.items.map((item) => (
                    <li
                      key={item._id}
                      className="cursor-pointer rounded p-2 hover:bg-accent flex items-center gap-2"
                      onClick={() => setSelectedItem(item)}
                    >
                      <UserAvatar
                        _email={item.email}
                        _image={item.image}
                        _name={item.name}
                      />
                      <div className="flex flex-col justify-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.email}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// function Preview({
//   item,
//   className,
// }: {
//   item: { name: string; description: string };
//   className?: string;
// }) {
//   return (
//     <Card className={cn("hidden md:block", className)}>
//       <CardHeader>
//         <CardTitle>Preview</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <h3 className="text-lg font-semibold">{item.name}</h3>
//         <p className="text-sm text-muted-foreground">{item.description}</p>
//       </CardContent>
//     </Card>
//   );
// }
