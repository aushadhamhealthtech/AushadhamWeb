"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarClock, Search, Pill, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: Home,          href: "/patient-dashboard",             label: "Home"         },
  { icon: CalendarClock, href: "/patient-dashboard/appointments", label: "Appointments" },
  { icon: Search,        href: "/patient-dashboard/search",       label: "Search"       },
  { icon: Pill,          href: "/patient-dashboard/prescription", label: "Rx"           },
  { icon: Settings,      href: "/patient-dashboard/settings",     label: "Settings"     },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 inset-x-0 z-50 flex lg:hidden border-t border-gray-200 bg-white"
    >
      {ITEMS.map(({ icon: Icon, href, label }) => {
        const isActive =
          href === "/patient-dashboard" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors",
              isActive ? "text-teal-700" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.6} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
