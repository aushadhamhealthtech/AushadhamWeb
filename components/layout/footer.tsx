import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import AushadhamLogo from "@/components/ui/logo";

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
            <div className="max-w-360 mx-auto px-6 lg:px-30.25 py-16">
                {/* Main grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>

                    {/* Logo + brand */}
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <AushadhamLogo variant="footer" size="lg" />
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
