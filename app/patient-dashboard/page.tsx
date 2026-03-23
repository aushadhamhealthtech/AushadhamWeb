"use client";

import Sidebar from "@/components/layout/sidebar";
import {
  Plus,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";

/* ─── Color Palette ─── */
const C = {
  primary: "#065b4b",
  mid: "#228573",
  light: "#3aa692",
  mint: "#e8f5f2",
  yellowTint: "#fdf8ec",
  orange: "#e8943a",
  orangeLight: "#fef4e6",
  body: "#3F4946",
  muted: "rgba(6,91,75,0.5)",
  border: "#e5e7eb",
  bg: "#f8fffe",
  cardBg: "#f2f9f7",
} as const;

/* ─── Reusable section icon (teal circle with outline icon) ─── */
function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: C.mint, color: C.mid }}
    >
      {children}
    </div>
  );
}

/* ─── Carousel dots ─── */
function CarouselDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center gap-1.5 pt-3">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block rounded-full transition-all"
          style={{
            width: i === active ? 10 : 8,
            height: i === active ? 10 : 8,
            backgroundColor: i === active ? C.mid : "#d1d5db",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Patient Dashboard Page
   ═══════════════════════════════════════════════════════════════ */
export default function PatientDashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      {/* Main area offset by sidebar width */}
      <div className="flex-1 lg:ml-16">
        {/* ─── Top Bar ─── */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-12 w-12 overflow-hidden rounded-full bg-amber-100">
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-amber-700">
                P
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: C.primary }}>
                Hello Priyanka
              </h1>
              <p className="text-sm" style={{ color: C.muted }}>
                Patient Id: 8700549874
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: C.mid }}
          >
            <Plus size={16} strokeWidth={2.5} />
            New Appointment
          </button>
        </header>

        {/* ─── Dashboard Grid ─── */}
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
            {/* ══════ LEFT COLUMN ══════ */}
            <div className="flex flex-col gap-6">
              {/* Upcoming Appointments */}
              <section
                className="rounded-2xl p-5"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold" style={{ color: C.primary }}>
                    Upcoming Appointments
                  </h2>
                  <button className="text-sm font-semibold" style={{ color: C.mid }}>
                    View All
                  </button>
                </div>

                {/* Appointment Card */}
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-bold text-gray-800">Wednesday, 20 March 2024</p>
                  <button className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
                    <X size={12} /> Cancel appointment
                  </button>

                  <div className="mt-4 flex gap-4">
                    {/* Doctor photo placeholder */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-amber-100">
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-amber-700">
                          DS
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-gray-800">Dr. Sunil Shinde</p>
                      <p className="text-[11px] text-gray-500">Orthopedic</p>
                    </div>

                    <div className="flex-1 space-y-2 text-sm">
                      <p>
                        Time <span className="font-bold text-gray-800">4.15 - 4.30 pm</span>
                      </p>
                      <p>
                        Type <span className="font-bold text-gray-800">In-person</span>
                      </p>
                      <hr className="border-gray-200" />
                      <p className="font-semibold" style={{ color: C.mid }}>
                        Reason for Appointment
                      </p>
                      <p className="text-gray-700">Neck pain</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <button
                      className="w-48 rounded-full py-2 text-sm font-semibold text-white"
                      style={{ backgroundColor: C.mid }}
                    >
                      Pay now
                    </button>
                    <button
                      className="w-48 rounded-full py-2 text-sm font-semibold text-white"
                      style={{ backgroundColor: C.light }}
                    >
                      Reschedule
                    </button>
                  </div>
                </div>

                <CarouselDots count={3} active={0} />
              </section>

              {/* Latest Reports */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Latest Reports</h2>
                  <button className="text-sm font-semibold" style={{ color: C.mid }}>
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Basic metabolic panel (BMP)", date: "1 hr ago" },
                    { name: "Complete Blood Count (CBC)", date: "15 Sep" },
                    { name: "Lipid panel", date: "15 Sep" },
                  ].map((report) => (
                    <div
                      key={report.name}
                      className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm"
                      style={{ border: `1px solid ${C.border}` }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg"
                        style={{ backgroundColor: C.orangeLight }}
                      >
                        <FileText size={24} style={{ color: C.orange }} />
                      </div>
                      <p className="text-center text-xs font-medium text-gray-700 leading-tight">
                        {report.name}
                      </p>
                      <p className="text-[11px] text-gray-400">{report.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ══════ RIGHT COLUMN ══════ */}
            <div className="flex flex-col gap-6">
              {/* Basic Info */}
              <section
                className="rounded-2xl p-5"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SectionIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </SectionIcon>
                    <h2 className="text-lg font-bold text-gray-800">Basic info</h2>
                  </div>
                  <button className="text-sm font-semibold" style={{ color: C.mid }}>
                    Edit
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Age", value: "35" },
                    { label: "Weight", value: "70 kg" },
                    { label: "Gender", value: "Female" },
                    { label: "City", value: "Bengaluru" },
                    { label: "Phone number", value: "+91 7555974388" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm"
                      style={{ border: `1px solid ${C.border}` }}
                    >
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-semibold text-gray-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Health Profile */}
              <section
                className="rounded-2xl p-5"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SectionIcon>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12h6M12 9v6" />
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                      </svg>
                    </SectionIcon>
                    <h2 className="text-lg font-bold text-gray-800">Health profile</h2>
                  </div>
                  <button className="text-sm font-semibold" style={{ color: C.mid }}>
                    View full profile
                  </button>
                </div>

                <div className="grid grid-cols-4 overflow-hidden rounded-xl border" style={{ borderColor: C.border }}>
                  {/* Header row */}
                  {[
                    { label: "Past Health issues", highlighted: false },
                    { label: "Present Health issues", highlighted: true },
                    { label: "Current Diagnosis", highlighted: false },
                    { label: "Consulting Doctors", highlighted: true },
                  ].map((col) => (
                    <div
                      key={col.label}
                      className="border-b px-4 py-3 text-xs font-medium text-gray-600"
                      style={{
                        backgroundColor: col.highlighted ? C.yellowTint : "white",
                        borderColor: C.border,
                      }}
                    >
                      {col.label}
                    </div>
                  ))}
                  {/* Data row */}
                  {[
                    { value: "Diabetes,\nBlood Pressure,\nHypertension", highlighted: false },
                    { value: "Blood Pressure,\nHypertension", highlighted: true },
                    { value: "Malaria", highlighted: false },
                    { value: "Dr. Suresh\nRadhakrishanan", highlighted: true },
                  ].map((col, i) => (
                    <div
                      key={i}
                      className="whitespace-pre-line px-4 py-3 text-sm font-semibold text-gray-800"
                      style={{
                        backgroundColor: col.highlighted ? C.yellowTint : "white",
                        borderColor: C.border,
                      }}
                    >
                      {col.value}
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom row: Medication + Meal */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Next Medication */}
                <section
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SectionIcon>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <path d="M8 12h8M12 8v8" />
                        </svg>
                      </SectionIcon>
                      <h2 className="text-lg font-bold text-gray-800">Next Medication</h2>
                    </div>
                    <button className="text-sm font-semibold" style={{ color: C.mid }}>
                      View all
                    </button>
                  </div>

                  <p className="mb-3 text-sm font-bold text-gray-800">
                    Afternoon (1pm -3 pm)
                  </p>

                  <div className="space-y-0 divide-y" style={{ borderColor: C.border }}>
                    {[
                      { name: "Steam inhalation", dosage: "" },
                      { name: "Navision Drops", dosage: "3 Drops in each nostrils" },
                      { name: "Ear Drops", dosage: "3 Drops in each ear" },
                      { name: "Paracetomol 200 mg", dosage: "After lunch" },
                    ].map((med) => (
                      <div
                        key={med.name}
                        className="flex items-center justify-between py-2.5"
                      >
                        <div className="text-sm">
                          <span className="font-medium text-gray-800">{med.name}</span>
                          {med.dosage && (
                            <span className="ml-2 text-xs text-gray-400">{med.dosage}</span>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 accent-[#228573]"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Next Meal */}
                <section
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SectionIcon>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 3" />
                        </svg>
                      </SectionIcon>
                      <h2 className="text-lg font-bold text-gray-800">Next Meal</h2>
                    </div>
                    <button className="text-sm font-semibold" style={{ color: C.mid }}>
                      View all
                    </button>
                  </div>

                  <p className="mb-3 text-sm font-bold text-gray-800">Afternoon</p>

                  <div className="space-y-3">
                    {[
                      {
                        meal: "1 bowl rice with 3 chapatis and Vegetable kurma",
                        time: "1.30 pm - 2.30 pm",
                      },
                      {
                        meal: "Tea/ warm water with blend of cucumber, carrots and mint leaves",
                        time: "4.30 pm",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg bg-white p-3"
                        style={{ border: `1px solid ${C.border}` }}
                      >
                        <div
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: C.mint }}
                        >
                          <span className="text-xs" style={{ color: C.mid }}>
                            {i === 0 ? "🍚" : "🍵"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 leading-snug">{item.meal}</p>
                        </div>
                        <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
