"use client";

import Sidebar from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  Plus,
  Thermometer,
  Activity,
  CircleDot,
  ChevronLeft,
  ClipboardPlus,
} from "lucide-react";

export default function PatientHealthProfilePage() {
  const router = useRouter();
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

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-1 text-[#0f7f71] hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button asChild className="rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]">
              <Link href="/patient-dashboard/new-appointment">
                <Plus className="h-4 w-4" />
                New Appointment
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
          <section className="space-y-5">
            <Card className="rounded-3xl border-[#d9ece5] bg-[#edf8f4] py-0">
              <CardHeader className="flex flex-row items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#bfe8dd] p-2.5 text-[#148776]">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                    <CardTitle className="text-2xl font-bold text-[#1f2d2f]">Basic info</CardTitle>
                </div>
                <Button variant="link" className="p-0 text-sm text-[#1b9d8b]">Edit</Button>
              </CardHeader>

              <CardContent className="space-y-3 px-5 pb-5">
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
                  {[
                    ["Age", "35"],
                    ["Weight", "70 kg"],
                    ["Gender", "Female"],
                    ["City", "Bengaluru"],
                    ["Phone number", "+91 7555974388"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-[#e3efea] bg-white px-4 py-3">
                      <p className="text-xs text-[#6a7d78]">{label}</p>
                      <p className="text-sm font-semibold text-[#263634]">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
                  <div className="rounded-2xl bg-[#efe5c6] p-4">
                    <p className="mb-6 text-sm text-[#6d736a]">Current Doctor</p>
                      <p className="text-base font-semibold leading-tight text-[#1f2d2f]">Dr. Suresh Radhakrishanan</p>
                  </div>
                  <div className="rounded-2xl bg-[#f4f2e8] p-4">
                    <p className="mb-6 text-sm text-[#6d736a]">Current Diagnosis</p>
                      <p className="text-base font-semibold leading-tight text-[#1f2d2f]">Malaria</p>
                  </div>
                  <div className="rounded-2xl bg-[#f4f2e8] p-4">
                    <p className="mb-6 text-sm text-[#6d736a]">Present Health issues</p>
                      <p className="text-base font-semibold leading-tight text-[#1f2d2f]">Blood Pressure, Hypertension</p>
                  </div>
                  <div className="rounded-2xl bg-[#f4f2e8] p-4">
                    <p className="mb-6 text-sm text-[#6d736a]">Past Health issues</p>
                      <p className="text-base font-semibold leading-tight text-[#1f2d2f]">Diabetes, Blood Pressure, Hypertension</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-[#d9ece5] bg-white py-0">
              <CardHeader className="flex flex-row items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#bfe8dd] p-2.5 text-[#148776]">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                    <CardTitle className="text-2xl font-bold text-[#1f2d2f]">Historical Data</CardTitle>
                </div>
                <Button variant="link" className="p-0 text-sm text-[#1b9d8b]">Add reports</Button>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge className="rounded-md bg-[#0f8070] text-white hover:bg-[#0f8070]">Platelet Count</Badge>
                  <Badge variant="outline" className="rounded-md border-[#9aa9a5]">Fasting Sugar</Badge>
                  <Badge variant="outline" className="rounded-md border-[#9aa9a5]">Blood Pressure</Badge>
                  <Badge variant="outline" className="rounded-md border-[#9aa9a5]">Others</Badge>
                </div>

                <div className="rounded-xl border border-[#e6efeb] bg-[#fbfdfc] p-4">
                  <div className="relative h-52 w-full overflow-hidden rounded-lg bg-white">
                    <div className="absolute inset-x-0 top-8 h-12 bg-[#f4e8b1]" />
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 220" preserveAspectRatio="none">
                      <path d="M30,25 C210,50 380,70 520,120 C640,155 710,180 770,200" stroke="#ff9800" strokeWidth="7" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="mt-3 text-xs text-[#6f7f7b]">
                    * Data collected from two reports in data base CBC1 and CBC.2; Ideal range 4.7-6.1
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <aside>
            <Card className="rounded-3xl border-[#d9ece5] bg-[#edf8f4] py-0">
              <CardHeader className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#bfe8dd] p-2.5 text-[#148776]">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                  <div>
                      <CardTitle className="text-2xl font-bold text-[#1f2d2f]">Latest Stats</CardTitle>
                    <p className="text-sm text-[#4b5d5a]">Data is automatically from your doctor and reports, or enter it manually.</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-[#1f2f2c]"><CircleDot className="h-4 w-4 fill-[#0ca678] text-[#0ca678]" /> Normal</div>
                  <div className="flex items-center gap-1.5 text-[#1f2f2c]"><CircleDot className="h-4 w-4 fill-[#ef4444] text-[#ef4444]" /> Abnormal</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 px-5 pb-5">
                <Separator className="bg-[#d9ece5]" />

                <Card className="rounded-2xl border-[#e2ede8] bg-white py-0">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-2xl bg-[#f9dede] p-3 text-[#da5f5f]"><Thermometer className="h-10 w-10" /></div>
                    <div>
                      <p className="text-sm text-[#6a7d78]">Temperature</p>
                        <p className="text-4xl font-extrabold text-[#ef2b2b]">39°C</p>
                      <p className="text-xs text-[#7e8f8b]">3 hrs ago</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-[#e2ede8] bg-white py-0">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-2xl bg-[#f9dede] p-3 text-[#da5f5f]"><Activity className="h-10 w-10" /></div>
                    <div>
                      <p className="text-sm text-[#6a7d78]">Respiratory Rate</p>
                        <p className="text-4xl font-extrabold text-[#ef2b2b]">7.5<span className="ml-1 text-2xl">bpm</span></p>
                      <p className="text-xs text-[#7e8f8b]">1 day ago</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-[#e2ede8] bg-white py-0">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-2xl bg-[#c9f0e4] p-3 text-[#148776]"><CircleDot className="h-10 w-10" /></div>
                    <div>
                      <p className="text-sm text-[#6a7d78]">Blood Cholestrol</p>
                        <p className="text-4xl font-extrabold text-[#0f9f75]">180<span className="ml-1 text-2xl">mg/dL</span></p>
                      <p className="text-xs text-[#7e8f8b]">1 yr ago</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-[#d9ece5] bg-[#e8f5f1] py-0">
                  <CardContent className="flex items-start gap-3 p-4">
                    <Plus className="mt-1 h-8 w-8 text-[#15806e]" />
                    <div>
                        <p className="text-lg font-bold text-[#1f2d2f]">Add or Update stats</p>
                      <p className="text-sm text-[#4f6360]">You can add health indicators that you would like to track here</p>
                      <p className="mt-2 text-xs text-[#6f7f7b]">Worried about data safety? <span className="font-semibold text-[#168a7a]">Learn more</span></p>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full rounded-full bg-[#15806e] text-white hover:bg-[#0f6f60]">
                  <ClipboardPlus className="h-4 w-4" />
                  Connect with medical devices
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
