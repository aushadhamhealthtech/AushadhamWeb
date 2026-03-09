"use client";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";


// Aushadham logo — matches provided image: capsule + dots above, AUSHADHAM text below
function AushadhamLogo() {
    return (
        <div className="flex flex-col items-center gap-0.5 shrink-0">
            <svg
                width="68"
                height="46"
                viewBox="0 0 68 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 4 floating dots above the capsule — clustered above the left-center area */}
                <circle cx="22" cy="8"  r="2.8" fill="#228573" />
                <circle cx="30" cy="3"  r="3.8" fill="#228573" />
                <circle cx="39" cy="5"  r="2.4" fill="#228573" />
                <circle cx="46" cy="11" r="1.8" fill="#228573" opacity="0.75" />

                {/* Capsule left half — teal */}
                <path
                    d="M34 18 H16 C9.373 18 4 23.373 4 30 C4 36.627 9.373 42 16 42 H34 Z"
                    fill="#228573"
                />
                {/* Capsule right half — light gray/white */}
                <path
                    d="M34 18 H52 C58.627 18 64 23.373 64 30 C64 36.627 58.627 42 52 42 H34 Z"
                    fill="#e8e8e8"
                    stroke="#c8c8c8"
                    strokeWidth="1"
                />
                {/* Center dividing line */}
                <line x1="34" y1="17" x2="34" y2="43" stroke="#ffffff" strokeWidth="2" />
            </svg>

            <span
                className="font-extrabold tracking-widest uppercase"
                style={{ color: "#1f6f5a", fontSize: "13px", letterSpacing: "0.18em" }}
            >
                AUSHADHAM
            </span>
        </div>
    );
}


const navLinks = [
    { label: "Home", sectionId: "hero" },
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
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("hero");

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
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[99px] h-[76px] flex items-center justify-between">

                {/* Logo — scroll to top on click */}
                <button
                    onClick={() => scrollToSection("hero")}
                    className="flex items-center gap-2.5 shrink-0"
                    aria-label="Aushadham Home"
                >
                    <AushadhamLogo />
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

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <a
                        href="/signup"
                        className="px-6 py-2.5 rounded-full border border-gray-800 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center"
                    >
                        Sign up
                    </a>
                    <a
                        href="/signin"
                        className="px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200 shadow-sm inline-flex items-center justify-center hover:opacity-90"
                        style={{ backgroundColor: "#3aa692" }}
                    >
                        Sign in
                    </a>
                </div>

                {/* Mobile Hamburger — hidden on mobile (moved to fixed bottom bar) */}
                <button
                    className="hidden text-[#228573]"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: "#1f5f4a" }}>
                    {navLinks.map((link) => {
                        const isActive = active === link.sectionId;
                        return (
                            <button
                                key={link.label}
                                onClick={() => { scrollToSection(link.sectionId); setMenuOpen(false); }}
                                className={`text-base font-semibold text-left transition-colors ${isActive ? "text-[#7dd8c9]" : "text-white/70 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                    <div className="flex gap-3 pt-2">
                        <a
                            href="/signup"
                            className="flex-1 py-2.5 rounded-full border border-white/40 text-white text-sm font-semibold text-center"
                        >
                            Sign up
                        </a>
                        <a
                            href="/signin"
                            className="flex-1 py-2.5 rounded-full text-white text-sm font-semibold text-center"
                            style={{ backgroundColor: "#3aa692" }}
                        >
                            Sign in
                        </a>
                    </div>
                </div>
            )}
        </nav>

        {/* ── MOBILE BOTTOM NAV BAR ── */}
        <div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
            style={{ backgroundColor: "#1f5f4a" }}
        >
            {/* Nav links */}
            <div className="flex items-center gap-4">
                {navLinks.slice(0, 3).map((link) => {
                    const isActive = active === link.sectionId;
                    return (
                        <button
                            key={link.label}
                            onClick={() => scrollToSection(link.sectionId)}
                            className={`text-xs font-semibold transition-colors ${
                                isActive ? "text-[#7dd8c9]" : "text-white/60 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </button>
                    );
                })}
            </div>

            {/* Hamburger to open full menu */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                className="text-white"
            >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
        </div>
        </>
    );
}
