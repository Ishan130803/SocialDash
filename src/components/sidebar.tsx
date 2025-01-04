import { Home, Users, BarChart2, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Friends" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Settings, label: "Settings" },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-background border-r h-screen">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button key={item.label} variant="ghost" className="w-full justify-start">
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}

