"use client";

import { PatientSidebar } from "../PatientSidebar";

export function InsuranceDetailsTab({ patient }: { patient: any }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <PatientSidebar patient={patient} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No insurance details available.</p>
      </div>
    </div>
  );
}
