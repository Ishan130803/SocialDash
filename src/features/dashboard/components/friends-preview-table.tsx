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
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

// Sample data for each tab
const tabData = [
  {
    id: "tab1",
    title: "Tab 1",
    description: "Content for Tab 1",
    items: [
      { id: 1, name: "Item 1", description: "Description for Item 1" },
      { id: 2, name: "Item 2", description: "Description for Item 2" },
      { id: 3, name: "Item 3", description: "Description for Item 3" },
      { id: 1, name: "Item 1", description: "Description for Item 1" },
      { id: 2, name: "Item 2", description: "Description for Item 2" },
      { id: 3, name: "Item 3", description: "Description for Item 3" },
      { id: 1, name: "Item 1", description: "Description for Item 1" },
      { id: 2, name: "Item 2", description: "Description for Item 2" },
      { id: 3, name: "Item 3", description: "Description for Item 3" },
    ],
  },
  {
    id: "tab2",
    title: "Tab 2",
    description: "Content for Tab 2",
    items: [
      { id: 4, name: "Item 4", description: "Description for Item 4" },
      { id: 5, name: "Item 5", description: "Description for Item 5" },
      { id: 6, name: "Item 6", description: "Description for Item 6" },
    ],
  },
  {
    id: "tab3",
    title: "Tab 3",
    description: "Content for Tab 3",
    items: [
      { id: 7, name: "Item 7", description: "Description for Item 7" },
      { id: 8, name: "Item 8", description: "Description for Item 8" },
      { id: 9, name: "Item 9", description: "Description for Item 9" },
    ],
  },
];

export function TabledPreview() {
  const [activeTab, setActiveTab] = React.useState(tabData[0].id);
  const [selectedItem, setSelectedItem] = React.useState(tabData[0].items[0]);
  const session = useSession()
  console.log(session)
  return (
    <div className="p-4 w-full h-full flex flex-col lg:flex-row-reverse gap-4">
      <Preview className="hidden w-full md:block h-1/2" item={selectedItem} />
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
                      key={item.id}
                      className="cursor-pointer rounded p-2 hover:bg-accent"
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.name}
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

function Preview({
  item,
  className,
}: {
  item: { name: string; description: string };
  className?: string;
}) {
  return (
    <Card className={cn("hidden md:block", className)}>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}
