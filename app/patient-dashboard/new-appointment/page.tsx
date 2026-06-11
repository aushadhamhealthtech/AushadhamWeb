"use client";

import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Dot, Star, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const patient = {
  name: "Priyanka",
  id: "8700549874",
  photo: "/patient-priyanka.jpg",
};

const doctors = [
  {
    name: "Dr. Himadri Chaudary",
    title: "Ayurveda Practitioner (BAMS, MD)",
    experience: "Experience: 10 years",
    availability: "Available for Online appointment",
    fee: "Consultation Fee: ₹400",
    tags: ["Yoga expert", "Thyroid", "more"],
    languages: ["Malayalam", "Hindi", "English"],
    rating: 4.9,
    reviews: 95,
    image: "/doctor-sunil.jpg",
    online: true,
    clinic: true,
  },
  {
    name: "Dr. Aswathi A. L.",
    title: "Ayurveda Practitioner (BAMS, MD)",
    experience: "Experience: 10 years",
    availability: "Toronto, Canada",
    fee: "Consultation Fee: ₹400",
    tags: ["Yoga expert", "Thyroid", "more"],
    languages: ["Malayalam", "Hindi", "English"],
    rating: 4.7,
    reviews: 45,
    image: "/doctor-sunil.jpg",
    online: true,
    clinic: true,
  },
  {
    name: "Dr. Pushpanjali",
    title: "Ayurveda Practitioner (BAMS, MD)",
    experience: "Experience: 10 years",
    availability: "Vizianagaram",
    fee: "Consultation Fee: ₹400",
    tags: ["Yoga expert", "Thyroid", "more"],
    languages: ["Malayalam", "Hindi", "English"],
    rating: 4.6,
    reviews: 45,
    image: "/doctor-sunil.jpg",
    online: true,
    clinic: true,
  },
];

