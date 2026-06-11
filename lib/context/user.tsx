"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

export type UserRole = "doctor" | "patient" | "guest";

type UserFallback = { name: string; email: string };

type UserState = {
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  displayName: string; // "Dr. Firstname Lastname" for doctors, "Firstname Lastname" for patients
  isLoaded: boolean;
};

const UserContext = createContext<UserState | null>(null);

function deriveInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export function UserProvider({
  role,
  fallback = { name: "", email: "" },
  children,
}: {
  role: UserRole;
  fallback?: UserFallback;
  children: ReactNode;
}) {
  const { data: session, isPending } = useSession();

  const name = session?.user?.name ?? fallback.name;
  const email = session?.user?.email ?? fallback.email;
  const initials = deriveInitials(name) || "?";
  const displayName = role === "doctor" && name ? `Dr. ${name}` : name;

  return (
    <UserContext.Provider
      value={{ name, email, initials, role, displayName, isLoaded: !isPending }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserState {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
