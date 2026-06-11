"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";
import { useUser } from "@/lib/context/user";
import { PatientSidebar } from "./PatientSidebar";
import { CaseSheetTab } from "./tabs/CaseSheetTab";
import { MedicationsTab } from "./tabs/MedicationsTab";
import { LabReportsTab } from "./tabs/LabReportsTab";

export function PatientDetailContent({ patient }: { patient: any }) {
  const { displayName } = useUser();
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("case-sheet");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-emerald-200">
            <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-teal-700">Hi! {displayName}</h1>
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

      {/* Patient Banner */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to appointments"
            className="w-8 h-8 rounded-lg"
            onClick={() => router.push("/appointments")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Avatar className="w-12 h-12 border-2 border-teal-200">
            <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-sm">
              {patient.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold text-teal-700">
              {patient.name} <span className="text-gray-500 font-normal">(patient)</span>
            </h2>
            <div className="flex items-center gap-4 mt-0.5 text-xs text-gray-500">
              <span className="flex items-center gap-1">✦ Patient ID: {patient.id}</span>
              <span className="flex items-center gap-1">✦ {patient.age} Years</span>
              <span className="flex items-center gap-1">✦ {patient.gender}</span>
              <span className="flex items-center gap-1">✦ {patient.appointmentType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none bg-white border-b border-gray-100 h-auto p-0 px-6">
          {[
            { value: "case-sheet", label: "Case Sheet" },
            { value: "medications", label: "Medications" },
            { value: "lab-reports", label: "Lab reports" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="case-sheet" className="flex-1 flex overflow-hidden mt-0">
          <CaseSheetTab patient={patient} />
        </TabsContent>
        <TabsContent value="medications" className="flex-1 flex overflow-hidden mt-0">
          <MedicationsTab patient={patient} />
        </TabsContent>
        <TabsContent value="lab-reports" className="flex-1 flex overflow-hidden mt-0">
          <LabReportsTab patient={patient} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
