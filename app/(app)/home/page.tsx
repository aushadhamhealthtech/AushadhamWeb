"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";
import {
  AlertTriangle,
  ChevronRight,
  Phone,
  Share2,
  FileText,
  Activity,
  TrendingUp,
} from "lucide-react";
import { getFilteredNotifications } from "@/lib/notifications-data";

const appointments = [
  { time: "09:00 AM", name: "Kalyani Rao", reason: "Report Discussion", status: "In-clinic", active: true, initials: "KR", color: "bg-orange-200" },
  { time: "10:00 AM", name: "Radhika Iyer", reason: "Lab Test Discussion", status: "Online", active: false, initials: "RI", color: "bg-purple-200" },
  { time: "10:45 AM", name: "Radhika Iyer Radhakrishnan", reason: "Lab Test Discussion", status: "Online", active: false, initials: "RR", color: "bg-blue-200" },
  { time: "11:30 AM", name: "Radhika Iyer", reason: "Follow-up Checkup", status: "Online", active: false, initials: "RI", color: "bg-green-200" },
];

export default function HomePage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const emergencyMessages = getFilteredNotifications("emergency", "all").slice(0, 2);
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

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content - Appointments Table */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          <Card className="mb-5 rounded-2xl border border-gray-100 shadow-sm">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <h2 className="text-lg font-bold text-red-500">Emergency Messages</h2>
                </div>
                <Button asChild variant="ghost" className="text-sm text-teal-600 font-medium h-7 px-2">
                  <Link href="/notifications?tab=emergency">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-4 pt-1">
              <div className="space-y-2">
                {emergencyMessages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3 rounded-xl border border-gray-100 px-3 py-3">
                    <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-1">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug text-red-500">{message.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.subtitle}</p>
                      <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-red-400 hover:text-red-500 shrink-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-teal-700">My Today&apos;s Appointments</h2>
                <Button asChild variant="ghost" className="text-sm text-teal-600 font-medium h-7 px-2">
                  <Link href="/appointments">View All</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">10</span>
                  <span className="text-sm font-medium text-gray-600">Total Patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Remaining Patients</span>
                  <span className="w-10 h-10 rounded-full bg-yellow-400 text-white text-sm font-bold flex items-center justify-center">10</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-5">
              {/* Table Header */}
              <div className="grid grid-cols-[100px_1fr_1fr_120px] gap-3 px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <span>TIME</span>
                <span>PATIENT NAME</span>
                <span>REASON</span>
                <div className="flex items-center gap-1">
                  <span>STATUS</span>
                </div>
              </div>

              {/* Table Rows - Scrollable */}
              <ScrollArea className="h-100">
                <div className="divide-y divide-gray-50">
                  {appointments.map((apt, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[100px_1fr_1fr_120px] gap-3 px-3 py-3.5 items-center rounded-xl ${
                        apt.active ? "bg-teal-600/5 border-l-2 border-l-teal-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-sm text-gray-600 font-medium">{apt.time}</span>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-9 h-9 shrink-0">
                          <AvatarFallback className={`${apt.color} text-gray-700 text-xs font-semibold`}>{apt.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-800 font-medium">{apt.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{apt.reason}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold rounded-full px-3 py-1 border ${
                          apt.status === "In-clinic"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}
                      >
                        {apt.status}
                      </Badge>
                    </div>
                  ))}

                  {/* Slot free row */}
                  <div className="py-4 text-center">
                    <span className="text-sm text-blue-500 font-medium cursor-pointer hover:underline">Slot free</span>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>

        {/* Right Sidebar - Metrics & Updates */}
        <aside className="w-80 shrink-0 border-l border-gray-100 bg-white overflow-y-auto p-5 space-y-5">
          {/* Metrics Card */}
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
              <ScrollArea className="h-45">
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <Activity className="w-7 h-7 text-emerald-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium mt-1">In-process</p>
                  <p className="text-5xl font-bold text-gray-800">40</p>
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
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Updates Panel */}
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="pb-0 pt-5 px-5">
              <h3 className="text-base font-bold text-gray-800">Updates</h3>
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
                  <ScrollArea className="h-72">
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
                  <div className="mt-1 flex justify-end">
                    <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs text-teal-600">
                      <Link href="/notifications?tab=updates">View all</Link>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="regular">
                  <ScrollArea className="h-72">
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
                  <div className="mt-1 flex justify-end">
                    <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs text-teal-600">
                      <Link href="/notifications?tab=updates">View all</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
