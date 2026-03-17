/**
 * OnboardingLogo — shared brand logo used across all onboarding / profile-setup pages.
 *
 * Identical SVG to the one in auth-modal.tsx.  Keep the two in sync if the
 * brand asset ever changes (or consolidate into this file once auth-modal is
 * refactored to an app-router component).
 */
export function OnboardingLogo({ variant = "teal" }: { variant?: "teal" | "white" }) {
    const fill        = variant === "white" ? "white"                  : "#228573";
    const rightFill   = variant === "white" ? "rgba(255,255,255,0.28)" : "#e8e8e8";
    const rightStroke = variant === "white" ? "rgba(255,255,255,0.45)" : "#c8c8c8";
    const divider     = variant === "white" ? "rgba(255,255,255,0.55)" : "#ffffff";
    const textColor   = variant === "white" ? "white"                  : "#1f6f5a";

    return (
        <div className="flex flex-col items-center gap-0.5 shrink-0">
            <svg width="56" height="38" viewBox="0 0 68 46" fill="none">
                <circle cx="22" cy="8"  r="2.8" fill={fill} />
                <circle cx="30" cy="3"  r="3.8" fill={fill} />
                <circle cx="39" cy="5"  r="2.4" fill={fill} />
                <circle cx="46" cy="11" r="1.8" fill={fill} opacity="0.75" />
                <path d="M34 18 H16 C9.373 18 4 23.373 4 30 C4 36.627 9.373 42 16 42 H34 Z" fill={fill} />
                <path
                    d="M34 18 H52 C58.627 18 64 23.373 64 30 C64 36.627 58.627 42 52 42 H34 Z"
                    fill={rightFill} stroke={rightStroke} strokeWidth="1"
                />
                <line x1="34" y1="17" x2="34" y2="43" stroke={divider} strokeWidth="2" />
            </svg>
            <span
                className="font-extrabold tracking-widest uppercase"
                style={{ color: textColor, fontSize: "11px", letterSpacing: "0.18em" }}
            >
                AUSHADHAM
            </span>
        </div>
    );
}
