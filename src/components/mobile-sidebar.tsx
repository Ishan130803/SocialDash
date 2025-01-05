"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/features/dashboard/components/sidebar";

function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"secondary"} className="lg:hidden">
          <MenuIcon
            className="size-4
           text-neutral-500"
          ></MenuIcon>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-5 w-fit">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
}

export { MobileSidebar };
