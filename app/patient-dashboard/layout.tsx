"use client";
import { UserProvider } from "@/lib/context/user";
import Sidebar from "@/components/layout/sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-nav";

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider role="patient" fallback={{ name: "Ritika Shah", email: "" }}>
      <Sidebar />
      <MobileBottomNav />
      <div className="pb-16 lg:pb-0">{children}</div>
    </UserProvider>
  );
}
