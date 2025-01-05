import { Button } from "@/components/ui/button";
import Link from "next/link";

type SidebarProps = {
  navItems: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    label: string;
    href: string;
  }[];
};

export function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-background border-r h-full">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href ?? "#"}
            className="contents w-full"
          >
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-neutral-200"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
