"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Folder,
  RefreshCw,
  Share2,
  XCircle,
} from "lucide-react";
import { InviteDialog } from "@/components/InviteDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  getFilteredNotifications,
  medicalFilters,
  updatesFilters,
  type NotificationItem,
  type NotificationSection,
  type NotificationTone,
} from "@/lib/notifications-data";

function NotificationTypeIcon({ tone }: { tone: NotificationTone }) {
  if (tone === "emergency") {
    return (
      <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 text-[#D64545]" />
      </div>
    );
  }

  if (tone === "cancelled") {
    return (
      <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
        <XCircle className="h-5 w-5 text-red-500" />
      </div>
    );
  }

  if (tone === "rescheduled") {
    return (
      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <RefreshCw className="h-5 w-5 text-blue-500" />
      </div>
    );
  }

  if (tone === "scheduled") {
    return (
      <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
        <Calendar className="h-5 w-5 text-green-600" />
      </div>
    );
  }

  return (
    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
      <Folder className="h-5 w-5 text-amber-500" />
    </div>
  );
}

function NotificationList({ items }: { items: NotificationItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-90 items-center justify-center px-6 text-center">
        <p className="text-sm font-medium text-teal-700">
          No important updates are available at this time.
          <br />
          Please keep checking Notifications to view them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-5 py-4 fade-slide-in">
      {items.map((item) => (
        <Card key={item.id} tabIndex={0} className="notification-card rounded-xl border border-gray-200 p-4 shadow-none cursor-pointer">
          <div className="flex items-start gap-3">
            <NotificationTypeIcon tone={item.tone} />
            <div className="min-w-0 flex-1">
              <p className={`text-base font-semibold leading-snug ${item.section === "emergency" ? "text-[#D64545]" : "text-gray-900"}`}>
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
              <p className="mt-1 text-xs text-gray-400">{item.time}</p>
            </div>
            <ChevronRight className="notification-chevron mt-1 h-5 w-5 shrink-0 text-gray-400" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <NotificationsPageContent />
    </Suspense>
  );
}

function NotificationsPageContent() {
  const searchParams = useSearchParams();
  const [activeDateLabel] = useState("Jun 24, 2022 · Today");
  const [inviteOpen, setInviteOpen] = useState(false);
  const requestedTab = searchParams.get("tab");
  const defaultSectionTab: NotificationSection =
    requestedTab === "updates" || requestedTab === "appointments" || requestedTab === "emergency"
      ? requestedTab
      : "updates";

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-gray-50">
      <header className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-white px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-emerald-100">
            <AvatarFallback className="bg-amber-300 text-sm font-semibold text-emerald-900">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="px-2 text-sm font-semibold text-teal-700">{activeDateLabel}</p>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
            <ChevronRight className="h-4 w-4" />
          </Button>
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

      <main className="min-h-0 flex-1 p-4 sm:p-6">
        <div className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="flex items-center px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-teal-700">Notifications</h2>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue={defaultSectionTab} className="h-[calc(100%-81px)] min-w-0">
            <div className="px-5 py-4">
              <TabsList className="flex h-14 w-full min-w-0 items-stretch gap-0 overflow-hidden rounded-xl bg-gray-100 p-1">
                <TabsTrigger value="updates" className="tab-trigger-primary min-w-0 flex-1 rounded-lg px-3 text-sm font-semibold capitalize data-[state=active]:bg-emerald-100 data-[state=active]:text-teal-700 data-[state=inactive]:text-gray-700 data-[state=inactive]:cursor-pointer">updates</TabsTrigger>
                <TabsTrigger value="appointments" className="tab-trigger-primary min-w-0 flex-1 rounded-lg px-3 text-sm font-semibold capitalize data-[state=active]:bg-emerald-100 data-[state=active]:text-teal-700 data-[state=inactive]:text-gray-700 data-[state=inactive]:cursor-pointer">appointments</TabsTrigger>
                <TabsTrigger value="emergency" className="tab-trigger-primary min-w-0 flex-1 rounded-lg px-3 text-sm font-semibold capitalize data-[state=active]:bg-emerald-100 data-[state=active]:text-teal-700 data-[state=inactive]:text-gray-700 data-[state=inactive]:cursor-pointer">emergency</TabsTrigger>
              </TabsList>
            </div>

            <Separator />

            <TabsContent value="updates" className="mt-0 h-[calc(100%-101px)] min-w-0">
              <Tabs defaultValue="subscribed" className="h-full min-w-0">
                <div className="px-5 py-3">
                  <TabsList className="flex h-12 w-full min-w-0 items-stretch gap-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-1">
                    {updatesFilters.map((filter) => (
                      <TabsTrigger key={filter} value={filter} className="tab-trigger-secondary min-w-0 flex-1 rounded-md px-3 text-sm font-medium capitalize text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:cursor-pointer">
                        {filter}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {updatesFilters.map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-0 h-[calc(100%-58px)] min-w-0">
                    <ScrollArea className="h-full">
                      <NotificationList items={getFilteredNotifications("updates", filter)} />
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="appointments" className="mt-0 h-[calc(100%-101px)] min-w-0">
              <Tabs defaultValue="all" className="h-full min-w-0">
                <div className="px-5 py-3">
                  <TabsList className="flex h-12 w-full min-w-0 items-stretch gap-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-1">
                    {medicalFilters.map((filter) => (
                      <TabsTrigger key={filter} value={filter} className="tab-trigger-secondary min-w-0 flex-1 rounded-md px-3 text-sm font-medium capitalize text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:cursor-pointer">
                        {filter}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {medicalFilters.map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-0 h-[calc(100%-58px)] min-w-0">
                    <ScrollArea className="h-full">
                      <NotificationList items={getFilteredNotifications("appointments", filter)} />
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="emergency" className="mt-0 h-[calc(100%-101px)] min-w-0">
              <Tabs defaultValue="all" className="h-full min-w-0">
                <div className="px-5 py-3">
                  <TabsList className="flex w-full min-w-0 items-stretch gap-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-1">
                    {medicalFilters.map((filter) => (
                      <TabsTrigger key={filter} value={filter} className="tab-trigger-secondary min-w-0 flex-1 rounded-md px-3 text-sm font-medium capitalize text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:cursor-pointer">
                        {filter}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {medicalFilters.map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-0 h-[calc(100%-58px)] min-w-0">
                    <ScrollArea className="h-full">
                      <NotificationList items={getFilteredNotifications("emergency", filter)} />
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
