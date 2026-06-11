"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, ChevronLeft, Plus, FileText, UploadCloud, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const patient = {
  name: "Priyanka",
  id: "8700549874",
  photo: "/patient-priyanka.jpg",
};

const medicationSchedule = [
  {
    label: "Morning (8 am -11 am)",
    items: [
      { name: "Steam inhalation", note: "", checked: true },
      { name: "Navision Drops", note: "3 Drops in each nostrils", checked: true },
      { name: "Ear Drops", note: "3 Drops in each ear", checked: true },
      { name: "Paracetamol 200 mg", note: "After lunch", checked: true },
    ],
  },
  {
    label: "Night (8 pm -11 pm)",
    items: [
      { name: "Steam inhalation", note: "", checked: false },
      { name: "Navision Drops", note: "3 Drops in each nostrils", checked: false },
      { name: "Ear Drops", note: "3 Drops in each ear", checked: false },
      { name: "Paracetamol 200 mg", note: "After lunch", checked: false },
    ],
  },
];

const prescriptions = [
  { date: "27-08-24", title: "Diabetes", doctor: "Dr. Nakul Raj Parekh" },
  { date: "20-12-23", title: "Wisdom tooth removal", doctor: "Dr. Gowri Radhakrishnan" },
  { date: "20-12-23", title: "Cold & Flu", doctor: "Dr. Nidhi Nath" },
];

