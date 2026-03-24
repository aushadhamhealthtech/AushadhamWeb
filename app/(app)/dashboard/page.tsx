"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Share2, TrendingUp, TrendingDown } from "lucide-react";
import PatientsChart from "@/components/dashboard/PatientsChart";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ChevronRight, Activity } from "lucide-react";
import { getFilteredNotifications } from "@/lib/notifications-data";

type Period = "daily" | "weekly" | "monthly";

type PeriodSnapshot = {
  label: string;
  stats: {
    patients: { value: string; change: string; up: boolean };
    pending: { value: string; change: string; up: boolean };
    regular: { value: string; change: string; up: boolean };
    subscribed: { value: string; change: string; up: boolean };
    booking: { percent: number; value: string; change: string };
  };
  metrics: {
    inProcess: string;
    change: string;
    completed: string;
    cancelled: string;
  };
};

const periodSnapshots: Record<Period, PeriodSnapshot> = {
  daily: {
    label: "from yesterday",
    stats: {
      patients: { value: "180", change: "+2.4%", up: true },
      pending: { value: "12", change: "-8.0%", up: false },
      regular: { value: "30", change: "-4.3%", up: false },
      subscribed: { value: "42", change: "+1.8%", up: true },
      booking: { percent: 78, value: "42", change: "+1.8%" },
    },
    metrics: { inProcess: "18", change: "+6%", completed: "29", cancelled: "2" },
  },
  weekly: {
    label: "from last week",
    stats: {
      patients: { value: "1,250", change: "+4.8%", up: true },
      pending: { value: "60", change: "-25%", up: false },
      regular: { value: "60", change: "-20%", up: false },
      subscribed: { value: "100", change: "+3.6%", up: true },
      booking: { percent: 100, value: "100", change: "+3.6%" },
    },
    metrics: { inProcess: "40", change: "+12%", completed: "68", cancelled: "5" },
  },
  monthly: {
    label: "from last month",
    stats: {
      patients: { value: "4,980", change: "+7.9%", up: true },
      pending: { value: "210", change: "-18%", up: false },
      regular: { value: "235", change: "-9.4%", up: false },
      subscribed: { value: "420", change: "+6.1%", up: true },
      booking: { percent: 92, value: "420", change: "+6.1%" },
    },
    metrics: { inProcess: "132", change: "+18%", completed: "298", cancelled: "17" },
  },
};

type StatItem = {
  title: string;
  value: string | null;
  change: string;
  up: boolean;
  label: string;
  iconBg: string;
  iconColor: string;
  donut?: boolean;
  percent?: number;
  summaryValue?: string;
  summaryChange?: string;
  summaryLabel?: string;
};

function DonutChart({ percent }: { percent: number }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center justify-center w-24 h-24">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r} fill="none"
          stroke="#0d9488" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-lg font-bold text-teal-700">{percent}%</span>
    </div>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <Card className="rounded-2xl p-4 h-full flex flex-col gap-3 min-w-0 shadow-sm border-gray-100">
      {stat.donut ? (
        <div className="flex h-full flex-col items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full ${stat.iconBg} flex items-center justify-center`}>
              <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-600">{stat.title}</span>
          </div>
          <div className="relative flex flex-1 items-center justify-center w-full">
            <DonutChart percent={stat.percent!} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stat.summaryValue}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-teal-500" />
              <span className="text-xs font-medium text-teal-600">{stat.summaryChange}</span>
              <span className="text-xs text-gray-400">{stat.summaryLabel}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full ${stat.iconBg} flex items-center justify-center`}>
              <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {!stat.noTitle && <span className="text-sm font-medium text-gray-600">{stat.title}</span>}
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.up ? (
                <TrendingUp className="w-3 h-3 text-teal-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={`text-xs font-medium ${stat.up ? "text-teal-600" : "text-red-400"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [metricsExpanded, setMetricsExpanded] = useState(false);
  const [period, setPeriod] = useState<Period>("daily");
  const subscribedUpdates = getFilteredNotifications("updates", "subscribed");
  const regularUpdates = getFilteredNotifications("updates", "regular");
  const snapshot = periodSnapshots[period];

  const stats: StatItem[] = [
    {
      title: "Total patients",
      value: snapshot.stats.patients.value,
      change: snapshot.stats.patients.change,
      up: snapshot.stats.patients.up,
      label: snapshot.label,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "In pending",
      value: snapshot.stats.pending.value,
      change: snapshot.stats.pending.change,
      up: snapshot.stats.pending.up,
      label: snapshot.label,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
    {
      title: "Total Booking",
      value: null,
      donut: true,
      percent: snapshot.stats.booking.percent,
      summaryValue: snapshot.stats.booking.value,
      summaryChange: snapshot.stats.booking.change,
      summaryLabel: snapshot.label,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-500",
      change: "",
      up: true,
      label: "",
    },
    {
      title: "Regular",
      value: snapshot.stats.regular.value,
      change: snapshot.stats.regular.change,
      up: snapshot.stats.regular.up,
      label: snapshot.label,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Subscribed",
      value: snapshot.stats.subscribed.value,
      change: snapshot.stats.subscribed.change,
      up: snapshot.stats.subscribed.up,
      label: snapshot.label,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Top header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-amber-400 text-white font-bold text-lg">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
        </div>
        <div className="flex items-center gap-3">
          {mounted ? <DateSelector /> : <div className="h-10 w-40" />}
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

      {/* Main content + right sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Scrollable main area */}
        <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Period selector */}
          <div className="flex items-center gap-2">
            {mounted ? (
              <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
                <SelectTrigger className="w-28 h-8 text-sm font-semibold text-gray-700 border-none shadow-none focus:ring-0 px-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-8 w-28" />
            )}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 auto-rows-[13rem] gap-4">
            {stats.map((stat, i) => (
              <div key={i} className={stat.donut ? "row-span-2" : ""}>
                <StatCard stat={stat} />
              </div>
            ))}
          </div>

          {/* Chart + Revenue row */}
          <div className="flex gap-4">
            <PatientsChart />
          </div>

        </main>

        {/* Right Sidebar - Metrics & Updates (same as Home page) */}
        <aside className="w-80 shrink-0 border-l border-gray-100 bg-white overflow-y-auto p-5 space-y-5">
          {/* Metrics Card */}
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardContent className="p-5">
              <div className="flex justify-end mb-4">
                <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
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
                  <p className="text-3xl font-bold text-gray-800">{snapshot.metrics.inProcess}</p>
                  <div className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {snapshot.metrics.change} vs {period === "daily" ? "yesterday" : period === "weekly" ? "last week" : "last month"}
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Completed</p>
                    <p className="text-lg font-bold text-emerald-600">{snapshot.metrics.completed}</p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Cancelled</p>
                    <p className="text-lg font-bold text-red-400">{snapshot.metrics.cancelled}</p>
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

          {/* Updates Panel */}
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
