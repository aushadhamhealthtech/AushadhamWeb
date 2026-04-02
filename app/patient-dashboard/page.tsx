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
import type {
  Appointment,
  PatientProfile,
  HealthProfile,
  Report,
  MedicationGroup,
  PaymentMethod,
  DateSlot,
  TimeSlot,
} from "@/types/patient-dashboard";
import {
  getPatientProfile,
  getUpcomingAppointments,
  getHealthProfile,
  getLatestReports,
  getNextMedication,
  getPaymentMethods,
  getAvailableSlots,
  cancelAppointment,
  rescheduleAppointment,
  makePayment,
} from "@/lib/api/patient-dashboard";

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

/* ─── Payment logo helper ─── */
function PaymentLogo({ logo }: { logo: PaymentMethod["logo"] }) {
  if (logo === "gpay") return <span className="flex items-center gap-0.5 text-sm font-bold"><span style={{ color: "#4285F4" }}>G</span><span className="text-gray-700"> Pay</span></span>
  if (logo === "phonepe") return <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5f259f]"><span className="text-base font-bold text-white">₱</span></div>
  if (logo === "visa") return <span className="text-lg font-extrabold italic" style={{ color: "#1a1f71" }}>VISA</span>
  if (logo === "mastercard") return <div className="relative flex h-9 w-9 items-center justify-center"><div className="absolute left-0 h-7 w-7 rounded-full bg-[#eb001b] opacity-90" /><div className="absolute right-0 h-7 w-7 rounded-full bg-[#f79e1b] opacity-90" /></div>
  return null
}

/* ═══════════════════════════════════════════════════════════════
   Patient Dashboard Page
   ═══════════════════════════════════════════════════════════════ */
