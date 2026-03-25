import { ArrowRight, ClipboardList, Pill, CalendarDays, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

// Doctor figure SVG illustration
function DoctorFigure({ mirror = false }: { mirror?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: mirror ? "scaleX(-1)" : "none" }}
    >
      {/* Head */}
      <circle cx="70" cy="42" r="32" fill="#fde68a" />
      {/* Hair */}
      <path d="M40 38 Q45 15 70 12 Q95 15 100 38" fill="#374151" />
      {/* White coat */}
      <path d="M32 180 C32 140 48 118 70 114 C92 118 108 140 108 180 L115 220 H25 Z" fill="white" />
      {/* Coat collar */}
      <path d="M70 114 L58 145 M70 114 L82 145" stroke="#e5e7eb" strokeWidth="2" />
      {/* Green/teal shirt underneath */}
      <path d="M58 145 L62 220 M82 145 L78 220" stroke="#228573" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
      {/* Stethoscope */}
      <path d="M56 130 C46 140 42 155 47 165 C52 175 63 175 67 165" stroke="#228573" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="67" cy="167" r="6" fill="#228573" opacity="0.7" />
      {/* Arms */}
      <path d="M32 140 L14 178" stroke="#fde68a" strokeWidth="18" strokeLinecap="round" />
      <path d="M108 140 L126 178" stroke="#fde68a" strokeWidth="18" strokeLinecap="round" />
      {/* Clipboard */}
      <rect x="108" y="168" width="28" height="36" rx="3" fill="white" stroke="#228573" strokeWidth="1.5" />
      <path d="M113 178 h18 M113 185 h18 M113 192 h12" stroke="#228573" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

const features = [
  { icon: ClipboardList, label: "Patient Management",   color: "#d97706", bg: "#fef3c7" },
  { icon: Pill,          label: "Digital Prescriptions", color: "#dc2626", bg: "#fee2e2" },
  { icon: CalendarDays,  label: "Smart Scheduling",      color: "#2563eb", bg: "#dbeafe" },
  { icon: TrendingUp,    label: "Revenue Insights",      color: "#7c3aed", bg: "#ede9fe" },
  { icon: Users,         label: "Expert Network",        color: "#d97706", bg: "#fef9eb" },
];

export default function DoctorsCTASection() {
  return (
    <section id="doctors" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#f0faf7" }}>
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: "#3aa692" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 translate-x-1/2 translate-y-1/2" style={{ backgroundColor: "#228573" }} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-[92px] relative z-10">
        {/* Doctor illustrations flanking content */}
        <div className="flex items-end justify-between gap-8">
          {/* Left doctor illustration */}
          <div className="hidden lg:block w-[130px] shrink-0 opacity-80">
            <DoctorFigure />
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center text-center gap-6">
            <h2 className="text-[34px] md:text-[46px] font-extrabold leading-tight max-w-3xl" style={{ color: "#065b4b" }}>
              Aushadham is an amazing place for{" "}
              <span style={{ color: "#228573" }}>Doctors</span> and other health professionals
            </h2>

            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(6,91,75,0.65)" }}>
              One stop solution for patient management, patient care, easy access and much more.
            </p>

            {/* Feature icons grid */}
            <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-sm border border-[#e8f5f2] flex flex-wrap items-center justify-center gap-6 md:gap-10 my-2">
              {features.map((item) => (
                <div key={item.label} className="feature-icon flex flex-col items-center gap-2.5 min-w-[90px] group cursor-pointer">
                  <div
                    className="icon-bg w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-md"
                    style={{ backgroundColor: item.bg }}
                  >
                    <item.icon size={30} style={{ color: item.color }} strokeWidth={1.8} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-xs font-bold transition-colors duration-300 group-hover:text-[#228573]" style={{ color: "#065b4b" }}>{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-base font-medium" style={{ color: "rgba(6,91,75,0.6)" }}>
              Join us today to bring a positive and healthier change
            </p>

            <Link
              href="/for-doctors"
              className="group inline-flex items-center gap-3 px-10 py-4 text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-90"
              style={{ backgroundColor: "#228573" }}
            >
              Join Aushadham
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right doctor illustration (mirrored) */}
          <div className="hidden lg:block w-[130px] shrink-0 opacity-80">
            <DoctorFigure mirror />
          </div>
        </div>
      </div>
    </section>
  );
}
