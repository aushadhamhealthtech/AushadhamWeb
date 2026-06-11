"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PastAppointment = {
  id: string;
  date: string;
  doctor: string;
  expertise: string;
  status: "Ongoing" | "Completed";
  action: "Submit Reports" | "Book Follow-up" | "No action required";
};

const pastAppointments: PastAppointment[] = [
  {
    id: "1",
    date: "20-12-24",
    doctor: "Dr. Ravindra Kumar",
    expertise: "Gynaecology",
    status: "Ongoing",
    action: "Submit Reports",
  },
  {
    id: "2",
    date: "27-08-24",
    doctor: "Dr. Sukumar Sharma",
    expertise: "Orthopaediatry",
    status: "Ongoing",
    action: "Book Follow-up",
  },
  {
    id: "3",
    date: "20-12-24",
    doctor: "Dr. Krishnakumar V.",
    expertise: "Psychology",
    status: "Completed",
    action: "No action required",
  },
  {
    id: "4",
    date: "20-12-24",
    doctor: "Dr. Vijayalakshmi S.",
    expertise: "General Physician",
    status: "Completed",
    action: "No action required",
  },
];

export default function PatientAppointmentsPage() {
  const router = useRouter();
  const [showReschedule, setShowReschedule] = useState(false);
  const [showEditSymptoms, setShowEditSymptoms] = useState(false);
  const [showUpdated, setShowUpdated] = useState(false);
  const [showPayNow, setShowPayNow] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);

  return (
    <main className="min-h-screen px-5 py-5 lg:ml-20 lg:px-8 bg-[#f6fbf9]">
        <section className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-14 w-14 border border-[#e4eee9]">
              <AvatarImage src="/patient-priyanka.jpg" alt="Priyanka" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#06695a]">Hello Priyanka</h1>
              <p className="text-sm font-semibold text-[#0f6f63]/70">Patient Id: 8700549874</p>
            </div>
            <Button
              variant="outline"
              className="ml-4 rounded-full border-[#2c8e80] text-[#0f6f63] hover:bg-[#e9f6f2]"
            >
              Complete your profile
            </Button>
          </div>

          <p className="pt-2 text-base font-semibold text-[#8f9a97]">August 08, 2024</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#06695a]">Upcoming Appointments</h2>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
            <Card className="rounded-3xl border-[#d8ebe4] bg-white py-0">
              <CardContent className="grid grid-cols-1 gap-0 p-0 md:grid-cols-[220px_1fr]">
                <div className="flex flex-col items-center justify-center gap-4 rounded-l-3xl bg-[#f5f7f6] p-6">
                  <Avatar className="h-28 w-28 border-4 border-[#f4bf3d]">
                    <AvatarImage src="/doctor-sunil.jpg" alt="Dr. Sunil Shinde" />
                    <AvatarFallback>SS</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-lg font-bold text-[#1e2d2a]">Dr. Sunil Shinde</p>
                    <p className="text-base text-[#374946]">Orthopedic</p>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#1b2d2a]">Wednesday, 20 March 2024</h3>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm font-semibold text-[#ef4444]"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      <X className="mr-1 h-3.5 w-3.5" />
                      Cancel appointment
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[170px_1fr]">
                    <div className="space-y-2 text-[#1d2f2b]">
                      <p className="text-sm font-semibold">Id: 101245</p>
                      <p className="text-sm font-semibold">Time: 4.15 - 4.30 pm</p>
                      <p className="text-sm font-semibold">Type: In-person</p>
                    </div>
                    <div className="space-y-2 text-sm leading-snug text-[#2d3f3c]">
                      <p className="text-base font-bold text-[#0f8170]">How to prepare for the appointment</p>
                      <p>
                        Preparing for a doctor&apos;s appointment will ensure that things run smoothly and that you
                        make the most of your time with your healthcare provider.
                      </p>
                      <p>
                        To begin with, please keep your Patient ID handy to provide when requested. Although it is not
                        obligatory, update medical records. Try to arrive 15 mins before schedule.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
                    <Button
                      className="rounded-full bg-[#c6ebe4] text-[#0f6f63] hover:bg-[#b8e4dc]"
                      onClick={() => setShowReschedule(true)}
                    >
                      Reschedule appointment
                    </Button>
                    <Button
                      className="rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]"
                      onClick={() => setShowPayNow(true)}
                    >
                      Pay now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link href="/patient-dashboard/new-appointment" className="block">
              <Card className="flex items-center justify-center rounded-3xl border-[#d8ebe4] bg-[#e8f4f0] py-0 transition hover:shadow-md">
                <CardContent className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
                  <div className="rounded-full bg-[#d8eee8] p-5">
                    <Plus className="h-16 w-16 text-[#15806e]" />
                  </div>
                  <p className="text-center text-2xl font-bold leading-tight text-[#0f6f63]">
                    Book
                    <br />
                    Appointment
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
          <DialogContent className="max-w-3xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Reschedule appointment</DialogTitle>
            <DialogDescription className="sr-only">
              Choose a new slot to reschedule your appointment.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Reschedule appointment</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go back"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowReschedule(false)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close dialog"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowReschedule(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="in-clinic" className="mt-6">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-transparent p-0">
                  <TabsTrigger
                    value="in-clinic"
                    className="rounded-none border-b-2 border-transparent px-3 py-2 text-sm font-semibold data-[state=active]:border-[#228573] data-[state=active]:text-[#1f2a27]"
                  >
                    In-Clinic
                  </TabsTrigger>
                  <TabsTrigger
                    value="online"
                    className="rounded-none border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-gray-400 data-[state=active]:border-[#228573] data-[state=active]:text-[#1f2a27]"
                  >
                    Online
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-6 flex items-center gap-3">
                {[
                  { label: "Mon, 15 Mar", slots: "03 slots available", active: true },
                  { label: "Tue, 16 Mar", slots: "00 slots available", muted: true },
                  { label: "Wed, 17 Mar", slots: "00 slots available", muted: true },
                  { label: "Thu, 18 Oct", slots: "03 slots available" },
                ].map((day) => (
                  <button
                    key={day.label}
                    className={`flex flex-col items-center rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                      day.active
                        ? "border-[#228573] bg-[#228573] text-white"
                        : "border-[#e5e7eb] bg-white text-[#1f2a27]"
                    } ${day.muted ? "text-gray-400" : ""}`}
                    style={{ minWidth: 140 }}
                  >
                    <span>{day.label}</span>
                    <span
                      className={`text-xs font-medium ${
                        day.active
                          ? "text-white/80"
                          : day.muted
                          ? "text-gray-400"
                          : "text-[#228573]"
                      }`}
                    >
                      {day.slots}
                    </span>
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Next available dates"
                  className="h-11 w-11 rounded-full border border-[#e5e7eb]"
                >
                  <ChevronRight className="h-4 w-4 text-[#228573]" />
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#1f2a27]">Morning</h3>
                  <div className="mt-3 grid grid-cols-5 gap-3">
                    {[
                      "10:00 AM",
                      "10:15 AM",
                      "10:30 AM",
                      "10:45 AM",
                      "11:00 AM",
                      "11:15 AM",
                      "11:30 AM",
                      "11:45 AM",
                      "12:00 PM",
                      "12:15 PM",
                      "12:30 PM",
                      "12:45 PM",
                    ].map((time, index) => (
                      <button
                        key={time}
                        className={`rounded-lg px-2 py-2 text-xs font-semibold ${
                          index < 9
                            ? "bg-[#d1d5db] text-white"
                            : "border border-[#e5e7eb] bg-white text-[#1f2a27]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#1f2a27]">Evening</h3>
                  <div className="mt-3 grid grid-cols-5 gap-3">
                    {[
                      "04:00 PM",
                      "10:15 AM",
                      "10:30 AM",
                      "10:45 AM",
                      "11:00 AM",
                      "11:15 AM",
                      "11:30 AM",
                    ].map((time, index) => (
                      <button
                        key={time}
                        className={`rounded-lg px-2 py-2 text-xs font-semibold ${
                          index === 1
                            ? "border border-[#e5e7eb] bg-white text-[#1f2a27]"
                            : "bg-[#d1d5db] text-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
                onClick={() => {
                  setShowReschedule(false);
                  setShowEditSymptoms(true);
                }}
              >
                Update Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditSymptoms} onOpenChange={setShowEditSymptoms}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Edit symptoms</DialogTitle>
            <DialogDescription className="sr-only">
              Update symptoms for your rescheduled appointment.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Edit Symptoms</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go back"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      setShowEditSymptoms(false);
                      setShowReschedule(true);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close dialog"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowEditSymptoms(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-base font-semibold text-[#1f2a27]">Explain your symptoms</p>
                <Textarea
                  defaultValue="Nausea, Heart Burn, Heat Flashes"
                  className="rounded-2xl border-[#e5e7eb] bg-[#f7f7f7] text-sm"
                  style={{ minHeight: 140 }}
                />
                <div className="flex items-start gap-2 text-sm text-[#6c7a76]">
                  <span className="mt-0.5">i</span>
                  <p>Describing your symptoms will help doctor understand your state from before</p>
                </div>
              </div>

              <Button
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
                onClick={() => {
                  setShowEditSymptoms(false);
                  setShowUpdated(true);
                }}
              >
                Save changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showUpdated} onOpenChange={setShowUpdated}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Appointment updated</DialogTitle>
            <DialogDescription className="sr-only">
              Your appointment has been updated successfully.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8 text-center">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowUpdated(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#228573]/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#228573]">
                    <svg
                      width="36"
                      height="26"
                      viewBox="0 0 36 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 13L13.5 23L33 3"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#1f2a27]">Appointment Updated</h2>
              <p className="mt-2 text-sm text-[#1f2a27]">
                Your appointment with <span className="font-semibold">Dr. Sunil Shinde</span> is
                confirmed for <span className="font-semibold">15 Mar, 11:00 am</span>
              </p>
              <p className="mt-3 text-sm text-[#6c7a76]">
                You will be redirected to Appointments page shortly or click below to go
                appointments page
              </p>

              <Button
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
                onClick={() => {
                  setShowUpdated(false);
                  router.push("/patient-dashboard/appointments");
                }}
              >
                Appointments
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showPayNow} onOpenChange={setShowPayNow}>
          <DialogContent className="max-w-xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Choose payment method</DialogTitle>
            <DialogDescription className="sr-only">
              Select a payment method to complete payment.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Choose Payment method</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowPayNow(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-[#1f2a27]">UPI</p>
                  <RadioGroup defaultValue="gpay" className="space-y-3">
                    <label className="flex items-center justify-between rounded-2xl border border-[#e5e7eb] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">G Pay</span>
                        <span className="text-sm text-[#6c7a76]">dgdgdgdg@ybl</span>
                      </div>
                      <RadioGroupItem value="gpay" />
                    </label>
                    <label className="flex items-center justify-between rounded-2xl border border-[#e5e7eb] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">PhonePe</span>
                      </div>
                      <RadioGroupItem value="phonepe" />
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-[#1f2a27]">CARDS</p>
                  <RadioGroup defaultValue="visa" className="space-y-3">
                    <label className="flex items-center justify-between rounded-2xl border border-[#e5e7eb] px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">Visa *****1211</p>
                        <p className="text-xs text-[#6c7a76]">Expires 05/26</p>
                      </div>
                      <RadioGroupItem value="visa" />
                    </label>
                    <label className="flex items-center justify-between rounded-2xl border border-[#e5e7eb] px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">MasterCard *****1211</p>
                        <p className="text-xs text-[#6c7a76]">Expired!</p>
                      </div>
                      <RadioGroupItem value="mastercard" />
                    </label>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-[#e5e7eb] px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f2a27]">PAY AT THE CLINIC</p>
                  <RadioGroup defaultValue="clinic">
                    <RadioGroupItem value="clinic" />
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full rounded-full bg-[#228573] py-4 text-sm font-semibold text-white"
                    onClick={() => {
                      setShowPayNow(false);
                      setShowPaymentSuccess(true);
                    }}
                  >
                    Make Payment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#cfeee8] bg-[#dff6f1] py-4 text-sm font-semibold text-[#1f2a27]"
                  >
                    Add Payment method
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Payment success</DialogTitle>
            <DialogDescription className="sr-only">
              Your payment was successful.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8 text-center">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowPaymentSuccess(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#228573]/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#228573]">
                    <svg
                      width="36"
                      height="26"
                      viewBox="0 0 36 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 13L13.5 23L33 3"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#1f2a27]">Thank you for your payment</h2>
              <p className="mt-2 text-sm text-[#1f2a27]">
                Your appointment with <span className="font-semibold">Dr. Sunil Shinde</span> is
                confirmed for <span className="font-semibold">15 Mar, 11:00 am</span>
              </p>
              <p className="mt-3 text-sm text-[#6c7a76]">
                You will be redirected to Appointments page shortly or click below to go
                appointments page
              </p>

              <Button
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
                onClick={() => {
                  setShowPaymentSuccess(false);
                  router.push("/patient-dashboard/appointments");
                }}
              >
                Appointments
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Confirm cancellation</DialogTitle>
            <DialogDescription className="sr-only">
              Confirm whether you want to cancel this appointment.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8 text-center">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 flex justify-center">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
                  <path d="M8 2v3M16 2v3" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="2" y="4" width="20" height="5" rx="2" fill="#ef4444" />
                  <path
                    d="M2 8v11a2 2 0 002 2h9"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path d="M22 8v7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M16 21h6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#1f2a27]">Are you sure you want to cancel?</h2>
              <p className="mt-2 text-sm text-[#1f2a27]">
                If you can&apos;t make your appointment with <span className="font-semibold">Dr. Shinde</span> on{" "}
                <span className="font-semibold">15 Mar, 11:00 am</span>, you can{" "}
                <span className="text-[#1a6f60]">reschedule for free</span>.
              </p>

              <div className="mt-6 rounded-2xl bg-[#f5f5f5] px-6 py-4 text-sm text-[#ef4444]">
                <div className="grid gap-3 md:grid-cols-2">
                  <p>
                    Once cancelled, you can&apos;t reverse it and must restart the process for a new appointment.
                  </p>
                  <p>
                    You will lose 20% of your paid fee as you are cancelling less than 2 hours before the appointment
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#6c7a76]">
                80% of the amount paid by you will be returned to your payment mode in 7 working days
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  className="w-full rounded-full bg-[#228573] py-4 text-sm font-semibold text-white"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setShowReschedule(true);
                  }}
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-[#ef4444] py-4 text-sm font-semibold text-[#ef4444]"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setShowCancelled(true);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showCancelled} onOpenChange={setShowCancelled}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Appointment cancelled</DialogTitle>
            <DialogDescription className="sr-only">
              Your appointment has been cancelled.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8 text-center">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowCancelled(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 flex justify-center">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
                  <path d="M8 2v3M16 2v3" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="2" y="4" width="20" height="5" rx="2" fill="#ef4444" />
                  <path
                    d="M2 8v11a2 2 0 002 2h9"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path d="M22 8v7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M16 21h6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#1f2a27]">Appointment Cancelled</h2>
              <p className="mt-2 text-sm text-[#1f2a27]">
                Your appointment with <span className="font-semibold">Dr. Shinde</span> on{" "}
                <span className="font-semibold">15 Mar, 11:00 am</span> has been cancelled
              </p>
              <p className="mt-3 text-sm text-[#6c7a76]">
                You will be redirected to Appointments page shortly or click below to set up a new appointment
              </p>

              <Button
                asChild
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
              >
                <Link href="/patient-dashboard/new-appointment">New Appointment</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <section className="mt-10 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[#06695a]">Past Appointments</h2>
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f8f85]" />
              <Input
                placeholder="Search all appointments"
                className="h-11 rounded-full border-[#cde2db] bg-white pl-9 text-sm text-[#1f3d37]"
              />
            </div>
          </div>

          <Card className="overflow-hidden rounded-2xl border-[#b9ddd3] bg-white py-0">
            <CardHeader className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-4 bg-[#edf7f3] px-6 py-4">
              <CardTitle className="text-sm font-semibold text-[#1f312d]">Date</CardTitle>
              <CardTitle className="text-sm font-semibold text-[#1f312d]">Doctor&apos;s name</CardTitle>
              <CardTitle className="text-sm font-semibold text-[#1f312d]">Area of Expertise</CardTitle>
              <CardTitle className="text-sm font-semibold text-[#1f312d]">Status</CardTitle>
              <CardTitle className="text-sm font-semibold text-[#1f312d]">Casesheet</CardTitle>
              <CardTitle className="text-sm font-semibold text-[#1f312d]">Action required</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {pastAppointments.map((item, index) => (
                <div key={item.id}>
                  <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4">
                    <p className="text-sm text-[#233833]">{item.date}</p>
                    <p className="text-sm font-semibold text-[#1f312d]">{item.doctor}</p>
                    <p className="text-sm text-[#4d615c]">{item.expertise}</p>
                    <div>
                      {item.status === "Ongoing" ? (
                        <Badge variant="outline" className="rounded-md border-[#2b8e80] text-[#2b8e80]">
                          Ongoing
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="rounded-md bg-[#f1f5f4] text-[#2f4540]">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="link"
                      className="h-auto justify-start p-0 text-[#2563eb]"
                      onClick={() =>
                        router.push(`/patient-dashboard/prescription/casesheet?doctor=${item.id}`)
                      }
                    >
                      View
                    </Button>
                    <div>
                      {item.action === "No action required" ? (
                        <span className="text-sm text-[#4b5f5a]">No action required</span>
                      ) : item.action === "Book Follow-up" ? (
                        <Button
                          asChild
                          className="rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]"
                        >
                          <Link href="/patient-dashboard/new-appointment">{item.action}</Link>
                        </Button>
                      ) : (
                        <Button className="rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]">
                          {item.action}
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < pastAppointments.length - 1 && <Separator className="bg-[#e3efea]" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
  );
}
