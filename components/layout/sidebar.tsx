"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/context/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Home,
  CalendarClock,
  Users,
  FileText,
  Pill,
  History,
  MessageCircle,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, href: "/patient-dashboard", label: "Home" },
  { icon: CalendarClock, href: "/patient-dashboard/appointments", label: "Appointments" },
  { icon: Users, href: "/patient-dashboard/health-profile", label: "Health Profile" },
  { icon: FileText, href: "/patient-dashboard/medical-reports", label: "Medical Reports" },
  { icon: Pill, href: "/patient-dashboard/prescription", label: "Prescription" },
  { icon: History, href: "/patient-dashboard/medical-history", label: "Medical History" },
  { icon: MessageCircle, href: "/patient-dashboard/messages", label: "Messages" },
];

export default function Sidebar() {
  const { name, initials } = useUser();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const isInteractiveTarget = (target: EventTarget | null) => {
    return target instanceof Element && Boolean(target.closest("[data-sidebar-interactive='true']"));
  };

  const handleSidebarClickCapture = (event: React.MouseEvent<HTMLElement>) => {
    const interactive = isInteractiveTarget(event.target);

    if (!expanded) {
      if (!interactive) {
        setExpanded(true);
      }
      return;
    }

    setExpanded(false);
  };

  return (
    <>
      {expanded && (
        <button
          type="button"
          data-sidebar-interactive="true"
          aria-label="Close sidebar overlay"
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-40 hidden bg-black/10 backdrop-blur-[2px] lg:block"
        />
      )}

      <aside
        onClickCapture={handleSidebarClickCapture}
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen overflow-hidden border-r border-gray-200 bg-[#f5f7f6] py-6 shadow-[4px_0_18px_rgba(0,0,0,0.06)] transition-all duration-200 lg:flex",
          expanded ? "w-[320px] px-5" : "w-20 px-3"
        )}
      >
        <div className="flex h-full w-full min-h-0 flex-col">
          <Link href="/" className={cn("mb-8 flex items-center", expanded ? "gap-3 px-2" : "justify-center") }>
            <svg width="40" height="28" viewBox="0 0 68 46" fill="none" className="shrink-0">
              <circle cx="22" cy="8" r="2.8" fill="#228573" />
              <circle cx="30" cy="3" r="3.8" fill="#228573" />
              <circle cx="39" cy="5" r="2.4" fill="#228573" />
              <circle cx="46" cy="11" r="1.8" fill="#228573" opacity={0.75} />
              <path d="M34 18 H16 C9.373 18 4 23.373 4 30 C4 36.627 9.373 42 16 42 H34 Z" fill="#228573" />
              <path d="M34 18 H52 C58.627 18 64 23.373 64 30 C64 36.627 58.627 42 52 42 H34 Z" fill="#f1f2f2" stroke="#c8c8c8" strokeWidth="1" />
              <line x1="34" y1="17" x2="34" y2="43" stroke="#ffffff" strokeWidth="2" />
            </svg>
            {expanded && (
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-[#157f72]">AUSHADHAM</p>
                <p className="text-sm font-semibold text-[#5c958c]">Hospital or clinic Name</p>
              </div>
            )}
          </Link>

          {expanded ? (
            <div className="relative mb-6 px-2">
              <Link
                href="/patient-dashboard/search"
                data-sidebar-interactive="true"
                aria-label="Search"
                className="flex h-11 items-center rounded-full border border-[#d7dfdd] bg-white pl-11 text-base text-gray-700"
              >
                <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <span className="text-gray-400">Search</span>
              </Link>
            </div>
          ) : (
            <Link
              href="/patient-dashboard/search"
              data-sidebar-interactive="true"
              title="Search"
              className="mb-6 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>
          )}

          <nav
            className={cn(
              "flex flex-1 min-h-0 flex-col",
              expanded ? "gap-1 overflow-y-auto pr-1" : "items-center gap-4"
            )}
          >
            {NAV_ITEMS.map(({ icon: Icon, href, label }) => {
              const isActive = href === "/patient-dashboard" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  data-sidebar-interactive="true"
                  title={label}
                  className={cn(
                    "transition-colors",
                    expanded
                      ? "flex items-center gap-3 rounded-full px-5 py-3"
                      : "flex h-12 w-12 items-center justify-center rounded-full",
                    isActive
                      ? "bg-[#179a8d] text-white"
                      : "text-[#202426] hover:bg-white"
                  )}
                >
                  <Icon size={expanded ? 23 : 21} strokeWidth={isActive ? 2 : 1.8} />
                  {expanded && <span className="text-lg font-medium leading-none">{label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className={cn("pt-6", expanded ? "" : "flex flex-col items-center gap-3") }>
            {expanded ? (
              <div className="mb-5 flex items-center gap-3 px-4">
                <Avatar className="h-11 w-11 border border-gray-200">
                  <AvatarImage src="/patient-priyanka.jpg" alt={name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xl font-semibold leading-none text-[#202426]">{name}</p>
                  <Badge className="mt-1 rounded-full bg-[#f0be57] px-3 py-0.5 text-xs font-medium text-[#3f3420] hover:bg-[#f0be57]">
                    XXXXXXXXXX
                  </Badge>
                </div>
              </div>
            ) : (
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src="/patient-priyanka.jpg" alt={name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            )}

            <Link
              href="/patient-dashboard/settings"
              data-sidebar-interactive="true"
              title="Settings"
              className={cn(
                "mb-2 transition-colors",
                expanded
                  ? "flex items-center gap-3 rounded-xl px-4 py-2 text-[#2f3436] hover:bg-white"
                  : "flex h-11 w-11 items-center justify-center rounded-xl text-gray-500 hover:bg-white"
              )}
            >
              <Settings size={22} strokeWidth={1.7} />
              {expanded && <span className="text-lg font-medium">Settings</span>}
            </Link>

            <Link
              href="/logout"
              data-sidebar-interactive="true"
              title="Log out"
              className={cn(
                "transition-colors",
                expanded
                  ? "flex items-center gap-3 rounded-xl px-4 py-2 text-[#b62525] hover:bg-white"
                  : "flex h-11 w-11 items-center justify-center rounded-xl text-[#b62525] hover:bg-white"
              )}
            >
              <LogOut size={22} strokeWidth={1.7} />
              {expanded && <span className="text-lg font-medium">Log out</span>}
            </Link>
          </div>
        </div>

      </aside>
    </>
  );
}
