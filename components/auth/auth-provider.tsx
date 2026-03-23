"use client";
import { ReactNode } from "react";
import { AuthModalProvider } from "@/lib/context/auth-modal";
// TODO: Re-enable AuthModal once better-auth is properly configured
// import AuthModal from "@/components/modals/auth-modal";

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <AuthModalProvider>
            {children}
            {/* <AuthModal /> */}
        </AuthModalProvider>
    );
}
