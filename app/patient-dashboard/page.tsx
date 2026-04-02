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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  const [cancelAppt, setCancelAppt] = React.useState<typeof APPOINTMENTS[0] | null>(null);
  const [cancelledAppt, setCancelledAppt] = React.useState<typeof APPOINTMENTS[0] | null>(null);
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
      <div className="flex-1 lg:ml-20">
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
                          <button
                            className="mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
                            onClick={() => setCancelAppt(appt)}
                          >
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
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Latest Reports */}
            <Card
              className="flex h-full flex-col border shadow-none"
              style={{ backgroundColor: C.cardBg, borderColor: C.border }}
            >
              <CardHeader className="flex-row items-center justify-between pb-0">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${C.light} 0%, ${C.mid} 100%)`,
                      color: "white",
                    }}
                  >
                    <FileBarChart2 size={28} />
                  </div>
                  <CardTitle
                    className="text-3xl font-extrabold"
                    style={{ color: C.primary }}
                  >
                    Latest Reports
                  </CardTitle>
                </div>
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
              className="flex h-full flex-col border shadow-none"
              style={{ backgroundColor: C.cardBg, borderColor: C.border }}
            >
              <CardHeader className="flex-row items-center justify-between pb-0">
                <div className="flex items-center gap-4">
                  {/* Large gradient teal circle icon */}
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${C.light} 0%, ${C.mid} 100%)`,
                      color: "white",
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="17" rx="2" />
                      <path d="M8 4V2M16 4V2" />
                      <path d="M3 9h18" />
                      <path d="M7 14h2M11 14h2M15 14h2" />
                      <path d="M7 18h2M11 18h2M15 18h2" />
                    </svg>
                  </div>
                  <CardTitle
                    className="text-3xl font-extrabold"
                    style={{ color: C.primary }}
                  >
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
                <p className="mb-2 text-base font-bold text-gray-800">
                  Afternoon (1pm -3 pm)
                </p>

                <div className="divide-y" style={{ borderColor: C.border }}>
                  {[
                    { name: "Steam inhalation", dosage: "" },
                    { name: "Navision Drops", dosage: "3 Drops in each nostrils" },
                    { name: "Ear Drops", dosage: "3 Drops in each ear" },
                    { name: "Paracetomol 200 mg", dosage: "After lunch" },
                  ].map((med) => (
                    <div
                      key={med.name}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-base text-gray-800">{med.name}</span>
                        {med.dosage && (
                          <span className="text-sm text-gray-400">{med.dosage}</span>
                        )}
                      </div>
                      <Checkbox
                        className="h-6 w-6 rounded-sm"
                        style={{
                          borderColor: C.mid,
                          borderWidth: 2,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Meal — blurred with lock */}
            <Card
              className="relative flex h-full flex-col overflow-hidden border shadow-none"
              style={{ backgroundColor: C.cardBg, borderColor: C.border }}
            >
              <CardHeader className="flex-row items-center justify-between pb-0">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${C.light} 0%, ${C.mid} 100%)`,
                      color: "white",
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="17" rx="2" />
                      <path d="M8 4V2M16 4V2" />
                      <path d="M3 9h18" />
                      <path d="M7 14h2M11 14h2M15 14h2" />
                      <path d="M7 18h2M11 18h2M15 18h2" />
                    </svg>
                  </div>
                  <CardTitle
                    className="text-3xl font-extrabold"
                    style={{ color: C.primary }}
                  >
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

      {/* ─── Cancel Appointment Dialog ─── */}
      <Dialog open={!!cancelAppt} onOpenChange={(open) => !open && setCancelAppt(null)}>
        <DialogContent className="max-w-md rounded-3xl bg-gray-50 p-7 shadow-xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              Confirm Cancellation
            </DialogTitle>
          </DialogHeader>

          {/* Red calendar icon */}
          <div className="flex justify-center py-4">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              {/* Pegs */}
              <path d="M8 2v3M16 2v3" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              {/* Filled header bar */}
              <rect x="2" y="4" width="20" height="5" rx="2" fill="#ef4444" />
              {/* Left + bottom partial (C-shape, open at bottom-right) */}
              <path d="M2 8v11a2 2 0 002 2h9" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Right side partial */}
              <path d="M22 8v7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              {/* Minus */}
              <path d="M16 21h6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Heading */}
          <p className="text-center text-xl font-bold text-gray-900">
            Are you sure you want to cancel?
          </p>

          {/* Subtext */}
          <p className="mt-2 text-center text-sm leading-relaxed text-gray-500">
            If you can&apos;t make your appointment with{" "}
            <span className="font-bold text-gray-900">{cancelAppt?.doctor}</span> on{" "}
            <span className="font-bold text-gray-900">15 Mar, 11:00 am</span>, you can{" "}
            <button className="font-medium" style={{ color: C.mid }}>
              reschedule for free.
            </button>
          </p>

          {/* Warning boxes */}
          <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-gray-100 p-4">
            <p className="text-center text-sm font-semibold leading-snug text-red-500">
              Once cancelled, you can&apos;t reverse it and must restart the process for a new appointment.
            </p>
            <p className="text-center text-sm font-semibold leading-snug text-red-500">
              You will lose 20% of your paid fee as you are cancelling less than 2 hours before the appointment
            </p>
          </div>

          {/* Refund note */}
          <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
            80% of the amount paid by you will be returned to your payment mode in 7 working days
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <Button
              className="h-12 flex-1 rounded-2xl text-base font-semibold text-white"
              style={{ backgroundColor: C.mid }}
              onClick={() => setCancelAppt(null)}
            >
              Reschedule
            </Button>
            <Button
              variant="outline"
              className="h-12 flex-1 rounded-2xl border-2 text-base font-semibold text-red-500 hover:bg-red-50"
              style={{ borderColor: "#ef4444" }}
              onClick={() => {
                setCancelledAppt(cancelAppt);
                setCancelAppt(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Appointment Cancelled Dialog ─── */}
      <Dialog open={!!cancelledAppt} onOpenChange={(open) => !open && setCancelledAppt(null)}>
        <DialogContent className="max-w-md rounded-3xl bg-gray-50 p-7 shadow-xl">
          <DialogTitle className="sr-only">Appointment Cancelled</DialogTitle>
          <DialogDescription className="sr-only">Your appointment has been cancelled.</DialogDescription>
          {/* Red calendar icon */}
          <div className="flex justify-center pb-2 pt-8">
            <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
              {/* Pegs */}
              <path d="M8 2v3M16 2v3" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              {/* Filled header bar */}
              <rect x="2" y="4" width="20" height="5" rx="2" fill="#ef4444" />
              {/* Left + bottom partial (C-shape, open at bottom-right) */}
              <path d="M2 8v11a2 2 0 002 2h9" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Right side partial */}
              <path d="M22 8v7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              {/* Minus */}
              <path d="M16 21h6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Heading */}
          <p className="mt-4 text-center text-2xl font-bold text-gray-900">
            Appointment Cancelled
          </p>

          {/* Description */}
          <p className="mt-3 text-center text-base leading-relaxed text-gray-700">
            Your appointment with{" "}
            <span className="font-bold">{cancelledAppt?.doctor}</span> on{" "}
            <span className="font-bold">15 Mar, 11:00 am</span> has been cancelled
          </p>

          {/* Redirect note */}
          <p className="mt-3 text-center text-sm leading-relaxed text-gray-400">
            You will be redirected to Appointments page shortly or click below to set up a new appointment
          </p>

          {/* Button */}
          <Button
            className="mt-8 h-14 w-full rounded-2xl text-base font-semibold text-white"
            style={{ backgroundColor: C.mid }}
            onClick={() => setCancelledAppt(null)}
          >
            New Appointment
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
