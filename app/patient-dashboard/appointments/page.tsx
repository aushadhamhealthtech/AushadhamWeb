"use client";

import Sidebar from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, X } from "lucide-react";

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
  return (
    <div className="flex min-h-screen bg-[#f6fbf9]">
      <Sidebar />

      <main className="flex-1 px-5 py-5 lg:ml-20 lg:px-8">
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
                    <Button variant="link" className="h-auto p-0 text-sm font-semibold text-[#ef4444]">
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
                    <Button className="rounded-full bg-[#c6ebe4] text-[#0f6f63] hover:bg-[#b8e4dc]">
                      Reschedule appointment
                    </Button>
                    <Button className="rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]">Pay now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex items-center justify-center rounded-3xl border-[#d8ebe4] bg-[#e8f4f0] py-0">
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
          </div>
        </section>

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
                    <Button variant="link" className="h-auto justify-start p-0 text-[#2563eb]">
                      View
                    </Button>
                    <div>
                      {item.action === "No action required" ? (
                        <span className="text-sm text-[#4b5f5a]">No action required</span>
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
    </div>
  );
}
