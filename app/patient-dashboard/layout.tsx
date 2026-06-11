"use client";
import { UserProvider } from "@/lib/context/user";
import Sidebar from "@/components/layout/sidebar";

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider role="patient" fallback={{ name: "Ritika Shah", email: "" }}>
      <Sidebar />
      {children}
    </UserProvider>
  );
}