export default function PatientNewAppointmentPage() {
  const router = useRouter();
  const [showBooking, setShowBooking] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <main className="min-h-screen lg:ml-20 bg-[#f6fbf9]">
        <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 bg-[#f6fbf9] px-6 py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-extrabold text-[#065b4b]">Hello {patient.name}</h1>
              <p className="text-sm font-semibold text-gray-500">Patient Id:&nbsp; {patient.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="h-10 px-3 text-sm text-[#228573]">
              <Link href="/patient-dashboard">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </header>

        <section className="px-6 pb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#065b4b]">Find Doctors</h2>
            <Badge variant="outline" className="border-[#cfe6e1] text-[#228573]">
              3 Results
            </Badge>
          </div>

          <div className="space-y-5">
            {doctors.map((doctor) => (
              <Card
                key={doctor.name}
                className="rounded-3xl border border-[#e4f0ed] bg-white shadow-none"
              >
                <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl md:h-28 md:w-28">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 768px) 96px, 112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1f2a27]">{doctor.name}</p>
                      <p className="text-xs text-[#6c7a76]">{doctor.title}</p>
                    </div>

                    <div className="space-y-1 text-xs text-[#44514e]">
                      <p>{doctor.experience}</p>
                      <p>{doctor.availability}</p>
                      <p>{doctor.fee}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {doctor.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="rounded-full bg-[#f4e6b9] text-[#5f4c12] hover:bg-[#f4e6b9]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang) => (
                        <Badge
                          key={lang}
                          className="rounded-full bg-[#e8f5f2] text-[#1a6d5d] hover:bg-[#e8f5f2]"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#4b5a56]">
                      <div className="flex items-center gap-1 text-[#e0b84f]">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                      </div>
                      <span>{doctor.reviews} reviews</span>
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-start gap-3 md:w-48 md:items-end">
                    <div className="text-xs text-[#2d3d39]">
                      <div className="flex items-center gap-2">
                        <Dot className={doctor.online ? "text-[#1aa58d]" : "text-gray-300"} />
                        <span>Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dot className={doctor.clinic ? "text-[#1aa58d]" : "text-gray-300"} />
                        <span>In-clinic</span>
                      </div>
                    </div>
                    <Button
                      className="w-full rounded-full bg-[#228573] text-white hover:bg-[#1a6f60]"
                      onClick={() => setShowBooking(true)}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Dialog open={showBooking} onOpenChange={setShowBooking}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Book appointment</DialogTitle>
            <DialogDescription className="sr-only">
              Select a slot to book your appointment.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-6 pb-6 pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2a27]">Book Appointment</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go back"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowBooking(false)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close dialog"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowBooking(false)}
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
                    className={`flex min-w-35 flex-col items-center rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                      day.active
                        ? "border-[#228573] bg-[#228573] text-white"
                        : "border-[#e5e7eb] bg-white text-[#1f2a27]"
                    } ${day.muted ? "text-gray-400" : ""}`}
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
                    {["04:00 PM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM"].map(
                      (time, index) => (
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
                      )
                    )}
                  </div>
                </div>
              </div>

              <Button
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
                onClick={() => {
                  setShowBooking(false);
                  setShowConfirm(true);
                }}
              >
                Book Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent className="max-w-4xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Confirm details before proceeding</DialogTitle>
            <DialogDescription className="sr-only">
              Confirm your personal details before proceeding.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Confirm your details before proceeding</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setShowConfirm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Card className="mt-8 rounded-3xl border border-[#e6efeb] bg-[#f8fbf9] shadow-none">
                <CardContent className="grid gap-8 px-8 py-10 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#1f2a27]">Full Name</label>
                      <Input
                        defaultValue="Buragana Uday Kumar"
                        className="h-11 rounded-lg border-[#cfe0fb] bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#1f2a27]">Date of Birth</label>
                      <Input
                        placeholder="DD/MM/YYYY"
                        className="h-11 rounded-lg border-[#cfe0fb] bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#1f2a27]">Phone Number</label>
                      <Input
                        defaultValue="+91 9493153405"
                        className="h-11 rounded-lg border-[#cfe0fb] bg-white"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 h-11 rounded-full border-[#9aa9a5] text-[#1f2a27]"
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#1f2a27]">Email ID</label>
                      <Input
                        defaultValue="Aushadam"
                        className="h-11 rounded-lg border-[#cfe0fb] bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#1f2a27]">Gender</label>
                      <Select>
                        <SelectTrigger className="h-11 rounded-lg border-[#cfe0fb] bg-white">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-[#1f2a27]">Do you have any medical history?</p>
                      <div className="flex items-center gap-6">
                        <Button
                          variant="outline"
                          className="h-10 rounded-full border-[#cfe0fb] px-6 text-sm text-[#1f2a27]"
                        >
                          Yes
                        </Button>
                        <Button
                          variant="outline"
                          className="h-10 rounded-full border-[#cfe0fb] px-6 text-sm text-[#1f2a27]"
                        >
                          No
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="h-11 rounded-full bg-[#228573] px-8 text-white hover:bg-[#1a6f60]"
                        onClick={() => {
                          setShowConfirm(false);
                          setShowHistory(true);
                        }}
                      >
                        Confirm &amp; Proceed
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showHistory} onOpenChange={setShowHistory}>
          <DialogContent className="max-w-4xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Medical history details</DialogTitle>
            <DialogDescription className="sr-only">
              Provide medical history and lifestyle details.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Confirm your details before proceeding</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setShowHistory(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Card className="mt-8 rounded-3xl border border-[#e6efeb] bg-[#f8fbf9] shadow-none">
                <CardContent className="max-h-[70vh] space-y-6 overflow-y-auto px-8 py-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">Select your present health issues</p>
                        <div className="flex flex-wrap gap-2">
                          {["Diabetes", "Gastritis", "High Blood pressure", "Low Blood pressure", "Add more"].map(
                            (item) => (
                              <Button
                                key={item}
                                variant="outline"
                                className="h-8 rounded-full border-[#cfdad6] px-3 text-xs text-[#1f2a27]"
                              >
                                {item}
                              </Button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">Select your Past health issues</p>
                        <div className="flex flex-wrap gap-2">
                          {["Diabetes", "Gastritis", "High Blood pressure", "Low Blood pressure", "Add more"].map(
                            (item) => (
                              <Button
                                key={item}
                                variant="outline"
                                className="h-8 rounded-full border-[#cfdad6] px-3 text-xs text-[#1f2a27]"
                              >
                                {item}
                              </Button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">At present I am on the medication</p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            className="h-8 rounded-full border-[#cfdad6] px-4 text-xs text-[#1f2a27]"
                          >
                            Yes
                          </Button>
                          <Button
                            variant="outline"
                            className="h-8 rounded-full border-[#cfdad6] px-4 text-xs text-[#1f2a27]"
                          >
                            No
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">
                          Upload your present medical prescriptions(if you have any)
                        </p>
                        <Button
                          variant="outline"
                          className="h-8 rounded-full border-[#cfdad6] px-4 text-xs text-[#1f2a27]"
                        >
                          Choose File
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">Do you have any allergies?</p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            className="h-8 rounded-full border-[#cfdad6] px-4 text-xs text-[#1f2a27]"
                          >
                            Yes
                          </Button>
                          <Button
                            variant="outline"
                            className="h-8 rounded-full border-[#cfdad6] px-4 text-xs text-[#1f2a27]"
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">Mention your type of allergies</p>
                        <Select>
                          <SelectTrigger className="h-10 rounded-lg border-[#cfe0fb] bg-white text-sm">
                            <SelectValue placeholder="Select or enter texts to add allergies" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pollen">Pollen</SelectItem>
                            <SelectItem value="dust">Dust</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">Family Medical History</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Select>
                            <SelectTrigger className="h-10 w-40 rounded-lg border-[#cfe0fb] bg-white text-sm">
                              <SelectValue placeholder="Select Relation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mother">Mother</SelectItem>
                              <SelectItem value="father">Father</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="h-10 min-w-55 rounded-lg border-[#cfe0fb] bg-white text-sm">
                              <SelectValue placeholder="Select or enter texts to add history" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diabetes">Diabetes</SelectItem>
                              <SelectItem value="bp">Blood Pressure</SelectItem>
                              <SelectItem value="thyroid">Thyroid</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            className="h-10 w-10 rounded-full border-[#cfe0fb] p-0 text-[#1f2a27]"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">Select your Lifestyle Habits</p>
                        <div className="flex flex-wrap gap-2">
                          {["Yoga", "Exercises", "Meditation", "Smoking", "Alcohol consumption"].map((item) => (
                            <Button
                              key={item}
                              variant="outline"
                              className="h-8 rounded-full border-[#cfdad6] px-3 text-xs text-[#1f2a27]"
                            >
                              {item}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[#1f2a27]">
                          Did you take any vaccination? If Yes, please select one from below.
                        </p>
                        <Select>
                          <SelectTrigger className="h-10 rounded-lg border-[#cfe0fb] bg-white text-sm">
                            <SelectValue placeholder="Select or enter texts to add vaccines" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="covid">COVID-19</SelectItem>
                            <SelectItem value="flu">Flu</SelectItem>
                            <SelectItem value="tetanus">Tetanus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="outline"
                      className="h-10 rounded-full border-[#9aa9a5] px-6 text-sm text-[#1f2a27]"
                    >
                      Edit
                    </Button>
                    <Button
                      className="h-10 rounded-full bg-[#228573] px-8 text-sm text-white hover:bg-[#1a6f60]"
                      onClick={() => {
                        setShowHistory(false);
                        setShowSymptoms(true);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSymptoms} onOpenChange={setShowSymptoms}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Symptoms</DialogTitle>
            <DialogDescription className="sr-only">
              Describe your symptoms before proceeding to payment.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Symptoms</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go back"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      setShowSymptoms(false);
                      setShowHistory(true);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close dialog"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setShowSymptoms(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-base font-semibold text-[#1f2a27]">Explain your symptoms</p>
                <Textarea
                  defaultValue="Nausea, Heart Burn, Heat Flashes"
                  className="min-h-35 rounded-2xl border-[#e5e7eb] bg-[#f7f7f7] text-sm"
                />
                <div className="flex items-start gap-2 text-sm text-[#6c7a76]">
                  <span className="mt-0.5">i</span>
                  <p>Describing your symptoms will help doctor understand your state from before</p>
                </div>
              </div>

              <Button
                className="mt-8 w-full rounded-full bg-[#228573] py-6 text-base font-semibold text-white"
                onClick={() => {
                  setShowSymptoms(false);
                  setShowPayment(true);
                }}
              >
                Save and go to payments
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Choose payment method</DialogTitle>
            <DialogDescription className="sr-only">
              Choose a payment method to complete your booking.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Choose Payment method</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowPayment(false)}
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
                      setShowPayment(false);
                      setShowSuccess(true);
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

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Payment success</DialogTitle>
            <DialogDescription className="sr-only">
              Your payment is complete.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-10 pb-10 pt-8 text-center">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close dialog"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowSuccess(false)}
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
                  setShowSuccess(false);
                  router.push("/patient-dashboard/appointments");
                }}
              >
                Appointments
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
  );
}
