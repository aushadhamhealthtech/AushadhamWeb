type LogoVariant = "teal" | "white" | "footer";
type LogoSize = "sm" | "md" | "lg";

const VARIANTS = {
    teal: {
        fill: "#228573",
        rightFill: "#e8e8e8",
        rightStroke: "#c8c8c8",
        divider: "#ffffff",
        textColor: "#1f6f5a",
        dotOpacity: 0.75,
    },
    white: {
        fill: "white",
        rightFill: "rgba(255,255,255,0.28)",
        rightStroke: "rgba(255,255,255,0.45)",
        divider: "rgba(255,255,255,0.55)",
        textColor: "white",
        dotOpacity: 0.75,
    },
    footer: {
        fill: "#7dd8c9",
        rightFill: "rgba(255,255,255,0.12)",
        rightStroke: "rgba(255,255,255,0.4)",
        divider: "rgba(255,255,255,0.6)",
        textColor: "#7dd8c9",
        dotOpacity: 0.7,
    },
} as const;

const SIZES = {
    sm: { svgWidth: 60, svgHeight: 40, fontSize: "11px", letterSpacing: "0.18em" },
    md: { svgWidth: 68, svgHeight: 46, fontSize: "13px", letterSpacing: "0.18em" },
    lg: { svgWidth: 68, svgHeight: 46, fontSize: "13px", letterSpacing: "0.15em" },
} as const;

export default function AushadhamLogo({
    variant = "teal",
    size = "md",
}: {
    variant?: LogoVariant;
    size?: LogoSize;
}) {
    const v = VARIANTS[variant];
    const s = SIZES[size];

    return (
        <div className="flex flex-col items-center gap-0.5 shrink-0">
            <svg width={s.svgWidth} height={s.svgHeight} viewBox="0 0 68 46" fill="none">
                <circle cx="22" cy="8" r="2.8" fill={v.fill} />
                <circle cx="30" cy="3" r="3.8" fill={v.fill} />
                <circle cx="39" cy="5" r="2.4" fill={v.fill} />
                <circle cx="46" cy="11" r="1.8" fill={v.fill} opacity={v.dotOpacity} />
                <path d="M34 18 H16 C9.373 18 4 23.373 4 30 C4 36.627 9.373 42 16 42 H34 Z" fill={v.fill} />
                <path
                    d="M34 18 H52 C58.627 18 64 23.373 64 30 C64 36.627 58.627 42 52 42 H34 Z"
                    fill={v.rightFill}
                    stroke={v.rightStroke}
                    strokeWidth={variant === "footer" ? "1.5" : "1"}
                />
                <line x1="34" y1="17" x2="34" y2="43" stroke={v.divider} strokeWidth={variant === "footer" ? "1.8" : "2"} />
            </svg>
            <span
                className="font-extrabold tracking-widest uppercase"
                style={{ color: v.textColor, fontSize: s.fontSize, letterSpacing: s.letterSpacing }}
            >
                AUSHADHAM
            </span>
        </div>
    );
}
