"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, Home, ListTodo, Menu, Users, FormInput } from "lucide-react"
import { Button } from "@repo/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@repo/components/ui/sheet"
import { cn } from "@repo/design-system/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    label: "Properties",
    icon: Building2,
    href: "/properties",
  },
  {
    label: "Clients",
    icon: Users,
    href: "/clients",
  },
  {
    label: "Tasks",
    icon: ListTodo,
    href: "/tasks",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    label: "Forms",
    icon: FormInput,
    href: "/forms",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">RealEstate CRM</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === route.href ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50",
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 border-r">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <h1 className="text-lg font-semibold">RealEstate CRM</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-4 space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === route.href ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50",
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

