import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import DownloadReportButton from "@/components/DownloadReportButton";

const patient = {
  name: "Priyanka",
  id: "8700549874",
  photo: "/patient-priyanka.jpg",
};

const caseSheets: Record<
  string,
  {
    doctor: {
      name: string;
      degree: string;
      regNo: string;
      hospital: string;
      address: string;
      phone: string;
      timings: string;
      closed: string;
    };
    meta: {
      patientId: string;
      address: string;
      vitals: string;
      phone: string;
      date: string;
    };
    complaints: string[];
    findings: string[];
    diagnosis: string;
    caseMeds: Array<{ name: string; dosage: string; duration: string }>;
    summaryMeds: Array<{
      name: string;
      form: string;
      dosage: string;
      days: string;
      notes: string;
      timings: string[];
    }>;
    labTests: string[];
    advice: string[];
    download: { filename: string; sizeLabel: string };
  }
> = {
  "1": {
    doctor: {
      name: "Dr. Ravindra Kumar",
      degree: "M.S.",
      regNo: "MMC 2018",
      hospital: "SMS hospital",
      address: "B/503, Business Center, MG Road, Pune",
      phone: "5465647658",
      timings: "09:00 AM - 01:00 PM, 06:00 PM - 08:00 PM",
      closed: "Sunday",
    },
    meta: {
      patientId: "11 - OPD6 PATIENT (M)",
      address: "PUNE",
      vitals: "Weight (Kg): 80, Height (Cm): 200 (B.M.I.: 20.00)",
      phone: "9423380390",
      date: "30-Aug-2023",
    },
    complaints: ["Fever with chills (4 days)", "Headache (2 days)"],
    findings: ["These are test findings for a test patient", "Entering sample diagnosis and sample prescription"],
    diagnosis: "Malaria",
    caseMeds: [
      { name: "Abciximab", dosage: "1 Morning", duration: "8 Days" },
      { name: "Vomilast", dosage: "1 Morning, 1 Night", duration: "8 Days" },
      { name: "Zoclar 500", dosage: "1 Morning", duration: "4 Days" },
    ],
    summaryMeds: [
      {
        name: "Abciximab",
        form: "Tablet",
        dosage: "01",
        days: "8",
        notes: "Tablets should be taken with warm milk",
        timings: ["Breakfast", "Dinner"],
      },
      {
        name: "Vomilast",
        form: "Tablet",
        dosage: "01",
        days: "8",
        notes: "Treats skin fungal infections. Apply thinly to the affected area twice daily.",
        timings: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        name: "Zoclar",
        form: "Capsule",
        dosage: "01",
        days: "8",
        notes: "Tablets should be taken with warm milk",
        timings: ["Breakfast", "Dinner"],
      },
    ],
    labTests: ["Complete Blood Count (CBC)", "Fasting sugar", "Others"],
    advice: ["Take bedrest", "Avoid foods high in salt, sugar and oil", "Wear mask when travelling"],
    download: { filename: "case_sheet_ravindra.pdf", sizeLabel: "1.2 MB" },
  },
  "2": {
    doctor: {
      name: "Dr. Sukumar Sharma",
      degree: "M.S. (Ortho)",
      regNo: "MMC 2234",
      hospital: "Ortho Care Center",
      address: "11, Market Road, Pune",
      phone: "9822011122",
      timings: "10:00 AM - 02:00 PM, 05:00 PM - 07:00 PM",
      closed: "Wednesday",
    },
    meta: {
      patientId: "21 - OPD2 PATIENT (F)",
      address: "PUNE",
      vitals: "Weight (Kg): 62, Height (Cm): 168 (B.M.I.: 21.97)",
      phone: "9911223344",
      date: "12-Sep-2023",
    },
    complaints: ["Knee pain (2 weeks)", "Difficulty walking (1 week)"],
    findings: ["Mild swelling of right knee", "Restricted flexion"],
    diagnosis: "Knee sprain",
    caseMeds: [
      { name: "Ibuprofen 400", dosage: "1 Morning, 1 Night", duration: "5 Days" },
      { name: "Calcium D3", dosage: "1 Morning", duration: "10 Days" },
      { name: "Cold pack", dosage: "Twice daily", duration: "7 Days" },
    ],
    summaryMeds: [
      {
        name: "Ibuprofen",
        form: "Tablet",
        dosage: "01",
        days: "5",
        notes: "After meals",
        timings: ["Breakfast", "Dinner"],
      },
      {
        name: "Calcium D3",
        form: "Tablet",
        dosage: "01",
        days: "10",
        notes: "Once daily",
        timings: ["Lunch"],
      },
      {
        name: "Cold pack",
        form: "Therapy",
        dosage: "02",
        days: "7",
        notes: "Apply on affected area",
        timings: ["Breakfast", "Dinner"],
      },
    ],
    labTests: ["X-Ray Knee", "Vitamin D", "CBC"],
    advice: ["Avoid stairs", "Use knee support", "Light stretching exercises"],
    download: { filename: "case_sheet_sukumar.pdf", sizeLabel: "980 KB" },
  },
  "3": {
    doctor: {
      name: "Dr. Krishnakumar V.",
      degree: "M.D.",
      regNo: "MMC 3319",
      hospital: "Mind Care Clinic",
      address: "88, Lake View Road, Pune",
      phone: "9876501234",
      timings: "11:00 AM - 03:00 PM, 06:00 PM - 08:00 PM",
      closed: "Monday",
    },
    meta: {
      patientId: "31 - OPD9 PATIENT (M)",
      address: "PUNE",
      vitals: "Weight (Kg): 70, Height (Cm): 175 (B.M.I.: 22.86)",
      phone: "9000011111",
      date: "05-Nov-2023",
    },
    complaints: ["Poor sleep (3 weeks)", "Low mood (2 weeks)"],
    findings: ["Mild anxiety symptoms", "Sleep pattern irregular"],
    diagnosis: "Adjustment disorder",
    caseMeds: [
      { name: "Melatonin", dosage: "1 Night", duration: "10 Days" },
      { name: "Magnesium", dosage: "1 Night", duration: "14 Days" },
      { name: "Breathing exercise", dosage: "Daily", duration: "14 Days" },
    ],
    summaryMeds: [
      {
        name: "Melatonin",
        form: "Tablet",
        dosage: "01",
        days: "10",
        notes: "30 mins before sleep",
        timings: ["Dinner"],
      },
      {
        name: "Magnesium",
        form: "Tablet",
        dosage: "01",
        days: "14",
        notes: "After dinner",
        timings: ["Dinner"],
      },
      {
        name: "Breathing",
        form: "Exercise",
        dosage: "10",
        days: "14",
        notes: "Minutes daily",
        timings: ["Breakfast"],
      },
    ],
    labTests: ["Vitamin B12", "TSH", "HbA1c"],
    advice: ["Maintain sleep routine", "Avoid screens after 9 PM", "Daily walk"],
    download: { filename: "case_sheet_krishna.pdf", sizeLabel: "1.0 MB" },
  },
  "4": {
    doctor: {
      name: "Dr. Vijayalakshmi S.",
      degree: "M.D.",
      regNo: "MMC 4101",
      hospital: "City Health Center",
      address: "40, Park Street, Pune",
      phone: "9898989898",
      timings: "09:30 AM - 01:30 PM, 05:30 PM - 07:30 PM",
      closed: "Thursday",
    },
    meta: {
      patientId: "44 - OPD3 PATIENT (F)",
      address: "PUNE",
      vitals: "Weight (Kg): 58, Height (Cm): 160 (B.M.I.: 22.66)",
      phone: "9332211000",
      date: "20-Dec-2023",
    },
    complaints: ["Seasonal cold (5 days)", "Sore throat (3 days)"],
    findings: ["Mild throat inflammation", "No fever"],
    diagnosis: "Viral upper respiratory infection",
    caseMeds: [
      { name: "Cetirizine", dosage: "1 Night", duration: "5 Days" },
      { name: "Gargle", dosage: "Twice daily", duration: "5 Days" },
      { name: "Vitamin C", dosage: "1 Morning", duration: "7 Days" },
    ],
    summaryMeds: [
      {
        name: "Cetirizine",
        form: "Tablet",
        dosage: "01",
        days: "5",
        notes: "Night only",
        timings: ["Dinner"],
      },
      {
        name: "Gargle",
        form: "Therapy",
        dosage: "02",
        days: "5",
        notes: "Warm salt water",
        timings: ["Breakfast", "Dinner"],
      },
      {
        name: "Vitamin C",
        form: "Tablet",
        dosage: "01",
        days: "7",
        notes: "After breakfast",
        timings: ["Breakfast"],
      },
    ],
    labTests: ["CBC", "Allergy panel", "Fasting sugar"],
    advice: ["Warm fluids", "Steam inhalation", "Avoid cold drinks"],
    download: { filename: "case_sheet_vijaya.pdf", sizeLabel: "920 KB" },
  },
};

