"use client";

import type { View } from "./types";

export function PanelIllustration({ view }: { view: View }) {
    return (
        <svg viewBox="0 0 240 260" fill="none" className="w-full h-auto max-w-52.5">
            <circle cx="120" cy="130" r="108" fill="white" opacity="0.05" />
            <circle cx="120" cy="130" r="78"  fill="white" opacity="0.04" />

            {/* Heart-rate line (universal) */}
            <path d="M22 155 L56 155 L70 127 L87 184 L102 143 L116 155 L218 155"
                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />

            {view === "signin" && (
                <>
                    <path d="M79 60 C79 60 67 85 67 108 C67 128 79 138 95 138 C111 138 125 125 125 105 C125 83 111 68 111 68"
                        stroke="white" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.85" />
                    <circle cx="111" cy="61" r="11" fill="white" opacity="0.9" />
                    <circle cx="111" cy="61" r="6"  fill="#228573" />
                    <circle cx="79"  cy="60" r="5"  fill="white" opacity="0.7" />
                    <circle cx="83"  cy="46" r="5"  fill="white" opacity="0.7" />
                    <path d="M114 196 C114 196 97 189 97 204 C97 219 114 229 114 229 C114 229 131 219 131 204 C131 189 114 196 114 196Z"
                        fill="white" opacity="0.14" stroke="white" strokeWidth="1.5" />
                    <path d="M107 209 L112 215 L122 202" stroke="white" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </>
            )}

            {view === "signup" && (
                <>
                    <circle cx="120" cy="76" r="30" fill="white" opacity="0.11" stroke="white" strokeWidth="1.5" />
                    <circle cx="120" cy="68" r="18" fill="white" opacity="0.18" />
                    <path d="M87 111 C87 95 102 87 120 87 C138 87 153 95 153 111 L158 127 H82 Z"
                        fill="white" opacity="0.14" />
                    <rect x="154" y="46" width="8"  height="30" rx="4" fill="white" opacity="0.55" />
                    <rect x="141" y="58" width="30" height="8"  rx="4" fill="white" opacity="0.55" />
                </>
            )}

            {view === "doctor-onboarding" && (
                <>
                    <rect x="74"  y="45" width="92" height="112" rx="10" fill="white" opacity="0.09" stroke="white" strokeWidth="1.5" />
                    <rect x="94"  y="35" width="52" height="22"  rx="6"  fill="white" opacity="0.13" />
                    <path d="M89 79 h62 M89 94 h46 M89 109 h52 M89 124 h36"
                        stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.48" />
                    <text x="81" y="77" fontSize="9" fill="white" opacity="0.85"
                        fontFamily="Inter,sans-serif" fontWeight="700">Rx</text>
                    <path d="M148 155 C148 155 138 168 138 178 C138 187 144 191 151 191 C158 191 164 185 164 176 C164 165 157 157 157 157"
                        stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7" />
                    <circle cx="157" cy="153" r="8" fill="white" opacity="0.8" />
                    <circle cx="157" cy="153" r="4" fill="#228573" />
                </>
            )}

            {view === "forgot-password" && (
                <>
                    <rect x="58" y="72" width="124" height="90" rx="12" fill="white" opacity="0.10" stroke="white" strokeWidth="1.5" />
                    <path d="M58 84 L120 122 L182 84" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    <path d="M58 162 L94 130 M182 162 L146 130" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
                    <rect x="100" y="172" width="40" height="32" rx="8" fill="white" opacity="0.14" stroke="white" strokeWidth="1.5" />
                    <path d="M110 172 L110 161 C110 151 130 151 130 161 L130 172" stroke="white" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.65" />
                    <circle cx="120" cy="183" r="5.5" fill="#228573" opacity="0.9" />
                    <path d="M117.5 185.5 L117.5 196 L122.5 196 L122.5 185.5" fill="#228573" opacity="0.9" />
                    <path d="M162 60 L164 54 L166 60 L172 62 L166 64 L164 70 L162 64 L156 62 Z" fill="white" opacity="0.38" />
                    <path d="M68 178 L69.5 174 L71 178 L75 179.5 L71 181 L69.5 185 L68 181 L64 179.5 Z" fill="white" opacity="0.25" />
                    <path d="M136 108 L160 108 M152 100 L160 108 L152 116" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                </>
            )}

            {/* Floating pill capsule (top-right) */}
            <rect x="155" y="25" width="57" height="23" rx="11.5" fill="white" opacity="0.11" stroke="white" strokeWidth="1.4" />
            <rect x="155" y="25" width="28" height="23" rx="11.5" fill="white" opacity="0.1" />
            <line x1="183" y1="25" x2="183" y2="48" stroke="white" strokeWidth="1.2" opacity="0.4" />

            {/* Floating dots (animated via GSAP) */}
            <circle cx="40"  cy="202" r="4" fill="white" opacity="0.2"  className="auth-float" />
            <circle cx="200" cy="218" r="6" fill="white" opacity="0.15" className="auth-float" />
            <circle cx="218" cy="93"  r="3" fill="white" opacity="0.18" className="auth-float" />
            <circle cx="28"  cy="100" r="5" fill="white" opacity="0.13" className="auth-float" />
        </svg>
    );
}
