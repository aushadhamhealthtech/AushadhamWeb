import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import DownloadReportButton from "@/components/DownloadReportButton";

const patient = {
  name: "Priyanka",
  id: "8700549874",
  photo: "/patient-priyanka.jpg",
};

const reportDetails: Record<
  string,
  {
    title: string;
    date: string;
    doctor: string;
    download: { filename: string; sizeLabel: string };
    highlights: Array<{ label: string; value: string; unit: string; trend: "up" | "down" }>;
  }
> = {
  cbc: {
    title: "The Complete Blood Count Report",
    date: "27-08-24",
    doctor: "Dr. Nakul Raj Parekh",
    download: { filename: "complete_blood_count.pdf", sizeLabel: "1708 kb" },
    highlights: [
      { label: "Red blood Cells (RBC)", value: "1.8", unit: "M/mcL", trend: "down" },
      { label: "Hemoglobin (HB/Hgb)", value: "6.5", unit: "g/dL", trend: "down" },
      { label: "Hemoglobin (HB/Hgb)", value: "6.5", unit: "g/dL", trend: "up" },
      { label: "Red blood Cells (RBC)", value: "1.8", unit: "M/mcL", trend: "down" },
    ],
  },
  "lipid-panel": {
    title: "Lipid Panel Report",
    date: "20-12-23",
    doctor: "Dr. Nakul Raj Parekh",
    download: { filename: "lipid_panel.pdf", sizeLabel: "1260 kb" },
    highlights: [
      { label: "LDL Cholesterol", value: "110", unit: "mg/dL", trend: "down" },
      { label: "HDL Cholesterol", value: "42", unit: "mg/dL", trend: "up" },
      { label: "Triglycerides", value: "160", unit: "mg/dL", trend: "down" },
      { label: "Total Cholesterol", value: "180", unit: "mg/dL", trend: "up" },
    ],
  },
  "fasting-sugar": {
    title: "Fasting Sugar Report",
    date: "20-12-23",
    doctor: "Dr. Nakul Raj Parekh",
    download: { filename: "fasting_sugar.pdf", sizeLabel: "980 kb" },
    highlights: [
      { label: "Fasting Glucose", value: "96", unit: "mg/dL", trend: "down" },
      { label: "HbA1c", value: "6.2", unit: "%", trend: "up" },
      { label: "Insulin", value: "12", unit: "uIU/mL", trend: "down" },
      { label: "Estimated Avg Glucose", value: "110", unit: "mg/dL", trend: "down" },
    ],
  },
};

export default async function MedicalReportDetailPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const normalizedId = reportId?.toLowerCase();
  const report = reportDetails[reportId] ?? reportDetails[normalizedId] ?? reportDetails.cbc;

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
              href="/patient-dashboard/medical-reports"
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-[#228573]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
            <Link
              href="/patient-dashboard/new-appointment"
              className="inline-flex h-10 items-center rounded-full bg-[#228573] px-5 text-sm font-semibold text-white"
            >
              New Appointment
            </Link>
          </div>
        </header>

        <section className="px-6 pb-10">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <Card className="rounded-3xl border border-[#e4f0ed] bg-[#ecf6f3] shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-[#1f2a27]">Full report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-2xl border border-[#e4e7eb] bg-white p-6">
                  <div className="mx-auto max-w-2xl text-center text-xs text-gray-500">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                      {report.title}
                    </p>
                    <div className="mt-4 grid grid-cols-4 gap-2 text-left text-[11px]">
                      <div className="col-span-2 rounded border border-gray-200 p-2">
                        University Medical Center, Dept. of Pathology
                      </div>
                      <div className="rounded border border-gray-200 p-2">Report Date/Time</div>
                      <div className="rounded border border-gray-200 p-2">{report.date}</div>
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-2 text-left text-[11px]">
                      {[
                        "Patient ID",
                        "Age/Sex",
                        "DOB",
                        "Ordering Dr",
                        "Physician Copy",
                      ].map((label) => (
                        <div key={label} className="rounded border border-gray-200 p-2">
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-6 gap-2 text-left text-[11px]">
                      {["Test", "Normal", "Abnormal", "Flag", "Units", "Reference Range"].map((label) => (
                        <div key={label} className="rounded border border-gray-200 bg-[#f7f7f7] p-2 font-semibold">
                          {label}
                        </div>
                      ))}
                      {[
                        ["Complete Blood Count", "", "", "", "", ""],
                        ["Red Blood Cell (RBC)", "", "", "L", "M/mcL", "4.7-6.1"],
                        ["Hemoglobin (HB/Hgb)", "", "", "L", "g/dL", "14.0-18.0"],
                        ["Hematocrit (HCT)", "", "", "L", "%", "42-52"],
                        ["Platelet Count", "", "", "", "K/mcL", "150-450"],
                      ].map((row, idx) => (
                        <div key={`${row[0]}-${idx}`} className="col-span-6 grid grid-cols-6 gap-2">
                          {row.map((cell, cellIndex) => (
                            <div key={`${cell}-${cellIndex}`} className="rounded border border-gray-200 p-2">
                              {cell}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <DownloadReportButton
                      filename={report.download.filename}
                      sizeLabel={report.download.sizeLabel}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-3xl border border-[#e4f0ed] bg-[#ecf6f3] shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5f2] text-[#228573]">
                      <Plus className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#1f2a27]">Major Highlights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {report.highlights.map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className={`rounded-2xl px-4 py-3 ${
                        index % 2 === 0 ? "bg-[#fde6d7]" : "bg-white"
                      }`}
                    >
                      <p className="flex items-center gap-1 text-xl font-bold text-[#1f2a27]">
                        {item.value}
                        {item.trend === "down" ? (
                          <ArrowDown className="h-4 w-4 text-[#1f2a27]" />
                        ) : (
                          <ArrowUp className="h-4 w-4 text-[#1f2a27]" />
                        )}
                      </p>
                      <p className="text-xs text-gray-600">RR* 4.7-6.1</p>
                      <p className="text-xs font-semibold text-gray-700">
                        {item.label}
                        <span className="text-gray-500"> ({item.unit})</span>
                      </p>
                    </div>
                  ))}
                  <p className="col-span-2 text-xs text-gray-500">
                    Please consult a doctor for better understanding of the results
                  </p>
                  <p className="col-span-2 text-[11px] text-gray-400">* RR - Reference range</p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-[#e4f0ed] bg-[#ecf6f3] shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5f2] text-[#228573]">
                      <Plus className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#1f2a27]">Historical Data*</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className="rounded-full bg-[#0f8070] text-white hover:bg-[#0f8070]">RBC</Badge>
                    <Badge variant="outline" className="rounded-full">Hemoglobin</Badge>
                    <Badge variant="outline" className="rounded-full">Platelet count</Badge>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <div className="h-32 w-full rounded-xl bg-[#fde9a6]" />
                    <svg viewBox="0 0 240 110" className="-mt-28 h-32 w-full" aria-hidden>
                      <path
                        d="M10 20 C 80 30, 120 40, 170 60 C 200 75, 220 90, 230 95"
                        stroke="#f4a12c"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>12 Dec 2023</span>
                      <span>11 Jul</span>
                      <span>13 Nov</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    * Data collected from two reports in data base CBC_1 and CBC_2. Ideal range 4.7-6.1
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