export default function PrescriptionCaseSheetPage({
  searchParams,
}: {
  searchParams?: { doctor?: string | string[] };
}) {
  const doctorKey = Array.isArray(searchParams?.doctor)
    ? searchParams?.doctor?.[0]
    : searchParams?.doctor;
  const selectedCaseSheet = caseSheets[doctorKey ?? ""] ?? caseSheets["1"];
  const medsCount = selectedCaseSheet.summaryMeds.length;
  return (
    <div className="flex min-h-screen bg-[#f6fbf9]">
      <main className="flex-1 lg:ml-20">
        <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 bg-[#f6fbf9] px-6 py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-extrabold text-[#065b4b]">Hello {patient.name}</h1>
              <p className="text-sm font-semibold text-gray-500">Patient Id:&nbsp; {patient.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/patient-dashboard/appointments"
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-[#228573]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
            <Link
              href="/patient-dashboard/new-appointment"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#228573] px-5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              New Appointment
            </Link>
          </div>
        </header>

        <section className="px-6 pb-10">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <Card className="rounded-3xl border border-[#e4f0ed] bg-[#ecf6f3] shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-[#1f2a27]">Case Sheet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-2xl border border-[#e4e7eb] bg-white p-6">
                  <div className="mx-auto max-w-2xl text-xs text-gray-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-[#1f2a27]">
                          {selectedCaseSheet.doctor.name}
                        </p>
                        <p className="text-[11px]">{selectedCaseSheet.doctor.degree}</p>
                        <p className="text-[11px]">Reg. No: {selectedCaseSheet.doctor.regNo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#1f2a27]">
                          {selectedCaseSheet.doctor.hospital}
                        </p>
                        <p className="text-[11px]">{selectedCaseSheet.doctor.address}</p>
                        <p className="text-[11px]">
                          Ph: {selectedCaseSheet.doctor.phone}, Timing: {selectedCaseSheet.doctor.timings}
                        </p>
                        <p className="text-[11px]">Closed: {selectedCaseSheet.doctor.closed}</p>
                      </div>
                    </div>

                    <div className="my-4 border-t border-[#e4e7eb]" />

                    <div className="grid grid-cols-2 gap-4 text-[11px]">
                      <div>
                        <p className="font-semibold text-[#1f2a27]">
                          ID: {selectedCaseSheet.meta.patientId}
                        </p>
                        <p>Address: {selectedCaseSheet.meta.address}</p>
                        <p>{selectedCaseSheet.meta.vitals}</p>
                      </div>
                      <div className="text-right">
                        <p>Mob. No: {selectedCaseSheet.meta.phone}</p>
                        <p>Date: {selectedCaseSheet.meta.date}</p>
                      </div>
                    </div>

                    <div className="my-4 border-t border-[#e4e7eb]" />

                    <div className="grid grid-cols-2 gap-6 text-[11px]">
                      <div>
                        <p className="font-semibold text-[#1f2a27]">Chief Complaints</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          {selectedCaseSheet.complaints.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2a27]">Clinical Findings</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          {selectedCaseSheet.findings.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="my-4 border-t border-[#e4e7eb]" />

                    <div className="text-[11px]">
                      <p className="font-semibold text-[#1f2a27]">Diagnosis</p>
                      <p className="mt-2">{selectedCaseSheet.diagnosis}</p>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                      {["Medicine Name", "Dosage", "Duration"].map((label) => (
                        <div key={label} className="rounded border border-[#e4e7eb] bg-[#f7f7f7] p-2 font-semibold">
                          {label}
                        </div>
                      ))}
                      <div className="col-span-3 grid grid-cols-3 gap-2">
                        {selectedCaseSheet.caseMeds.flatMap((row) => [
                          row.name,
                          row.dosage,
                          row.duration,
                        ]).map((cell, index) => (
                          <div key={`${cell}-${index}`} className="rounded border border-[#e4e7eb] p-2">
                            {cell}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <DownloadReportButton
                      filename={selectedCaseSheet.download.filename}
                      sizeLabel={selectedCaseSheet.download.sizeLabel}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-3xl border border-[#e4f0ed] bg-white shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-[#1f2a27]">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#1f2a27]">{medsCount} Medications</p>
                    <div className="flex gap-2 text-xs">
                      <Badge className="rounded-full bg-[#e9f6f2] text-[#1f2a27]">Breakfast</Badge>
                      <Badge className="rounded-full bg-[#e9f6f2] text-[#1f2a27]">Lunch</Badge>
                      <Badge className="rounded-full bg-[#e9f6f2] text-[#1f2a27]">Dinner</Badge>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#ecf6f3] px-4 py-3 text-xs font-semibold text-[#1f2a27]">
                    <div className="grid grid-cols-[1.1fr_0.6fr_0.5fr_1.3fr] gap-3">
                      <span>Name</span>
                      <span>Dosage</span>
                      <span>Days</span>
                      <span>Notes</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedCaseSheet.summaryMeds.map((med) => (
                      <div key={med.name} className="grid grid-cols-[1.1fr_0.6fr_0.5fr_1.3fr] gap-3 text-xs text-[#1f2a27]">
                        <div>
                          <p className="text-sm font-semibold">{med.name}</p>
                          <Badge className="mt-2 w-fit rounded-full bg-[#f4d9d1] text-[#9a4d3e]">{med.form}</Badge>
                          <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-[#1f2a27]">
                            {med.timings.map((timing) => (
                              <span key={timing} className="rounded-full bg-[#e9f6f2] px-2 py-0.5">
                                {timing}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-semibold">{med.dosage}</p>
                        <p className="text-sm font-semibold">{med.days}</p>
                        <p className="text-[11px] text-[#5b6c68]">{med.notes}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#1f2a27]">Recommended Lab tests</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedCaseSheet.labTests.map((test) => (
                        <Badge key={test} variant="outline" className="rounded-full border-[#d3e8e2] text-[#1f2a27]">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#fff2d5] p-4">
                    <p className="text-sm font-semibold text-[#1f2a27]">Doctor&apos;s advice</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#6b5c38]">
                      {selectedCaseSheet.advice.map((advice) => (
                        <li key={advice}>{advice}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
