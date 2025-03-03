"use client";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { client } from "@/lib/rpc";
// import { signOut } from "@/lib/auth-server-actions";
import { LogOut } from "lucide-react";
import {  useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserButton() {
  const session = useSession();
  const avatarFallback = session?.data?.user.name?.charAt(0) || "U";
  const name = session.data?.user.name || "User";
  const email = session.data?.user.email || "user@mail.com";
  const router = useRouter();
  const logoutHandler = async () => {
    await client.api.user.logout.$post()
    router.refresh();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarImage src={session.data?.user.image ?? ""} />
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px]transition border border-neutral-300">
            <AvatarImage src={session.data?.user.image ?? ""} />
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1"></DottedSeparator>
        <DropdownMenuItem
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
          onClick={logoutHandler}
        >
          <LogOut className="Size-4 mr-2"></LogOut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserButton };
