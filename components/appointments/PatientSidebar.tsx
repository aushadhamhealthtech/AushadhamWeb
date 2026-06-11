"use client";

import {
  Share2,
  ArrowLeft,
  Pencil,
  User,
  Cake,
  Droplets,
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldAlert,
  Users,
  Paperclip,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CollapsibleSection } from "./CollapsibleSection";

export function PatientSidebar({ patient }: { patient: any }) {
  return (
    <div className="w-72 shrink-0 border-r border-gray-100 bg-white overflow-y-auto">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-amber-300">
            <AvatarFallback className="bg-amber-100 text-amber-700 text-2xl font-bold">
              {patient.initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center border-2 border-white">
            <MessageCircle className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        <h3 className="text-base font-bold text-gray-800 mt-3">{patient.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600">Diagnosed :</span>
          {patient.diagnosed.map((d: string, i: number) => (
            <span key={d}>
              <span className="text-sm font-semibold text-red-500">{d}</span>
              {i < patient.diagnosed.length - 1 && (
                <span className="text-gray-300 mx-1">|</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <Separator />

      {/* Patient Details */}
      <CollapsibleSection
        icon={<User className="w-4 h-4 text-gray-600" />}
        title="Patient Details"
        defaultOpen={true}
        actions={
          <Button variant="ghost" size="icon" aria-label="Edit patient details" className="w-6 h-6 p-0" onClick={(e) => e.stopPropagation()}>
            <Pencil className="w-3.5 h-3.5 text-gray-400" />
          </Button>
        }
      >
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <Cake className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="text-sm text-gray-700">{patient.age} years ({patient.dob})</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-sm text-gray-700">{patient.gender}</span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-sm text-gray-700">{patient.bloodGroup}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-sm text-gray-700">{patient.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-green-600 shrink-0" />
            <span className="text-sm text-gray-700">{patient.phone}</span>
            <Button variant="ghost" size="icon" aria-label="Call patient" className="w-5 h-5 p-0">
              <Phone className="w-3 h-3 text-gray-400" />
            </Button>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 leading-relaxed">{patient.address}</span>
          </div>
        </div>
      </CollapsibleSection>

      {/* Medical History */}
      <CollapsibleSection
        icon={<Heart className="w-4 h-4 text-red-500" />}
        title="Medical History"
      >
        <p className="text-sm text-gray-500">No medical history recorded.</p>
      </CollapsibleSection>

      {/* Allergies */}
      <CollapsibleSection
        icon={<ShieldAlert className="w-4 h-4 text-red-500" />}
        title="Allergies"
      >
        <p className="text-sm text-gray-500">No allergies recorded.</p>
      </CollapsibleSection>

      {/* Family History */}
      <CollapsibleSection
        icon={<Users className="w-4 h-4 text-red-500" />}
        title="Family History"
      >
        <p className="text-sm text-gray-500">No family history recorded.</p>
      </CollapsibleSection>

      {/* Attachments */}
      <CollapsibleSection
        icon={<Paperclip className="w-4 h-4 text-gray-600" />}
        title="Attachments"
      >
        <p className="text-sm text-gray-500">No attachments.</p>
      </CollapsibleSection>
    </div>
  );
}
