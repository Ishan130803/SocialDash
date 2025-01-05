import { Sidebar } from "@/components/sidebar";
import { Home, Users } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard?page=home" },
  { icon: Users, label: "Friends", href : "/dashboard?page=friends" },
];

function DashboardSidebar() {
  return <Sidebar navItems={navItems} />;
}

export { DashboardSidebar };
