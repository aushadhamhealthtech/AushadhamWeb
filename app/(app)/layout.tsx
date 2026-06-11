"use client";

import Sidebar from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DateProvider } from "@/lib/DateContext";
import { UserProvider } from "@/lib/context/user";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider role="doctor" fallback={{ name: "Ritika Sahu", email: "ritika.sahu@aushadham.in" }}>
    <DateProvider>
      <TooltipProvider delayDuration={200}>
        <div className="flex h-screen overflow-hidden bg-gray-50 transition-all duration-200">
          {/* Fixed overlay sidebar */}
          <Sidebar />
          {/* Spacer keeps content from going under the collapsed sidebar */}
          <div className="w-20 shrink-0" />
          <div className="flex flex-col flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </TooltipProvider>
    </DateProvider>
    </UserProvider>
  );
}

