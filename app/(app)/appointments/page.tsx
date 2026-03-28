"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, ChevronDown, FileText, ChevronRight, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getFilteredNotifications } from "@/lib/notifications-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Appointment = {
  id: number;
  time: string;
  name: string;
  reason: string;
  status: "In-clinic" | "Online";
  active: boolean;
  initials: string;
  avatarColor: string;
};

const appointments: Appointment[] = [
  {
    id: 1, time: "09:00 AM", name: "Kalyan Rao", reason: "Report Discussion",
    status: "In-clinic", active: true,
    initials: "KR", avatarColor: "bg-orange-200",
  },
  {
    id: 2, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", active: false,
    initials: "RI", avatarColor: "bg-purple-200",
  },
  {
    id: 3, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", active: false,
    initials: "RR", avatarColor: "bg-blue-200",
  },
];

// After "Slot free", more appointments
const moreAppointments: Appointment[] = [
  {
    id: 4, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", active: false,
    initials: "RI", avatarColor: "bg-green-200",
  },
  {
    id: 5, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", active: false,
    initials: "RI", avatarColor: "bg-pink-200",
  },
  {
    id: 6, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", active: false,
    initials: "RI", avatarColor: "bg-teal-200",
  },
  {
    id: 7, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", active: false,
    initials: "RI", avatarColor: "bg-indigo-200",
  },
];

function AppointmentRow({ apt }: { apt: Appointment }) {
  return (
    <div
      className={`grid grid-cols-[90px_1fr_1fr_90px_130px] gap-x-4 items-center px-5 py-4 transition-colors ${
        apt.active
          ? "bg-teal-50/60 border-l-[3px] border-l-teal-600"
          : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
      }`}
    >
      <Link href={`/appointments/${apt.id}`} className="contents">
        {/* TIME */}
        <span className={`text-sm font-semibold ${apt.active ? "text-gray-900" : "text-gray-500"}`}>
          {apt.time}
        </span>

        {/* PATIENT NAME */}
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className={`${apt.avatarColor} text-gray-700 text-xs font-semibold`}>
              {apt.initials}
            </AvatarFallback>
          </Avatar>
          <span className={`text-sm leading-tight ${apt.active ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
            {apt.name.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && apt.name.includes("\n") && <br />}
              </span>
            ))}
          </span>
        </div>

        {/* REASON */}
        <span className={`text-sm ${apt.active ? "font-semibold text-gray-900" : "text-gray-600"}`}>
          {apt.reason}
        </span>

        {/* STATUS */}
        <Badge
          variant="outline"
          className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border whitespace-nowrap ${
            apt.status === "In-clinic"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}
        >
          {apt.status}
        </Badge>
      </Link>

      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              className="h-9 rounded-full px-5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700"
            >
              Join Now
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem variant="destructive">Reschedule</DropdownMenuItem>
            <DropdownMenuItem className="text-blue-600 focus:bg-blue-50 focus:text-blue-700">
              In Clinic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("All");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [metricsExpanded, setMetricsExpanded] = useState(false);
  const subscribedUpdates = getFilteredNotifications("updates", "subscribed");
  const regularUpdates = getFilteredNotifications("updates", "regular");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-emerald-200">
            <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
        </div>
        <div className="flex items-center gap-3">
          <DateSelector />
          <Button
            onClick={() => setInviteOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full gap-2 px-5 py-2.5 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Invite
          </Button>
        </div>
      </header>

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />

      {/* Main Content + Right Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-6 py-5">
          {/* Title + Filter */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-teal-700">My Today&apos;s Appointments</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 text-sm font-medium text-gray-700 gap-1.5 h-9 px-4"
                >
                  {filter}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("In-clinic")}>In-clinic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Online")}>Online</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[90px_1fr_1fr_90px_130px] gap-x-4 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient Name</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Scheduled</span>
            </div>

            {/* Table Body */}
            <ScrollArea className="max-h-[calc(100vh-260px)]">
              <div className="divide-y divide-gray-100">
                {/* First group of appointments */}
                {appointments
                  .filter(a => filter === "All" || a.status === filter)
                  .map((apt) => (
                    <AppointmentRow key={apt.id} apt={apt} />
                  ))}

                {/* Slot free divider */}
                <div className="py-4 text-center border-y border-gray-100">
                  <span className="text-sm text-teal-500 font-medium cursor-pointer hover:text-teal-600 hover:underline transition-colors">
                    Slot free
                  </span>
                </div>

                {/* Second group of appointments */}
                {moreAppointments
                  .filter(a => filter === "All" || a.status === filter)
                  .map((apt) => (
                    <AppointmentRow key={apt.id} apt={apt} />
                  ))}
              </div>
            </ScrollArea>
          </div>
        </main>

        {/* Right Sidebar - Metrics & Updates */}
        <aside className="w-80 shrink-0 border-l border-gray-100 bg-white overflow-y-auto p-5 space-y-5">
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardContent className="p-5">
              <div className="flex justify-end mb-4">
                <Select defaultValue="weekly">
                  <SelectTrigger className="h-8 w-28 rounded-xl text-sm font-medium border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${metricsExpanded ? "max-h-100" : "max-h-26"}`}
              >
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <Activity className="w-7 h-7 text-emerald-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium mt-1">In-process</p>
                  <p className="text-3xl font-bold text-gray-800">40</p>
                  <div className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +12% vs last week
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Completed</p>
                    <p className="text-lg font-bold text-emerald-600">68</p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Cancelled</p>
                    <p className="text-lg font-bold text-red-400">5</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-teal-600"
                  onClick={() => setMetricsExpanded((v) => !v)}
                >
                  {metricsExpanded ? "Show less" : "Show more"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="pb-0 pt-5 px-5 flex flex-row items-center justify-between">
              <h3 className="text-base font-bold text-gray-800">Updates</h3>
              <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs text-teal-600">
                <Link href="/notifications?tab=updates">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-3">
              <Tabs defaultValue="subscribed">
                <TabsList className="w-full rounded-xl bg-gray-50 p-1 border border-gray-100 mb-3">
                  <TabsTrigger value="subscribed" className="flex-1 rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm">
                    Subscribed
                  </TabsTrigger>
                  <TabsTrigger value="regular" className="flex-1 rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm">
                    Regular
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="subscribed">
                  <ScrollArea className="h-112">
                    <div className="space-y-1 pb-9">
                      {subscribedUpdates.map((update, idx) => (
                        <div key={update.id}>
                          <div className="flex items-start gap-3 py-3 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 border border-amber-100">
                              <FileText className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-semibold text-gray-800">{update.title}</p>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 truncate">{update.subtitle}</p>
                              <p className="text-xs text-gray-400">{update.time}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-2" />
                          </div>
                          {idx < subscribedUpdates.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="regular">
                  <ScrollArea className="h-112">
                    <div className="space-y-1 pb-9">
                      {regularUpdates.map((update, idx) => (
                        <div key={update.id}>
                          <div className="flex items-start gap-3 py-3 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gray-50 border border-gray-100">
                              <FileText className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-600">{update.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5 truncate">{update.subtitle}</p>
                              <p className="text-xs text-gray-400">{update.time}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-2" />
                          </div>
                          {idx < regularUpdates.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
