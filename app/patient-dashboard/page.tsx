"use client";

import React from "react";
import Sidebar from "@/components/layout/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  X,
  FileBarChart2,
  Lock,
} from "lucide-react";
import Image from "next/image";

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

const APPOINTMENTS = [
  {
    date: "Wednesday, 20 March 2024",
    doctor: "Dr. Sunil Shinde",
    specialty: "Orthopedic",
    time: "4.15 - 4.30 pm",
    type: "In-person",
    reason: "Neck pain",
    photo: "/doctor-sunil.jpg",
  },
  {
    date: "Friday, 22 March 2024",
    doctor: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    time: "10.00 - 10.15 am",
    type: "Online",
    reason: "Blood pressure review",
    photo: "/doctor-sunil.jpg",
  },
  {
    date: "Monday, 25 March 2024",
    doctor: "Dr. Ramesh Kumar",
    specialty: "General Physician",
    time: "2.00 - 2.15 pm",
    type: "In-person",
    reason: "Routine check-up",
    photo: "/doctor-sunil.jpg",
  },
];

/* ═══════════════════════════════════════════════════════════════
   Patient Dashboard Page
   ═══════════════════════════════════════════════════════════════ */
export default function PatientDashboardPage() {
  const [activeAppt, setActiveAppt] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  function handleApptScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveAppt(index);
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      {/* Main area offset by sidebar width */}
      <div className="flex-1 lg:ml-16">
        {/* ─── Top Bar ─── */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/patient-priyanka.jpg"
                alt="Priyanka"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold" style={{ color: C.primary }}>
                Hello Priyanka
              </h1>
              <p className="text-base font-bold text-gray-500">
                Patient Id:&nbsp; 8700549874
              </p>
            </div>
          </div>

          <Button
            className="rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: C.mid }}
          >
            <Plus size={16} strokeWidth={2.5} />
            New Appointment
          </Button>
        </header>

        {/* ─── Dashboard Grid ─── */}
        <main className="p-6">
          {/* ── Top section: 2-column grid ── */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
            {/* ══════ LEFT COLUMN ══════ */}
            <div className="flex flex-col gap-6">
              {/* Upcoming Appointments */}
              <Card
                className="gap-4 rounded-2xl border py-5 shadow-none"
                style={{ backgroundColor: C.cardBg, borderColor: C.border }}
              >
                <CardHeader className="flex-row items-center justify-between px-5 py-0">
                  <CardTitle
                    className="text-2xl font-extrabold"
                    style={{ color: C.primary }}
                  >
                    Upcoming Appointments
                  </CardTitle>
                  <CardAction>
                    <Button
                      variant="link"
                      className="p-0 text-sm font-semibold no-underline hover:no-underline"
                      style={{ color: C.mid }}
                    >
                      View All
                    </Button>
                  </CardAction>
                </CardHeader>

                <CardContent className="px-5">
                  {/* Scrollable carousel */}
                  <div
                    ref={scrollRef}
                    onScroll={handleApptScroll}
                    className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {APPOINTMENTS.map((appt, idx) => (
                      <div key={idx} className="w-full shrink-0 snap-start">
                        <Card className="gap-0 rounded-2xl border-0 bg-white px-5 py-5 shadow-sm">
                          <p className="text-lg font-bold text-gray-800">{appt.date}</p>
                          <button className="mt-1 flex items-center gap-1 text-sm font-medium text-red-500">
                            <X size={14} /> Cancel appointment
                          </button>

                          <div className="mt-5 flex gap-0">
                            <div
                              className="flex w-[170px] shrink-0 flex-col items-center rounded-2xl px-4 pb-4 pt-6"
                              style={{ backgroundColor: "#f5f5f0" }}
                            >
                              <div className="relative mb-3 h-[110px] w-[110px]">
                                <div
                                  className="absolute inset-0 rounded-full"
                                  style={{ backgroundColor: "#f5c842" }}
                                />
                                <div className="absolute inset-0 overflow-hidden rounded-full">
                                  <Image
                                    src={appt.photo}
                                    alt={appt.doctor}
                                    width={110}
                                    height={110}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              <p className="text-sm font-bold text-gray-800">{appt.doctor}</p>
                              <p className="text-xs text-gray-500">{appt.specialty}</p>
                            </div>

                            <div className="flex flex-1 flex-col justify-between pl-5">
                              <div className="space-y-1.5">
                                <p className="text-base text-gray-500">
                                  Time{" "}
                                  <span className="font-bold text-gray-800">{appt.time}</span>
                                </p>
                                <p className="text-base text-gray-500">
                                  Type{" "}
                                  <span className="font-bold text-gray-800">{appt.type}</span>
                                </p>
                                <Separator className="my-2" />
                                <p className="text-base font-bold" style={{ color: C.mid }}>
                                  Reason for Appointment
                                </p>
                                <p className="text-base text-gray-700">{appt.reason}</p>
                              </div>

                              <div className="mt-4 flex flex-col gap-2">
                                <Button
                                  variant="outline"
                                  className="h-11 w-full rounded-full border-0 text-base font-semibold"
                                  style={{ backgroundColor: C.mint, color: C.primary }}
                                >
                                  Pay now
                                </Button>
                                <Button
                                  className="h-11 w-full rounded-full text-base font-semibold text-white"
                                  style={{ backgroundColor: C.mid }}
                                >
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <CarouselDots count={APPOINTMENTS.length} active={activeAppt} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ══════ RIGHT COLUMN ══════ */}
            <div className="flex flex-col gap-6">
              {/* Basic Info */}
              <Card
                className="border shadow-none"
                style={{ backgroundColor: C.cardBg, borderColor: C.border }}
              >
                <CardHeader className="flex-row items-center justify-between pb-0">
                  <div className="flex items-center gap-3">
                    <SectionIcon>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M8 4V2M16 4V2" />
                        <path d="M7 13h2M11 13h2M15 13h2" />
                        <path d="M7 17h2M11 17h2M15 17h2" />
                      </svg>
                    </SectionIcon>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      Basic info
                    </CardTitle>
                  </div>
                  <CardAction>
                    <Button
                      variant="link"
                      className="p-0 text-sm font-semibold no-underline hover:no-underline"
                      style={{ color: C.mid }}
                    >
                      Edit
                    </Button>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <div className="flex gap-3">
                    {[
                      { label: "Age", value: "35" },
                      { label: "Weight", value: "70 kg" },
                      { label: "Gender", value: "Female" },
                      { label: "City", value: "Bengaluru" },
                      { label: "Phone number", value: "+91 7555974388" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-4"
                      >
                        <span className="text-sm text-gray-400">{item.label}</span>
                        <span className="text-sm font-bold text-gray-800">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Health Profile */}
              <Card
                className="border shadow-none"
                style={{ backgroundColor: C.cardBg, borderColor: C.border }}
              >
                <CardHeader className="flex-row items-center justify-between pb-0">
                  <div className="flex items-center gap-3">
                    <SectionIcon>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M8 4V2M16 4V2" />
                        <path d="M7 13h2M11 13h2M15 13h2" />
                        <path d="M7 17h2M11 17h2M15 17h2" />
                      </svg>
                    </SectionIcon>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      Health profile
                    </CardTitle>
                  </div>
                  <CardAction>
                    <Button
                      variant="link"
                      className="p-0 text-sm font-semibold no-underline hover:no-underline"
                      style={{ color: C.mid }}
                    >
                      View full profile
                    </Button>
                  </CardAction>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      {
                        label: "Past Health issues",
                        value: "Diabetes,\nBlood Pressure,\nHypertension",
                        yellow: false,
                        bold: false,
                      },
                      {
                        label: "Present Health issues",
                        value: "Blood Pressure,\nHypertension",
                        yellow: true,
                        bold: false,
                      },
                      {
                        label: "Current Diagnosis",
                        value: "Malaria",
                        yellow: false,
                        bold: true,
                      },
                      {
                        label: "Consulting Doctors",
                        value: "Dr. Suresh\nRadhakrishnan",
                        yellow: true,
                        bold: true,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex h-44 flex-col justify-between rounded-2xl p-4"
                        style={{
                          backgroundColor: item.yellow ? "#fef9e7" : "white",
                        }}
                      >
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p
                          className={`whitespace-pre-line text-sm leading-snug text-gray-800 ${item.bold ? "font-bold" : ""}`}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ── Bottom section: 3-column grid ── */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Latest Reports */}
            <Card
              className="border shadow-none"
              style={{ backgroundColor: C.cardBg, borderColor: C.border }}
            >
              <CardHeader className="flex-row items-center justify-between pb-0">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Latest Reports
                </CardTitle>
                <CardAction>
                  <Button
                    variant="link"
                    className="p-0 text-sm font-semibold no-underline hover:no-underline"
                    style={{ color: C.mid }}
                  >
                    View All
                  </Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Basic metabolic panel (BMP)", date: "1 hr ago" },
                    { name: "Complete Blood Count (CBC)", date: "15 Sep" },
                    { name: "Lipid panel", date: "15 Sep" },
                  ].map((report) => (
                    <div
                      key={report.name}
                      className="flex flex-col items-center rounded-2xl bg-white px-4 py-5 shadow-sm gap-3"
                    >
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: C.orange }}
                      >
                        <FileBarChart2 size={32} className="text-white" />
                      </div>
                      <p className="text-center text-sm font-bold leading-snug text-gray-800">
                        {report.name}
                      </p>
                      <p className="text-sm text-gray-400">{report.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Medication */}
            <Card
              className="border shadow-none"
              style={{ backgroundColor: C.cardBg, borderColor: C.border }}
            >
              <CardHeader className="flex-row items-center justify-between pb-0">
                <div className="flex items-center gap-3">
                  <SectionIcon>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                  </SectionIcon>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Next Medication
                  </CardTitle>
                </div>
                <CardAction>
                  <Button
                    variant="link"
                    className="p-0 text-sm font-semibold no-underline hover:no-underline"
                    style={{ color: C.mid }}
                  >
                    View all
                  </Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <p className="mb-3 text-sm font-bold text-gray-800">
                  Afternoon (1pm -3 pm)
                </p>

                <div
                  className="divide-y"
                  style={{ borderColor: C.border }}
                >
                  {[
                    { name: "Steam inhalation", dosage: "" },
                    {
                      name: "Navision Drops",
                      dosage: "3 Drops in each nostrils",
                    },
                    { name: "Ear Drops", dosage: "3 Drops in each ear" },
                    { name: "Paracetomol 200 mg", dosage: "After lunch" },
                  ].map((med) => (
                    <div
                      key={med.name}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div className="text-sm">
                        <span className="font-medium text-gray-800">
                          {med.name}
                        </span>
                        {med.dosage && (
                          <span className="ml-2 text-xs text-gray-400">
                            {med.dosage}
                          </span>
                        )}
                      </div>
                      <Checkbox className="h-5 w-5 rounded border-gray-300" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Meal — blurred with lock */}
            <Card
              className="relative overflow-hidden border shadow-none"
              style={{ backgroundColor: C.cardBg, borderColor: C.border }}
            >
              <CardHeader className="flex-row items-center justify-between pb-0">
                <div className="flex items-center gap-3">
                  <SectionIcon>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </SectionIcon>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Next Meal
                  </CardTitle>
                </div>
                <CardAction>
                  <Button
                    variant="link"
                    className="p-0 text-sm font-semibold no-underline hover:no-underline"
                    style={{ color: C.mid }}
                  >
                    View all
                  </Button>
                </CardAction>
              </CardHeader>

              <CardContent className="relative">
                {/* Blurred content */}
                <div className="select-none blur-[6px]" aria-hidden="true">
                  <p className="mb-3 text-sm font-bold text-gray-800">
                    Afternoon
                  </p>

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
                          <span
                            className="text-xs"
                            style={{ color: C.mid }}
                          >
                            {i === 0 ? "🍚" : "🍵"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm leading-snug text-gray-700">
                            {item.meal}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-gray-400">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lock overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                    style={{ backgroundColor: C.orange }}
                  >
                    <Lock size={22} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
