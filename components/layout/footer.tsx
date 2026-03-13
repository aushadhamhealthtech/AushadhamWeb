import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

// Reusable pill logo for footer — matches Figma design
function FooterLogo() {
    return (
        <svg width="56" height="44" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Floating dots */}
            <circle cx="15" cy="13" r="2.2" fill="#7dd8c9" />
            <circle cx="22" cy="7"  r="3.4" fill="#7dd8c9" />
            <circle cx="30" cy="4"  r="2.6" fill="#7dd8c9" />
            <circle cx="38" cy="8"  r="2.0" fill="#7dd8c9" />
            <circle cx="43" cy="14" r="1.5" fill="#7dd8c9" opacity="0.7" />
            {/* Left teal half */}
            <path d="M28 21 L14 21 C8.477 21 4 25.477 4 31 C4 36.523 8.477 41 14 41 L28 41 Z" fill="#3aa692" />
            {/* Right translucent half */}
            <path d="M28 21 L42 21 C47.523 21 52 25.477 52 31 C52 36.523 47.523 41 42 41 L28 41 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <line x1="28" y1="20" x2="28" y2="42" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
        </svg>
    );
}

const footerColumns = [
    {
        heading: "For Doctors / Dietitians",
        links: [
            { label: "Features", href: "#" },
            { label: "Sign-up", href: "/signup" },
            { label: "Login", href: "/signin" },
            { label: "Request Call back", href: "#" },
        ],
    },
    {
        heading: "For Clinics",
        links: [
            { label: "Features", href: "#" },
            { label: "Sign-up", href: "/signup" },
            { label: "Login", href: "/signin" },
            { label: "Request Call back", href: "#" },
        ],
    },
    {
        heading: "Aushadham",
        links: [
            { label: "About us", href: "#mission" },
            { label: "Contact us", href: "#" },
            { label: "Location", href: "#" },
            { label: "Terms and Conditions", href: "#" },
            { label: "Privacy Policy", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "#1f5f4a" }}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[121px] py-16">
                {/* Main grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>

                    {/* Logo + brand */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <div className="flex flex-col items-start gap-1">
                            <FooterLogo />
                            <span className="font-extrabold tracking-widest uppercase mt-1" style={{ color: "#7dd8c9", fontSize: "13px", letterSpacing: "0.15em" }}>
                                AUSHADHAM
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "160px" }}>
                            Your trusted healthcare companion.
                        </p>
                    </div>

                    {/* Dynamic link columns */}
                    {footerColumns.map((col) => (
                        <div key={col.heading} className="flex flex-col gap-3">
                            <h4 className="text-[15px] font-bold mb-1" style={{ color: "white" }}>{col.heading}</h4>
                            {col.links.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm transition-colors duration-200 hover:underline text-[rgba(255,255,255,0.65)] hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    ))}

                    {/* Login / Signup column */}
                    <div className="flex flex-col gap-3 justify-start">
                        <h4 className="text-[15px] font-bold mb-1" style={{ color: "white" }}>Get Started</h4>
                        <Link
                            href="/signin"
                            className="px-5 py-2.5 rounded-full text-white text-sm font-semibold text-center transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: "#3aa692" }}
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 rounded-full text-sm font-semibold text-center transition-all duration-200 hover:opacity-90"
                            style={{ border: "2px solid rgba(255,255,255,0.6)", color: "white" }}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>Follow us:</span>
                        <div className="flex items-center gap-3">
                            {[
                                { Icon: Facebook, label: "Facebook", href: "#" },
                                { Icon: Instagram, label: "Instagram", href: "#" },
                                { Icon: Twitter, label: "Twitter", href: "#" },
                                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                            ].map(({ Icon, label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ${label}`}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:opacity-90"
                                    style={{ backgroundColor: "#228573" }}
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                        © {new Date().getFullYear()} Aushadham. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
