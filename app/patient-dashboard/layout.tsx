"use client";

import { UserProvider } from "@/lib/context/user";

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider role="patient" fallback={{ name: "Ritika Shah", email: "" }}>
      {children}
    </UserProvider>
  );
}
