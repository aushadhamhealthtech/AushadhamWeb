"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import AushadhamLogo from "@/components/ui/logo";


const navLinks = [
    { label: "Home", sectionId: "hero" },
    { label: "Vision", sectionId: "vision" },
    { label: "How It Works", sectionId: "how-it-works" },
    { label: "Testimonials", sectionId: "testimonials" },
    { label: "Find Doctors", sectionId: "experts" },
];

function scrollToSection(id: string) {
    // "hero" → scroll to top
    if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    // Offset by navbar height (76px)
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
    const router = useRouter();
    const [active, setActive] = useState("hero");
    const [atBottom, setAtBottom] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { data: session, isPending } = useSession();

    // Close user dropdown on outside click
    useEffect(() => {
        if (!userMenuOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [userMenuOpen]);

    // Scroll-spy: watch which section is visible
    useEffect(() => {
        const sectionIds = navLinks.map((l) => l.sectionId).filter((id) => id !== "hero");
        const targets = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
        );

        targets.forEach((el) => observer.observe(el));

        // Also watch scroll position to set "hero" when at the very top
        const handleScroll = () => {
            if (window.scrollY < 120) setActive("hero");
            // Hide bottom bar when footer starts coming into view (400px before page bottom)
            const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
            const nowAtBottom = distFromBottom < 400;
            setAtBottom(prev => prev === nowAtBottom ? prev : nowAtBottom);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
        <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[99px] h-[76px] flex items-center justify-between">

                {/* Logo — scroll to top on click */}
                <button
                    onClick={() => scrollToSection("hero")}
                    className="flex items-center gap-2.5 shrink-0"
                    aria-label="Aushadham Home"
                >
                    <AushadhamLogo variant="teal" size="md" />
                </button>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = active === link.sectionId;
                        return (
                            <button
                                key={link.label}
                                onClick={() => scrollToSection(link.sectionId)}
                                className={`text-[15px] font-semibold tracking-tight transition-all duration-200 pb-1 ${isActive
                                    ? "border-b-2 text-[#065b4b]"
                                    : "text-[rgba(6,91,75,0.55)] hover:text-[#228573]"
                                    }`}
                                style={isActive ? { borderColor: "#228573", color: "#065b4b" } : {}}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                    <button
                        aria-label="Search"
                        className="transition-colors text-[rgba(6,91,75,0.55)] hover:text-[#228573]"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* CTA Buttons or User Menu */}
                <div className="hidden lg:flex items-center gap-4">
                    {!isPending && session ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                                style={{ color: "#228573" }}
                            >
                                {session.user?.name || session.user?.email}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <button
                                        onClick={async () => {
                                            await signOut();
                                            setUserMenuOpen(false);
                                            router.push("/");
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-lg first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="px-6 py-2.5 rounded-full border border-gray-800 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
                            >
                                Sign up
                            </button>
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200 shadow-sm inline-flex items-center justify-center hover:opacity-90"
                                style={{ backgroundColor: "#3aa692" }}
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>

            </div>

        </nav>

        {/* ── MOBILE BOTTOM NAV BAR ── */}
        <nav
            role="navigation"
            aria-label="Mobile navigation"
            className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-700 ease-in-out ${
                atBottom ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100 translate-y-0"
            }`}
            style={{ backgroundColor: "#1f5f4a" }}
        >
            {/* All nav links */}
            <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => scrollToSection(link.sectionId)}
                        className={`text-[11px] font-semibold transition-colors whitespace-nowrap ${
                            active === link.sectionId ? "text-[#7dd8c9]" : "text-white/70 hover:text-white"
                        }`}
                    >
                        {link.label}
                    </button>
                ))}
            </div>

            {/* Search icon */}
            <button
                aria-label="Search"
                className="text-white/80 hover:text-white transition-colors ml-3 shrink-0"
            >
                <Search size={20} />
            </button>
        </nav>
        </>
    );
}
