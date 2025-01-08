import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { UserSearch } from "./user-search";

export function Header() {
  return (
    <header className="min-w-0 flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <div className="contents lg:hidden">
          <MobileSidebar />
        </div>
        <h1 className="text-2xl font-bold">SocialDash</h1>
        <UserSearch className="w-64" placeholder="Searh..." type="search" />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>
        <div>
          <UserButton />
          <span className="sr-only">Profile</span>
        </div>
      </div>
    </header>
  );
}
