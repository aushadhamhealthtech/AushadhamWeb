"use client";

/**
 * Shared form primitives for all onboarding / profile-setup pages.
 *
 * PillInput      — single-line text / tel / number / email / date input
 * PillSelect     — single-select animated dropdown (detects viewport edge → opens upward)
 * PillMultiSelect — multi-select dropdown with chip tags
 */

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

/* ── Brand tokens (keep in sync with the C object in each page) ── */
const primary = "#065b4b";
const mid     = "#228573";
const mint    = "#e8f5f2";
const body    = "#3F4946";
const muted   = "rgba(6,91,75,0.5)";
const border  = "#e5e7eb";

/* ──────────────────────────────────────────────────────────────────
   PillInput
────────────────────────────────────────────────────────────────── */
export function PillInput({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = true,
    hint,
    rightIcon,
}: {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    required?: boolean;
    hint?: string;
    rightIcon?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-sm font-semibold" style={{ color: primary }}>
                    {label}
                    {required && <span className="ml-0.5" style={{ color: mid }}>*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="w-full px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                    style={{ borderColor: border, backgroundColor: "#fafffe", color: primary }}
                    onFocus={e => {
                        e.currentTarget.style.borderColor = mid;
                        e.currentTarget.style.boxShadow  = "0 0 0 3px rgba(34,133,115,0.12)";
                    }}
                    onBlur={e => {
                        e.currentTarget.style.borderColor = border;
                        e.currentTarget.style.boxShadow  = "none";
                    }}
                />
                {rightIcon && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: muted }}>
                        {rightIcon}
                    </span>
                )}
            </div>
            {hint && <p className="text-xs" style={{ color: muted }}>{hint}</p>}
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   PillSelect
────────────────────────────────────────────────────────────────── */
export function PillSelect({
    label,
    id,
    options,
    placeholder = "Select",
    required = true,
    value: controlledValue,
    onChange,
}: {
    label?: string;
    id: string;
    options: string[];
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}) {
    const [open,          setOpen]    = useState(false);
    const [openUp,        setOpenUp]  = useState(false);
    const [internalValue, setInternal] = useState("");
    const wrapRef = useRef<HTMLDivElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    /* Close on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* Detect whether to open upward */
    useEffect(() => {
        if (!open || !wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        setOpenUp(window.innerHeight - rect.bottom < 260);
    }, [open]);

    function choose(next: string) {
        if (onChange) onChange(next);
        else setInternal(next);
        setOpen(false);
    }

    return (
        <div className="flex flex-col gap-1.5" ref={wrapRef}>
            {label && (
                <label className="text-sm font-semibold" style={{ color: primary }}>
                    {label}
                    {required && <span className="ml-0.5" style={{ color: mid }}>*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(o => !o)}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                    style={{
                        borderColor:     open ? mid : border,
                        color:           value ? primary : muted,
                        backgroundColor: "#fafffe",
                        boxShadow:       open ? "0 0 0 3px rgba(34,133,115,0.12)" : "none",
                    }}
                >
                    <span>{value || placeholder}</span>
                    <ChevronDown
                        size={15}
                        style={{
                            color: mid,
                            transition: "transform 0.18s ease-out",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                </button>

                <ul
                    style={{
                        position:        "absolute",
                        zIndex:          60,
                        left:            0,
                        right:           0,
                        ...(openUp ? { bottom: "calc(100% + 6px)" } : { top: "calc(100% + 6px)" }),
                        borderRadius:    "1rem",
                        border:          `1px solid ${border}`,
                        backgroundColor: "#fafffe",
                        maxHeight:       "220px",
                        overflowY:       "auto",
                        boxShadow:       "0 8px 30px rgba(6,91,75,0.12)",
                        opacity:         open ? 1 : 0,
                        transform:       open
                            ? "translateY(0px) scale(1)"
                            : openUp
                                ? "translateY(6px) scale(0.98)"
                                : "translateY(-6px) scale(0.98)",
                        pointerEvents:   open ? "auto" : "none",
                        transition:      "opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)",
                        willChange:      "opacity, transform",
                    }}
                >
                    {options.map(o => (
                        <li
                            key={o}
                            onMouseDown={() => choose(o)}
                            style={{
                                padding:         "10px 20px",
                                fontSize:        "0.875rem",
                                cursor:          "pointer",
                                color:           o === value ? primary : body,
                                backgroundColor: o === value ? mint    : "transparent",
                                fontWeight:      o === value ? 600     : 400,
                                transition:      "background-color 0.1s",
                            }}
                            onMouseEnter={e => { if (o !== value) (e.currentTarget as HTMLElement).style.backgroundColor = mint; }}
                            onMouseLeave={e => { if (o !== value) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                        >
                            {o}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Hidden input keeps native form / required validation working */}
            <input type="hidden" name={id} id={id} value={value} required={required} />
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   PillMultiSelect
────────────────────────────────────────────────────────────────── */
export function PillMultiSelect({
    label,
    id,
    options,
    placeholder = "Select options",
    required = true,
}: {
    label: string;
    id: string;
    options: string[];
    placeholder?: string;
    required?: boolean;
}) {
    const [open,     setOpen]    = useState(false);
    const [openUp,   setOpenUp]  = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (!open || !wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        setOpenUp(window.innerHeight - rect.bottom < 260);
    }, [open]);

    function toggle(opt: string) {
        setSelected(prev => prev.includes(opt) ? prev.filter(v => v !== opt) : [...prev, opt]);
    }

    return (
        <div className="flex flex-col gap-1.5" ref={wrapRef}>
            <label className="text-sm font-semibold" style={{ color: primary }}>
                {label}
                {required && <span className="ml-0.5" style={{ color: mid }}>*</span>}
            </label>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(v => !v)}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                    style={{
                        borderColor:     open ? mid : border,
                        color:           selected.length ? primary : muted,
                        backgroundColor: "#fafffe",
                        boxShadow:       open ? "0 0 0 3px rgba(34,133,115,0.12)" : "none",
                    }}
                >
                    <span className="truncate text-left">
                        {selected.length ? selected.join(", ") : placeholder}
                    </span>
                    <ChevronDown
                        size={15}
                        style={{
                            color: mid,
                            transition: "transform 0.18s ease-out",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                </button>

                <ul
                    style={{
                        position:        "absolute",
                        zIndex:          60,
                        left:            0,
                        right:           0,
                        ...(openUp ? { bottom: "calc(100% + 6px)" } : { top: "calc(100% + 6px)" }),
                        borderRadius:    "1rem",
                        border:          `1px solid ${border}`,
                        backgroundColor: "#fafffe",
                        maxHeight:       "220px",
                        overflowY:       "auto",
                        boxShadow:       "0 8px 30px rgba(6,91,75,0.12)",
                        opacity:         open ? 1 : 0,
                        transform:       open
                            ? "translateY(0px) scale(1)"
                            : openUp
                                ? "translateY(6px) scale(0.98)"
                                : "translateY(-6px) scale(0.98)",
                        pointerEvents:   open ? "auto" : "none",
                        transition:      "opacity 0.22s cubic-bezier(0.22,1,0.36,1), transform 0.22s cubic-bezier(0.22,1,0.36,1)",
                    }}
                >
                    {options.map(opt => {
                        const checked = selected.includes(opt);
                        return (
                            <li
                                key={opt}
                                onMouseDown={() => toggle(opt)}
                                style={{
                                    padding:         "10px 14px",
                                    fontSize:        "0.875rem",
                                    cursor:          "pointer",
                                    display:         "flex",
                                    alignItems:      "center",
                                    gap:             "10px",
                                    color:           checked ? primary : body,
                                    backgroundColor: checked ? mint    : "transparent",
                                }}
                            >
                                <span
                                    style={{
                                        width:           "16px",
                                        height:          "16px",
                                        borderRadius:    "4px",
                                        border:          `1px solid ${checked ? mid : border}`,
                                        backgroundColor: checked ? mid : "white",
                                        display:         "inline-flex",
                                        alignItems:      "center",
                                        justifyContent:  "center",
                                        color:           "white",
                                        fontSize:        "10px",
                                        flexShrink:      0,
                                    }}
                                >
                                    {checked ? "✓" : ""}
                                </span>
                                <span>{opt}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <input type="hidden" name={id} id={id} value={selected.join(",")} required={required} />
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {selected.map(lang => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => toggle(lang)}
                            className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                            style={{ backgroundColor: mint, color: primary }}
                        >
                            {lang} ×
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
