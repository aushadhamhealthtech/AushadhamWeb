"use client";

export function AuthInput({
    id, label, type = "text", placeholder, icon: Icon, rightSlot, required = true, value, onChange,
}: {
    id: string; label: string; type?: string; placeholder: string;
    icon: React.ElementType; rightSlot?: React.ReactNode; required?: boolean;
    value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="auth-field flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-semibold text-brand-dark">
                {label}{required && <span className="ml-0.5 text-brand-mid">*</span>}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-mid">
                    <Icon size={15} />
                </span>
                <input
                    id={id} name={id} type={type} placeholder={placeholder}
                    required={required}
                    autoComplete={type === "email" ? "email" : type === "password" ? (id.includes("signup") ? "new-password" : "current-password") : type === "tel" ? "tel" : id}
                    value={value} onChange={onChange}
                    className="w-full pl-11 pr-12 py-3 rounded-full border border-[#e5e7eb] text-sm text-brand-dark bg-brand-input-bg outline-none transition-all duration-200 focus:border-brand-mid focus:shadow-[0_0_0_3px_var(--brand-mid-ring)]"
                />
                {rightSlot && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</span>
                )}
            </div>
        </div>
    );
}
