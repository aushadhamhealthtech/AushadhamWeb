"use client";

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
  FileText,
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
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                src="/patient-priyanka.jpg"
                alt="Priyanka"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold" style={{ color: C.mid }}>
                Hello Priyanka
              </h1>
              <p className="text-sm font-semibold" style={{ color: C.muted }}>
                Patient Id:  8700549874
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
                  {/* Appointment Card */}
                  <Card className="gap-0 rounded-2xl border-0 bg-white px-5 py-5 shadow-sm">
                    <p className="text-lg font-bold text-gray-800">
                      Wednesday, 20 March 2024
                    </p>
                    <button className="mt-1 flex items-center gap-1 text-sm font-medium text-red-500">
                      <X size={14} /> Cancel appointment
                    </button>

                    <div className="mt-5 flex gap-0">
                      {/* Doctor card (left side with bg) */}
                      <div
                        className="flex w-[170px] shrink-0 flex-col items-center rounded-2xl px-4 pb-4 pt-6"
                        style={{ backgroundColor: "#f5f5f0" }}
                      >
                        {/* Circular doctor photo with amber background */}
                        <div className="relative mb-3 h-[110px] w-[110px]">
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: "#f5c842" }}
                          />
                          <div className="absolute inset-0 overflow-hidden rounded-full">
                            <Image
                              src="/doctor-sunil.jpg"
                              alt="Dr. Sunil Shinde"
                              width={110}
                              height={110}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-800">
                          Dr. Sunil Shinde
                        </p>
                        <p className="text-xs text-gray-500">Orthopedic</p>
                      </div>

                      {/* Right side: details + buttons */}
                      <div className="flex flex-1 flex-col justify-between pl-5">
                        <div className="space-y-1.5">
                          <p className="text-base text-gray-500">
                            Time{" "}
                            <span className="font-bold text-gray-800">
                              4.15 - 4.30 pm
                            </span>
                          </p>
                          <p className="text-base text-gray-500">
                            Type{" "}
                            <span className="font-bold text-gray-800">
                              In-person
                            </span>
                          </p>

                          <Separator className="my-2" />

                          <p
                            className="text-base font-bold"
                            style={{ color: C.mid }}
                          >
                            Reason for Appointment
                          </p>
                          <p className="text-base text-gray-700">Neck pain</p>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-4 flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="h-11 w-full rounded-full border-0 text-base font-semibold"
                            style={{
                              backgroundColor: C.mint,
                              color: C.primary,
                            }}
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

                  <div className="flex justify-center">
                    <CarouselDots count={3} active={0} />
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
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
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
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Age", value: "35" },
                      { label: "Weight", value: "70 kg" },
                      { label: "Gender", value: "Female" },
                      { label: "City", value: "Bengaluru" },
                      { label: "Phone number", value: "+91 7555974388" },
                    ].map((item) => (
                      <Badge
                        key={item.label}
                        variant="outline"
                        className="rounded-full bg-white px-4 py-2 text-sm font-normal"
                        style={{ borderColor: C.border }}
                      >
                        <span className="text-gray-500">{item.label}</span>
                        <span className="ml-1 font-semibold text-gray-800">
                          {item.value}
                        </span>
                      </Badge>
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
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 12h6M12 9v6" />
                        <rect x="3" y="3" width="18" height="18" rx="3" />
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
                  <div
                    className="grid grid-cols-4 overflow-hidden rounded-xl border"
                    style={{ borderColor: C.border }}
                  >
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
                          backgroundColor: col.highlighted
                            ? C.yellowTint
                            : "white",
                          borderColor: C.border,
                        }}
                      >
                        {col.label}
                      </div>
                    ))}
                    {/* Data row */}
                    {[
                      {
                        value: "Diabetes,\nBlood Pressure,\nHypertension",
                        highlighted: false,
                      },
                      {
                        value: "Blood Pressure,\nHypertension",
                        highlighted: true,
                      },
                      { value: "Malaria", highlighted: false },
                      {
                        value: "Dr. Suresh\nRadhakrishanan",
                        highlighted: true,
                      },
                    ].map((col, i) => (
                      <div
                        key={i}
                        className="whitespace-pre-line px-4 py-3 text-sm font-semibold text-gray-800"
                        style={{
                          backgroundColor: col.highlighted
                            ? C.yellowTint
                            : "white",
                          borderColor: C.border,
                        }}
                      >
                        {col.value}
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
                      className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm"
                      style={{ border: `1px solid ${C.border}` }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg"
                        style={{ backgroundColor: C.orangeLight }}
                      >
                        <FileText size={24} style={{ color: C.orange }} />
                      </div>
                      <p className="text-center text-xs font-medium leading-tight text-gray-700">
                        {report.name}
                      </p>
                      <p className="text-[11px] text-gray-400">{report.date}</p>
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
