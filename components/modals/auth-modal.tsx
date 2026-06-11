"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal, flushSync } from "react-dom";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal";
import type { View } from "./auth-views/types";
import { LeftPanel } from "./auth-views/LeftPanel";
import { SignInView } from "./auth-views/SignInView";
import { SignUpView } from "./auth-views/SignUpView";
import { DoctorOnboardingView } from "./auth-views/DoctorOnboardingView";
import { ForgotPasswordView } from "./auth-views/ForgotPasswordView";

export default function AuthModal() {
    const { view, closeModal } = useAuthModal();
    const [currentView, setCurrentView] = useState<View>("signin");
    const [mounted, setMounted] = useState(false);
    const backdropRef = useRef<HTMLDivElement>(null);
    const modalRef    = useRef<HTMLDivElement>(null);
    const contentRef  = useRef<HTMLDivElement>(null);
    const router      = useRouter();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (view) setCurrentView(view as View);
    }, [view]);

    const isOpen = view !== null;

    // Open animation
    useEffect(() => {
        if (!isOpen || !backdropRef.current || !modalRef.current) return;
        gsap.fromTo(backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(modalRef.current,
            { scale: 0.91, opacity: 0, y: 22 },
            { scale: 1, opacity: 1, y: 0, duration: 0.48, ease: "back.out(1.5)", delay: 0.05 }
        );
        const modal = modalRef.current;
        gsap.from(modal.querySelectorAll(".auth-field"),
            { y: 13, opacity: 0, stagger: 0.065, duration: 0.42, delay: 0.32, overwrite: true }
        );
        gsap.fromTo(modal.querySelectorAll(".auth-cta"),
            { y: 11, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.72, clearProps: "opacity,transform", overwrite: true }
        );
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (!backdropRef.current || !modalRef.current) { closeModal(); return; }
        gsap.to(modalRef.current,    { scale: 0.94, opacity: 0, y: 14, duration: 0.22, ease: "power2.in" });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.26, delay: 0.06, onComplete: closeModal });
    }, [closeModal]);

    function handleAuthSuccess() {
        handleClose();
        router.refresh();
    }

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        if (isOpen) window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, handleClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Animated view switch
    function switchView(newView: View) {
        if (newView === currentView || !contentRef.current || !modalRef.current) {
            setCurrentView(newView);
            return;
        }

        const order: View[] = ["forgot-password", "signin", "signup", "doctor-onboarding"];
        const dir = order.indexOf(newView) > order.indexOf(currentView) ? 1 : -1;
        const EXIT_X  = -52 * dir;
        const ENTER_X =  52 * dir;

        const modal   = modalRef.current;
        const content = contentRef.current;

        const fromH = modal.offsetHeight;
        gsap.set(modal, { height: fromH, overflow: "hidden" });

        gsap.timeline({
            onComplete() {
                flushSync(() => setCurrentView(newView));

                modal.style.height = "auto";
                const toH = modal.offsetHeight;
                gsap.set(modal, { height: fromH });

                gsap.timeline({ onComplete: () => { gsap.set(modal, { clearProps: "height,overflow" }); } })
                    .to(modal, { height: toH, duration: 0.42, ease: "power2.inOut" })
                    .fromTo(content,
                        { x: ENTER_X, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.32, ease: "power3.out" },
                        "<"
                    )
                    .fromTo(modal.querySelectorAll(".auth-panel-text"),
                        { y: dir * 12, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
                        "<"
                    )
                    .fromTo(modal.querySelectorAll(".auth-panel-illustration"),
                        { opacity: 0, scale: 0.84, y: 8 },
                        { opacity: 1, scale: 1, y: 0, duration: 0.44, ease: "back.out(1.5)" },
                        "<"
                    )
                    .from(modal.querySelectorAll(".auth-field"),
                        { y: 10, opacity: 0, stagger: 0.05, duration: 0.32, overwrite: true },
                        "-=0.22"
                    )
                    .fromTo(modal.querySelectorAll(".auth-cta"),
                        { y: 8, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.28, clearProps: "opacity,transform", overwrite: true },
                        "-=0.05"
                    );
            },
        })
        .to(content, { x: EXIT_X, opacity: 0, duration: 0.2, ease: "power3.in" })
        .to(modal.querySelectorAll(".auth-panel-text"), { y: dir * -10, opacity: 0, duration: 0.18, ease: "power2.in" }, "<")
        .to(modal.querySelectorAll(".auth-panel-illustration"), { opacity: 0, scale: 0.84, y: 8, duration: 0.2, ease: "power2.in" }, "<");
    }

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
            aria-modal="true" role="dialog" aria-label="Aushadham authentication">

            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
                onClick={handleClose}
                aria-hidden
            />

            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-215 max-h-[92vh] flex rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 8px 32px rgba(0,0,0,0.16)" }}
                onClick={e => e.stopPropagation()}
            >
                <LeftPanel view={currentView === "doctor-onboarding" ? "signup" : currentView} />

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black/10 hover:scale-110 text-brand-dark/55"
                    aria-label="Close dialog"
                >
                    <X size={18} />
                </button>

                <div className="flex-1 bg-white overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                    <div className="min-h-full flex items-start lg:items-center justify-center px-7 py-7 md:px-10">
                        <div ref={contentRef} className="w-full max-w-100">
                            {currentView === "signin"            && <SignInView           onSwitch={switchView} onSuccess={handleAuthSuccess} />}
                            {currentView === "signup"            && <SignUpView            onSwitch={switchView} onSuccess={handleAuthSuccess} />}
                            {currentView === "doctor-onboarding" && <DoctorOnboardingView onSwitch={switchView} />}
                            {currentView === "forgot-password"   && <ForgotPasswordView   onSwitch={switchView} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