export default function PrescriptionPage() {
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [showUploadComplete, setShowUploadComplete] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#f6fbf9]">
      <Sidebar />
      <main className="flex-1 lg:ml-20 px-6 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
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
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="h-10 px-3 text-sm text-[#228573]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button asChild className="h-10 rounded-full bg-[#228573] px-5 text-sm font-semibold text-white">
              <Link href="/patient-dashboard/new-appointment">
                <Plus className="h-4 w-4" />
                New Appointment
              </Link>
            </Button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
          <div className="flex flex-col gap-6">
            <Card className="rounded-3xl border border-[#e4f0ed] bg-white shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5f2] text-[#228573]">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-[#1f2a27]">
                      Medications
                    </CardTitle>
                    <p className="text-xs font-medium text-gray-500">
                      Based on your active prescriptions
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-[#cfe6e1] text-[#228573]">
                  21, January 2025
                </Badge>
              </CardHeader>
              <CardContent className="space-y-5">
                {medicationSchedule.map((block, blockIndex) => (
                  <div key={block.label} className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                      <span>{block.label}</span>
                      {blockIndex === 0 ? (
                        <span className="text-xs text-gray-400">Thursday</span>
                      ) : null}
                    </div>
                    <div className="rounded-2xl border border-[#eef4f2] bg-white">
                      {block.items.map((item, index) => (
                        <div key={`${item.name}-${index}`}>
                          <div className="flex items-center justify-between px-4 py-3">
                            <div>
                              <p className="text-sm font-semibold text-[#1f2a27]">{item.name}</p>
                              {item.note ? (
                                <p className="text-xs text-gray-500">{item.note}</p>
                              ) : null}
                            </div>
                            <Checkbox checked={item.checked} />
                          </div>
                          {index < block.items.length - 1 ? <Separator /> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#f3d7b3] bg-[#f9a23a] text-white shadow-none">
              <CardContent className="space-y-4 p-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Have you taken your pills, this afternoon?</h3>
                  <p className="text-sm text-white/80">
                    Update your information here and we can keep a track for you
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  {medicationSchedule[0].items.map((item) => (
                    <div key={`${item.name}-reminder`} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        {item.note ? (
                          <p className="text-xs text-white/70">{item.note}</p>
                        ) : null}
                      </div>
                      <Checkbox className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#f9a23a]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="rounded-3xl border border-[#e4f0ed] bg-white shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-[#1f2a27]">Prescriptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs font-semibold text-gray-500">
                  <span>Date</span>
                  <span>Prescription</span>
                  <span>Doctor</span>
                </div>
                <div className="space-y-3">
                  {prescriptions.map((item) => (
                    <div key={`${item.date}-${item.title}`}>
                      <div className="grid grid-cols-3 items-center gap-3 rounded-2xl border border-[#eef4f2] bg-white px-4 py-3">
                        <span className="text-sm font-medium text-gray-600">{item.date}</span>
                        <span className="flex items-center gap-2 text-sm font-semibold text-[#1f2a27]">
                          <FileText className="h-4 w-4 text-[#228573]" />
                          {item.title}
                        </span>
                        <span className="text-sm text-gray-600">{item.doctor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#d9eee9] bg-[#ecf7f4] shadow-none">
              <CardContent className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#228573]">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1f2a27]">Add Prescriptions</h3>
                    <p className="text-sm text-gray-600">
                      You can add any unlisted prescriptions here. This page can be a great place
                      to store all your prescriptions for future references.
                    </p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm font-semibold text-[#228573]"
                  onClick={() => setShowUpload(true)}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={showUpload} onOpenChange={setShowUpload}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Upload Prescriptions</DialogTitle>
            <DialogDescription className="sr-only">
              Upload a prescription to your records.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Upload Prescriptions</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowUpload(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <p className="text-sm font-semibold text-[#1f2a27]">Doctor</p>
                  <Select defaultValue="sudha">
                    <SelectTrigger className="h-11 rounded-xl border-[#e5e7eb] bg-white">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sudha">Dr. Sudha Krishnan</SelectItem>
                      <SelectItem value="nakul">Dr. Nakul Raj Parekh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <p className="text-sm font-semibold text-[#1f2a27]">Date</p>
                  <div className="grid grid-cols-3 gap-3">
                    <Select defaultValue="27">
                      <SelectTrigger className="h-11 rounded-xl border-[#e5e7eb] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="27">27</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="august">
                      <SelectTrigger className="h-11 rounded-xl border-[#e5e7eb] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="august">August</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="2024">
                      <SelectTrigger className="h-11 rounded-xl border-[#e5e7eb] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[#cbd5e1] p-10 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-[#1f2a27]" />
                  <p className="mt-4 text-sm font-semibold text-[#1f2a27]">
                    Choose a file or drag & drop it here
                  </p>
                  <p className="text-xs text-gray-500">
                    JPEG, PNG, PDF, and MP4 formats, up to 50MB
                  </p>
                </div>

                <Button
                  className="w-full rounded-full bg-[#228573] py-5 text-sm font-semibold text-white"
                  onClick={() => {
                    setShowUpload(false);
                    setShowUploadComplete(true);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showUploadComplete} onOpenChange={setShowUploadComplete}>
          <DialogContent className="max-w-2xl rounded-3xl border-0 p-0">
            <DialogTitle className="sr-only">Upload complete</DialogTitle>
            <DialogDescription className="sr-only">
              Your prescription has been uploaded successfully.
            </DialogDescription>
            <div className="rounded-3xl bg-white px-8 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-[#1f2a27]">Upload Prescriptions</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowUploadComplete(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <p className="text-sm font-semibold text-[#1f2a27]">Doctor</p>
                  <div className="h-11 rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm leading-11">
                    Dr. Sudha Krishnan
                  </div>
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <p className="text-sm font-semibold text-[#1f2a27]">Date</p>
                  <div className="grid grid-cols-3 gap-3">
                    {["27", "August", "2024"].map((label) => (
                      <div
                        key={label}
                        className="h-11 rounded-xl border border-[#e5e7eb] bg-white text-center text-sm leading-11"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[#cbd5e1] p-10 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-[#1f2a27]" />
                  <p className="mt-4 text-sm font-semibold text-[#1f2a27]">
                    Choose a file or drag & drop it here
                  </p>
                  <p className="text-xs text-gray-500">JPEG, PNG, PDG, and MP4 formats, up to 50MB</p>
                </div>

                <div className="rounded-2xl bg-[#f2f2f2] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-semibold text-[#1f2a27]">PDF</div>
                      <div>
                        <p className="text-sm font-semibold text-[#1f2a27]">Diabetes</p>
                        <p className="text-xs text-gray-500">94 KB of 94 KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold text-[#1a8f7a]">Completed</div>
                      <Trash2 className="h-5 w-5 text-[#1f2a27]" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#cfeee8] bg-[#dff6f1] py-4 text-sm font-semibold text-[#1f2a27] sm:flex-1"
                  >
                    Add Document
                  </Button>
                  <Button
                    className="w-full rounded-full bg-[#228573] py-4 text-sm font-semibold text-white sm:flex-1"
                    onClick={() => {
                      setShowUploadComplete(false);
                      router.push("/patient-dashboard/prescription");
                    }}
                  >
                    View saved Prescriptions
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
