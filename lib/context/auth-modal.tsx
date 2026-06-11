"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type AuthModalView = "signin" | "signup" | "doctor-onboarding" | "forgot-password" | null;

type AuthModalState = {
  view: AuthModalView;
  openModal: (view: Exclude<AuthModalView, null>) => void;
  closeModal: () => void;
};

const AuthModalContext = createContext<AuthModalState | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<AuthModalView>(null);
  return (
    <AuthModalContext.Provider
      value={{
        view,
        openModal: (v) => setView(v),
        closeModal: () => setView(null),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalState {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
