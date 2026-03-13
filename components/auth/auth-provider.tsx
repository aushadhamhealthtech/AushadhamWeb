"use client";
import { ReactNode } from "react";
import { AuthModalProvider } from "@/lib/context/auth-modal";
import AuthModal from "@/components/modals/auth-modal";

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <AuthModalProvider>
            {children}
            <AuthModal />
        </AuthModalProvider>
    );
}
