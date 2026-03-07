"use client";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";


// Aushadham logo — pixel-faithful reproduction of Figma node 9:2232
function AushadhamLogo() {
    return (
        <div className="flex items-center gap-2 shrink-0">
            <svg
                width="60"
                height="52"
                viewBox="0 0 60 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* ── Floating medical icon bubbles above capsule ── */}
                {/* Stethoscope bubble */}
                <circle cx="12" cy="11" r="6.5" fill="#228573" />
                <path d="M9.5 10 C9.5 8 11 7 12 7 C13 7 14.5 8 14.5 10 C14.5 12 13 13 12 13" stroke="white" strokeWidth="1.1" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="14" r="1.2" fill="white" />

                {/* Pill bubble */}
                <circle cx="24" cy="6" r="6.5" fill="#228573" />
                <rect x="21" y="4.5" width="6" height="3" rx="1.5" fill="white" opacity="0.9" />

                {/* Lens/scope bubble */}
                <circle cx="37" cy="9" r="6.5" fill="#228573" />
                <circle cx="37" cy="9" r="3" fill="none" stroke="white" strokeWidth="1.2" />
                <line x1="37" y1="6.2" x2="37" y2="3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />

                {/* Leaf/herb bubble */}
                <circle cx="49" cy="14" r="6" fill="#228573" />
                <path d="M46.5 15.5 Q49 11.5 51.5 15.5 Q49 17 46.5 15.5Z" fill="white" opacity="0.9" />
                <line x1="49" y1="15.5" x2="49" y2="18.5" stroke="white" strokeWidth="1" strokeLinecap="round" />

                {/* ── Capsule body ── */}
                {/* Green left half */}
                <path
                    d="M30 21 L15 21 C9.477 21 5 25.477 5 31 C5 36.523 9.477 41 15 41 L30 41 Z"
                    fill="#228573"
                />
                {/* White right half */}
                <path
                    d="M30 21 L45 21 C50.523 21 55 25.477 55 31 C55 36.523 50.523 41 45 41 L30 41 Z"
                    fill="white"
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                />
                {/* Centre dividing line */}
                <line x1="30" y1="20" x2="30" y2="42" stroke="white" strokeWidth="2" />
            </svg>

            <span
                className="font-extrabold tracking-widest uppercase hidden sm:inline"
                style={{ color: "#228573", fontSize: "14px", letterSpacing: "0.14em" }}
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

                {/* Mobile Hamburger */}
                <button
                    className="lg:hidden text-[#228573]"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => {
                        const isActive = active === link.sectionId;
                        return (
                            <button
                                key={link.label}
                                onClick={() => { scrollToSection(link.sectionId); setMenuOpen(false); }}
                                className={`text-base font-semibold text-left transition-colors ${isActive ? "text-[#228573]" : "text-[rgba(6,91,75,0.55)]"
                                    }`}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                    <div className="flex gap-3 pt-2">
                        <a
                            href="/signup"
                            className="flex-1 py-2.5 rounded-full border border-gray-800 text-gray-900 text-sm font-semibold text-center"
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
    );
}
