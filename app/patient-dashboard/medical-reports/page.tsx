"use client";

import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronLeft, FileText, Plus, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const patient = {
  name: "Priyanka",
  id: "8700549874",
  photo: "/patient-priyanka.jpg",
};

const reports = [
  { id: "cbc", date: "27-08-24", title: "Complete Blood Count (CBC)", doctor: "Dr. Nakul Raj Parekh" },
  { id: "lipid-panel", date: "20-12-23", title: "Lipid Panel", doctor: "Dr. Nakul Raj Parekh" },
  { id: "fasting-sugar", date: "20-12-23", title: "Fasting Sugar", doctor: "Dr. Nakul Raj Parekh" },
];

export default function MedicalReportsPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-[#f6fbf9]">
      <Sidebar />
      <main className="flex-1 lg:ml-20">
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
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="h-10 px-3 text-sm text-[#228573]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Link
              href="/patient-dashboard/new-appointment"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#228573] px-5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              New Appointment
            </Link>
          </div>
        </header>

        <section className="px-6 pb-10">
          <Card className="rounded-3xl border border-[#e4f0ed] bg-white shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-[140px_1fr_220px] items-center gap-4 rounded-3xl bg-[#eef6f3] px-5 py-4 text-sm font-semibold text-[#4b5955]">
                <span className="flex items-center gap-1">
                  Date of Report
                  <ChevronDown className="h-4 w-4 text-[#8aa7a0]" />
                </span>
                <span>Reports</span>
                <span className="flex items-center gap-1">
                  Doctor
                  <ChevronDown className="h-4 w-4 text-[#8aa7a0]" />
                </span>
              </div>
              <div className="space-y-3 px-3 pb-4 pt-4">
                {reports.map((report) => (
                  <Link
                    key={`${report.date}-${report.title}`}
                    href={`/patient-dashboard/medical-reports/${report.id}`}
                    className="grid grid-cols-[140px_1fr_220px] items-center gap-4 rounded-2xl border border-[#e8f1ee] bg-white px-5 py-4 transition hover:shadow-sm"
                  >
                    <span className="text-sm font-medium text-gray-600">{report.date}</span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#1f2a27]">
                      <FileText className="h-4 w-4 text-[#228573]" />
                      {report.title}
                    </span>
                    <span className="text-sm text-gray-600">{report.doctor}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-5 rounded-3xl border border-[#f3d7b3] bg-[#f9a23a] text-white shadow-none">
            <CardContent className="flex items-center gap-4 px-6 py-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold">Upload Reports</p>
                <p className="text-sm text-white/80">
                  Dr. Sudha Krishnan would like to see your Complete Blood Count (CBC) and Fasting
                  Sugar Test
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-5 rounded-3xl border border-[#d9eee9] bg-[#ecf7f4] shadow-none">
            <CardContent className="flex flex-col gap-2 px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#228573]">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1f2a27]">Add Reports</h3>
                  <p className="text-sm text-gray-600">
                    You can add any previous medical reports here. This page can be a great place
                    to store all your medical records for future references.
                  </p>
                  <p className="text-xs text-gray-500">Worried about data safety?</p>
                </div>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm font-semibold text-[#228573]">
                Learn more
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
