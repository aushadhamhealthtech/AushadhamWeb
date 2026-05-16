"use client";

import Sidebar from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, Plus, Search } from "lucide-react";
import Link from "next/link";

const HISTORY_ITEMS = [
  {
    id: "diabetes",
    title: "Diabetes",
    earliest: "24 Dec 2023 (1 year ago)",
    doctor: "Dr. Shridhar Rawat",
    family: "Mother, Grandfather",
    medication: "Metformin (500 mg, 2 times)",
    diet: "Low Carb, Low Sugar Diet",
    dietician: "Dr. Sudha Mukherjee",
    latest: "117 mg/dL",
  },
  {
    id: "malaria",
    title: "Malaria",
    earliest: "5 Jun 2024 (5 months ago)",
    doctor: "Dr. Shridhar Rawat",
    family: "NA",
    medication: "NA",
    diet: "NA",
    dietician: "NA",
    latest: "Negative",
  },
];

export default function PatientMedicalHistoryPage() {
  return (
    <div className="flex min-h-screen bg-[#f3faf7]">
      <Sidebar />

      <main className="flex-1 px-5 py-5 lg:ml-20 lg:px-7">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-14 w-14 border border-[#dbeae5]">
              <AvatarImage src="/patient-priyanka.jpg" alt="Priyanka" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#06695a]">Hello Priyanka</h1>
              <p className="text-sm font-semibold text-[#0f6f63]/70">Patient Id: 8700549874</p>
            </div>
          </div>

          <Button asChild className="rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]">
            <Link href="/patient-dashboard/new-appointment">
              <Plus className="h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </header>

        <section className="rounded-3xl border border-[#d9ece5] bg-[#edf8f4] p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-[#06695a]">Medical History</h2>
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5f8f85]" />
              <Input
                placeholder="Search all history"
                className="h-11 rounded-full border-[#cde2db] bg-white pl-9 text-sm text-[#1f3d37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {HISTORY_ITEMS.map((item) => (
              <Card key={item.id} className="rounded-3xl border-[#e1ede8] bg-white py-0">
                <CardHeader className="flex flex-row items-start justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#bfe8dd] p-2.5 text-[#148776]">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#1f2d2f]">{item.title}</CardTitle>
                  </div>
                  <Button variant="link" className="p-0 text-sm text-[#1b9d8b]">View Full History</Button>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <div className="space-y-3">
                    {[
                      ["Earliest diagnosis", item.earliest],
                      ["Consulting Doctor", item.doctor],
                      ["Family members with history", item.family],
                      ["Current Medication", item.medication],
                      ["Diet", item.diet],
                      ["Consulting dietician", item.dietician],
                      [
                        item.id === "diabetes" ? "Latest Blood Glucose" : "Latest Rapid Diagnostic Test",
                        item.latest,
                      ],
                    ].map(([label, value], index, arr) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-sm text-[#50625e]">
                          <span>{label}</span>
                          <span className="font-semibold text-[#1f2d2f]">{value}</span>
                        </div>
                        {index < arr.length - 1 && <Separator className="mt-3 bg-[#e5efea]" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
