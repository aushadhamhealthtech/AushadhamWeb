"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  CalendarDays,
  Users,
  ClipboardList,
  Bell,
  MessageCircle,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, href: "/patient-dashboard", label: "Dashboard" },
  { icon: CalendarDays, href: "/appointments", label: "Appointments" },
  { icon: Users, href: "/doctors", label: "Doctors" },
  { icon: ClipboardList, href: "/prescriptions", label: "Prescriptions" },
  { icon: Bell, href: "/notifications", label: "Notifications" },
  { icon: MessageCircle, href: "/messages", label: "Messages" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col items-center border-r border-gray-100 bg-white py-5 shadow-[4px_0_16px_rgba(0,0,0,0.05)] lg:flex">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center justify-center">
        <svg width="38" height="28" viewBox="0 0 68 46" fill="none">
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

      {/* Search button */}
      <button
        title="Search"
        className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
      >
        <Search size={18} strokeWidth={1.8} />
      </button>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col items-center gap-3">
        {NAV_ITEMS.map(({ icon: Icon, href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                isActive
                  ? "bg-[#e8f5f2] text-[#065b4b]"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2 : 1.6} />
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle — protrudes on the right edge */}
      <div className="relative my-3 w-full flex justify-end pr-0">
        <button
          title="Expand sidebar"
          className="absolute -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 shadow-md hover:text-gray-600"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col items-center gap-3 pt-3">
        {/* Avatar */}
        <div className="mb-1 h-11 w-11 overflow-hidden rounded-full border-2 border-gray-100">
          <Image
            src="/patient-priyanka.jpg"
            alt="Priyanka"
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Settings */}
        <Link
          href="/settings"
          title="Settings"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <Settings size={22} strokeWidth={1.6} />
        </Link>

        {/* Logout */}
        <Link
          href="/logout"
          title="Logout"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-red-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={22} strokeWidth={1.6} />
        </Link>
      </div>
    </aside>
  );
}
