"use client";

import { useParams } from "next/navigation";
import { patientsDatabase } from "@/components/appointments/data";
import { PatientDetailContent } from "@/components/appointments/PatientDetailContent";

export default function AppointmentDetailPage() {
  const params = useParams();
  const patientId = parseInt(params.id as string, 10);
  const patient = patientsDatabase[patientId] || patientsDatabase[1];

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Patient not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientDetailContent patient={patient} />
    </div>
  );
}
