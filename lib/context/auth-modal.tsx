"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export type ModalView = "signin" | "signup" | "doctor-onboarding";

interface AuthModalCtx {
    view: ModalView | null;
    openSignIn: () => void;
    openSignUp: () => void;
    closeModal: () => void;
    goToView: (v: ModalView) => void;
}

const AuthModalContext = createContext<AuthModalCtx | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [view, setView] = useState<ModalView | null>(null);
    return (
        <AuthModalContext.Provider
            value={{
                view,
                openSignIn: () => setView("signin"),
                openSignUp: () => setView("signup"),
                closeModal: () => setView(null),
                goToView: setView,
            }}
        >
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error("useAuthModal must be used inside AuthModalProvider");
    return ctx;
}