export default function PatientDashboardPage() {
  const PATIENT_ID = "patient-1" // TODO: get from auth session

  const [patient, setPatient] = React.useState<PatientProfile | null>(null)
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [healthProfile, setHealthProfile] = React.useState<HealthProfile | null>(null)
  const [reports, setReports] = React.useState<Report[]>([])
  const [medicationGroups, setMedicationGroups] = React.useState<MedicationGroup[]>([])
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([])
  const [rescheduleData, setRescheduleData] = React.useState<{ dates: DateSlot[]; slots: TimeSlot[] } | null>(null)
  const [loading, setLoading] = React.useState(true)

  const [activeAppt, setActiveAppt] = React.useState(0);
  const [cancelAppt, setCancelAppt] = React.useState<Appointment | null>(null);
  const [cancelledAppt, setCancelledAppt] = React.useState<Appointment | null>(null);
  const [showPayment, setShowPayment] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [showReschedule, setShowReschedule] = React.useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = React.useState(false);
  const [rescheduleTab, setRescheduleTab] = React.useState<"in-clinic" | "online">("in-clinic");
  const [selectedDate, setSelectedDate] = React.useState("mon");
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    Promise.all([
      getPatientProfile(PATIENT_ID),
      getUpcomingAppointments(PATIENT_ID),
      getHealthProfile(PATIENT_ID),
      getLatestReports(PATIENT_ID),
      getNextMedication(PATIENT_ID),
      getPaymentMethods(PATIENT_ID),
    ]).then(([prof, appts, health, reps, meds, payments]) => {
      setPatient(prof)
      setAppointments(appts)
      setHealthProfile(health)
      setReports(reps)
      setMedicationGroups(meds)
      setPaymentMethods(payments)
      setLoading(false)
    })
  }, [])

  function handleApptScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveAppt(index);
  }

  const upiMethods = paymentMethods.filter((m) => m.type === "upi")
  const cardMethods = paymentMethods.filter((m) => m.type === "card")
  const clinicMethod = paymentMethods.find((m) => m.type === "clinic")

  const morningSlots = rescheduleData?.slots.filter((s) => s.period === "morning") ?? []
  const eveningSlots = rescheduleData?.slots.filter((s) => s.period === "evening") ?? []

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
                src={patient?.photo ?? "/patient-priyanka.jpg"}
                alt={patient?.name ?? "Patient"}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold" style={{ color: C.primary }}>
                Hello {patient?.name ?? ""}
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
                    {appointments.map((appt, idx) => (
                      <div key={appt.id} className="w-full shrink-0 snap-start">
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
                                  onClick={() => setShowPayment(true)}
                                >
                                  Pay now
                                </Button>
                                <Button
                                  className="h-11 w-full rounded-full text-base font-semibold text-white"
                                  style={{ backgroundColor: C.mid }}
                                  onClick={() => {
                                    setShowReschedule(true)
                                    // find the doctor id from the active appointment
                                    const doctorId = appointments[activeAppt]?.id ?? "doctor-1"
                                    getAvailableSlots(doctorId, "in-clinic").then(setRescheduleData)
                                  }}
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
                    <CarouselDots count={appointments.length} active={activeAppt} />
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
                      { label: "Age", value: String(patient?.age ?? "") },
                      { label: "Weight", value: patient?.weight ?? "" },
                      { label: "Gender", value: patient?.gender ?? "" },
                      { label: "City", value: patient?.city ?? "" },
                      { label: "Phone number", value: patient?.phone ?? "" },
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
                        value: healthProfile?.pastIssues.join(",\n") ?? "",
                        yellow: false,
                        bold: false,
                      },
                      {
                        label: "Present Health issues",
                        value: healthProfile?.presentIssues.join(",\n") ?? "",
                        yellow: true,
                        bold: false,
                      },
                      {
                        label: "Current Diagnosis",
                        value: healthProfile?.currentDiagnosis ?? "",
                        yellow: false,
                        bold: true,
                      },
                      {
                        label: "Consulting Doctors",
                        value: healthProfile?.consultingDoctor ?? "",
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
                  {reports.map((report) => (
                    <div
                      key={report.id}
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
                  {medicationGroups[0]?.period}
                </p>

                <div className="divide-y" style={{ borderColor: C.border }}>
                  {medicationGroups[0]?.medications.map((med) => (
                    <div
                      key={med.id}
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

      {/* ─── Payment Method Dialog ─── */}
      <Dialog open={showPayment} onOpenChange={(open) => { setShowPayment(open); if (!open) setSelectedPayment(null); }}>
        <DialogContent className="max-w-md rounded-3xl bg-gray-50 p-7 shadow-xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              Choose Payment method
            </DialogTitle>
          </DialogHeader>

          {/* UPI section */}
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">UPI</p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {upiMethods.map((method, i, arr) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex w-12 shrink-0 items-center justify-center">
                  <PaymentLogo logo={method.logo} />
                </div>
                <span className="flex-1 text-base font-medium text-gray-800">{method.label}</span>
                <div className={`h-5 w-5 rounded-full border-2 ${selectedPayment === method.id ? "border-[#228573] bg-[#228573]" : "border-gray-300"}`} />
              </button>
            ))}
          </div>

          {/* Cards section */}
          <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-widest text-gray-500">Cards</p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {cardMethods.map((method, i, arr) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex w-12 shrink-0 items-center justify-center">
                  <PaymentLogo logo={method.logo} />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-800">{method.label}</p>
                  {method.subLabel && (
                    <p className="text-sm text-gray-400">{method.subLabel}</p>
                  )}
                </div>
                <div className={`h-5 w-5 rounded-full border-2 ${selectedPayment === method.id ? "border-[#228573] bg-[#228573]" : "border-gray-300"}`} />
              </button>
            ))}
          </div>

          {/* Pay at clinic */}
          {clinicMethod && (
            <button
              onClick={() => setSelectedPayment(clinicMethod.id)}
              className="mt-4 flex w-full items-center justify-between px-1 py-2"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-gray-800">{clinicMethod.label}</span>
              <div className={`h-5 w-5 rounded-full border-2 ${selectedPayment === clinicMethod.id ? "border-[#228573] bg-[#228573]" : "border-gray-300"}`} />
            </button>
          )}

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <Button
              className="h-12 flex-1 rounded-2xl text-base font-semibold text-white disabled:opacity-40"
              style={{ backgroundColor: C.mid }}
              disabled={!selectedPayment}
              onClick={() => {
                if (selectedPayment) makePayment(appointments[activeAppt]?.id, selectedPayment)
                setShowPayment(false)
                setPaymentSuccess(true)
              }}
            >
              Make Payment
            </Button>
            <Button
              variant="outline"
              className="h-12 flex-1 rounded-2xl border-0 text-base font-semibold"
              style={{ backgroundColor: C.mint, color: C.primary }}
              onClick={() => setShowPayment(false)}
            >
              Add Payment method
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Payment Success Dialog ─── */}
      <Dialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
        <DialogContent className="max-w-md rounded-3xl bg-gray-50 p-7 shadow-xl">
          <DialogTitle className="sr-only">Payment Successful</DialogTitle>
          <DialogDescription className="sr-only">Your payment was successful.</DialogDescription>

          {/* Teal checkmark circle */}
          <div className="flex justify-center pb-2 pt-8">
            <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
              {/* Circle arc (open at top-right, like the image) */}
              <path
                d="M20.5 7A9 9 0 1 0 21 12"
                stroke="url(#teal-grad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Checkmark */}
              <path
                d="M7.5 12l3 3 6-6"
                stroke="url(#teal-grad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="teal-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3aa692" />
                  <stop offset="1" stopColor="#065b4b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Heading */}
          <p className="mt-2 text-center text-2xl font-bold text-gray-900">
            Thank you for your payment
          </p>

          {/* Description */}
          <p className="mt-3 text-center text-base leading-relaxed text-gray-700">
            Your appointment with{" "}
            <span className="font-bold">Dr. Sunil Shinde</span> is confirmed for 15{" "}
            <span className="font-bold">Mar, 11:00 am</span>
          </p>

          {/* Redirect note */}
          <p className="mt-3 text-center text-sm leading-relaxed text-gray-400">
            You will be redirected to Appointments page shortly or click below to go appointments page
          </p>

          {/* Button */}
          <Button
            className="mt-8 h-14 w-full rounded-2xl text-base font-semibold text-white"
            style={{ backgroundColor: C.mid }}
            onClick={() => setPaymentSuccess(false)}
          >
            Appointments
          </Button>
        </DialogContent>
      </Dialog>

      {/* ─── Reschedule Dialog ─── */}
      <Dialog open={showReschedule} onOpenChange={(open) => { setShowReschedule(open); if (!open) { setSelectedSlot(null); setSelectedDate("mon"); setRescheduleTab("in-clinic"); } }}>
        <DialogContent className="max-w-lg rounded-3xl bg-gray-50 p-0 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              Reschedule appointment
            </DialogTitle>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {(["in-clinic", "online"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setRescheduleTab(tab)}
                className="flex-1 py-3 text-sm font-semibold capitalize transition-colors"
                style={{
                  color: rescheduleTab === tab ? C.mid : "#9ca3af",
                  borderBottom: rescheduleTab === tab ? `2px solid ${C.mid}` : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {tab === "in-clinic" ? "In-Clinic" : "Online"}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto max-h-[60vh] px-6 py-5">
            {rescheduleData === null ? (
              <p className="text-center text-sm text-gray-400 py-8">Loading...</p>
            ) : (
              <>
                {/* Date selector */}
                <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                  {rescheduleData.dates.map((d) => {
                    const isSelected = selectedDate === d.id;
                    const isDisabled = d.disabled;
                    return (
                      <button
                        key={d.id}
                        disabled={isDisabled}
                        onClick={() => { if (!isDisabled) { setSelectedDate(d.id); setSelectedSlot(null); } }}
                        className="shrink-0 rounded-2xl px-4 py-3 text-left transition-colors"
                        style={{
                          minWidth: 140,
                          backgroundColor: isSelected ? C.mid : isDisabled ? "#f3f4f6" : "white",
                          border: `1px solid ${isSelected ? C.mid : "#e5e7eb"}`,
                        }}
                      >
                        <p className={`text-sm font-bold ${isSelected ? "text-white" : isDisabled ? "text-gray-400" : "text-gray-800"}`}>
                          {d.label}
                        </p>
                        <p className={`text-xs mt-0.5 font-medium ${isSelected ? "text-white/80" : d.slotsAvailable === 0 ? "text-red-500" : "text-[#228573]"}`}>
                          {String(d.slotsAvailable).padStart(2, "0")} slots available
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Morning slots */}
                <>
                  <p className="mt-5 mb-3 text-base font-bold text-gray-900">Morning</p>
                  <div className="grid grid-cols-4 gap-2">
                    {morningSlots.map((slot) => {
                      const isSelected = selectedSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => slot.available && setSelectedSlot(slot.id)}
                          className="rounded-xl py-3 text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: isSelected ? C.mid : slot.available ? "white" : "#f3f4f6",
                            color: isSelected ? "white" : slot.available ? "#1f2937" : "#9ca3af",
                            border: `1px solid ${isSelected ? C.mid : slot.available ? "#e5e7eb" : "transparent"}`,
                          }}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </>

                {/* Evening slots */}
                <>
                  <p className="mt-5 mb-3 text-base font-bold text-gray-900">Evening</p>
                  <div className="grid grid-cols-4 gap-2">
                    {eveningSlots.map((slot) => {
                      const isSelected = selectedSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => slot.available && setSelectedSlot(slot.id)}
                          className="rounded-xl py-3 text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: isSelected ? C.mid : slot.available ? "white" : "#f3f4f6",
                            color: isSelected ? "white" : slot.available ? "#1f2937" : "#9ca3af",
                            border: `1px solid ${isSelected ? C.mid : slot.available ? "#e5e7eb" : "transparent"}`,
                          }}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              </>
            )}
          </div>

          {/* Update button */}
          <div className="px-6 pb-6 pt-3">
            <Button
              className="h-14 w-full rounded-2xl text-base font-semibold text-white disabled:opacity-40"
              style={{ backgroundColor: C.mid }}
              disabled={!selectedSlot}
              onClick={() => {
                if (selectedSlot) rescheduleAppointment(appointments[activeAppt]?.id, selectedDate, selectedSlot, rescheduleTab)
                setShowReschedule(false)
                setRescheduleSuccess(true)
              }}
            >
              Update Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Reschedule Success Dialog ─── */}
      <Dialog open={rescheduleSuccess} onOpenChange={setRescheduleSuccess}>
        <DialogContent className="max-w-md rounded-3xl bg-gray-50 p-7 shadow-xl">
          <DialogTitle className="sr-only">Appointment Updated</DialogTitle>
          <DialogDescription className="sr-only">Your appointment has been rescheduled.</DialogDescription>

          {/* Teal checkmark */}
          <div className="flex justify-center pb-2 pt-8">
            <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
              <path d="M20.5 7A9 9 0 1 0 21 12" stroke="url(#teal-grad2)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M7.5 12l3 3 6-6" stroke="url(#teal-grad2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="teal-grad2" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3aa692" />
                  <stop offset="1" stopColor="#065b4b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="mt-2 text-center text-2xl font-bold text-gray-900">Appointment Updated</p>

          <p className="mt-3 text-center text-base leading-relaxed text-gray-700">
            Your appointment with <span className="font-bold">Dr. Sunil Shinde</span> is confirmed for 15 <span className="font-bold">Mar, 11:00 am</span>
          </p>

          <p className="mt-3 text-center text-sm leading-relaxed text-gray-400">
            You will be redirected to Appointments page shortly or click below to go appointments page
          </p>

          <Button
            className="mt-8 h-14 w-full rounded-2xl text-base font-semibold text-white"
            style={{ backgroundColor: C.mid }}
            onClick={() => setRescheduleSuccess(false)}
          >
            Appointments
          </Button>
        </DialogContent>
      </Dialog>

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
                if (cancelAppt) cancelAppointment(cancelAppt.id)
                setCancelledAppt(cancelAppt)
                setCancelAppt(null)
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
