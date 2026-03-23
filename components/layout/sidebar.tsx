"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Home,
  CalendarDays,
  Users,
  ClipboardList,
  Bell,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Search, href: "/search", label: "Search" },
  { icon: Home, href: "/patient-dashboard", label: "Dashboard" },
  { icon: CalendarDays, href: "/appointments", label: "Appointments" },
  { icon: Users, href: "/doctors", label: "Doctors" },
  { icon: ClipboardList, href: "/prescriptions", label: "Prescriptions" },
  { icon: Bell, href: "/notifications", label: "Notifications" },
  { icon: MessageCircle, href: "/messages", label: "Messages" },
];

const BOTTOM_ITEMS = [
  { icon: Settings, href: "/settings", label: "Settings" },
  { icon: LogOut, href: "/logout", label: "Logout" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-16 flex-col items-center border-r border-border bg-white py-4 lg:flex">
      {/* Logo */}
      <Link href="/" className="mb-6">
        <svg width="32" height="32" viewBox="0 0 68 46" fill="none">
          <circle cx="22" cy="8" r="2.8" fill="#228573" />
          <circle cx="30" cy="3" r="3.8" fill="#228573" />
          <circle cx="39" cy="5" r="2.4" fill="#228573" />
          <circle cx="46" cy="11" r="1.8" fill="#228573" opacity={0.75} />
          <path
            d="M34 18 H16 C9.373 18 4 23.373 4 30 C4 36.627 9.373 42 16 42 H34 Z"
            fill="#228573"
          />
          <path
            d="M34 18 H52 C58.627 18 64 23.373 64 30 C64 36.627 58.627 42 52 42 H34 Z"
            fill="#e8e8e8"
            stroke="#c8c8c8"
            strokeWidth="1"
          />
          <line x1="34" y1="17" x2="34" y2="43" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </Link>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {NAV_ITEMS.map(({ icon: Icon, href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                isActive
                  ? "bg-[#e8f5f2] text-[#065b4b]"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="my-2">
        <button
          title="Toggle sidebar"
          className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:text-gray-600"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col items-center gap-1 border-t border-border pt-3">
        {/* Avatar */}
        <div className="mb-1 h-8 w-8 overflow-hidden rounded-full bg-[#e8f5f2]">
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-[#065b4b]">
            P
          </div>
        </div>
        {BOTTOM_ITEMS.map(({ icon: Icon, href, label }) => (
          <Link
            key={href}
            href={href}
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
          >
            <Icon size={20} strokeWidth={1.8} />
          </Link>
        ))}
      </div>
    </aside>
  );
}
