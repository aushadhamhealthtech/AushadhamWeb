"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type TabKey = "suggestions" | "doctors" | "history" | "reports";

const suggestionRows = [
  { label: "Dentists near you", results: 20 },
  { label: "Dental Surgeons near you", results: 15 },
  { label: "Dentist in Appointment history", results: 0 },
  { label: "Dental Records in Reports", results: 0 },
];

const doctorResults = [
  { id: 1, name: "Dr. Sunil Shinde", location: "Bengaluru", tags: ["dentist"] },
  { id: 2, name: "Dr. Sukumar Bhattacharya", location: "Bengaluru", tags: ["dentist"] },
  { id: 3, name: "Dr. Amala Krishnan", location: "Bengaluru", tags: ["dentist"] },
];

const historyResults = [
  { id: 1, name: "Dr. Sunil Shinde", location: "Bengaluru", date: "20-12-24", status: "Upcoming!" },
  { id: 2, name: "Dr. Sunil Shinde", location: "Bengaluru", date: "20-10-24" },
  { id: 3, name: "Dr. Sunil Shinde", location: "Bengaluru", date: "02-12-23" },
];

const reportResults = [
  { id: 1, title: "Dental health record", doctor: "Dr. Nakul Parekh", date: "20-12-24" },
  { id: 2, title: "Dental X-Ray", doctor: "Dr. Shivakumar Sudarshan", date: "01-02-24" },
  { id: 3, title: "Dental Oral examination", doctor: "Dr. Narasimha Nair", date: "03-08-23" },
];

export default function PatientSearchPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("suggestions");
  const [searchTerm, setSearchTerm] = useState("Dentist");

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredDoctors = useMemo(() => {
    if (!normalizedQuery) return doctorResults;
    return doctorResults.filter((item) =>
      [item.name, item.location, ...item.tags].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [normalizedQuery]);

  const filteredHistory = useMemo(() => {
    if (!normalizedQuery) return historyResults;
    return historyResults.filter((item) =>
      [item.name, item.location, item.date].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [normalizedQuery]);

  const filteredReports = useMemo(() => {
    if (!normalizedQuery) return reportResults;
    return reportResults.filter((item) =>
      [item.title, item.doctor, item.date].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [normalizedQuery]);

  const handleBack = () => {
    if (activeTab !== "suggestions") {
      setActiveTab("suggestions");
      return;
    }
    router.back();
  };

  const emptyMessage = (() => {
    if (activeTab === "history") {
      return "Search for doctors to book a new appointment";
    }
    if (activeTab === "reports") {
      return "Add reports";
    }
    return "Try searching in other categories";
  })();

  return (
    <main className="min-h-screen px-4 py-8 lg:ml-20 lg:px-8 bg-[#f6fbf9]">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="rounded-[32px] border border-[#eef4f2] bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Go back"
                  className="h-9 w-9 rounded-full"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold text-[#1f2432]">Search</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close search"
                className="h-9 w-9 rounded-full"
                onClick={() => router.back()}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search"
                  className="h-12 rounded-full border-[#eef2f1] bg-white pl-11 text-base"
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-[#1f2432]">Search for</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className={`rounded-full border-[#e6ecea] px-5 py-2 text-sm font-semibold ${
                    activeTab === "doctors" ? "bg-[#c9f0e7] text-[#0f6f63]" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("doctors")}
                >
                  Doctors
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-full border-[#e6ecea] px-5 py-2 text-sm font-semibold ${
                    activeTab === "history" ? "bg-[#c9f0e7] text-[#0f6f63]" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  Appointment history
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-full border-[#e6ecea] px-5 py-2 text-sm font-semibold ${
                    activeTab === "reports" ? "bg-[#c9f0e7] text-[#0f6f63]" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("reports")}
                >
                  Reports
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f7f7f7] p-4">
              {activeTab === "suggestions" && (
                <div className="space-y-3">
                  {suggestionRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <p className="text-[#4b5c59]">{row.label}</p>
                      <span className="font-semibold text-[#1a8f7a]">{row.results} results</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "doctors" && (
                <div className="space-y-3">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-sm text-[#1f2432]">
                      <span className="font-semibold">0 results found</span>
                      <span className="ml-2 text-[#1a8f7a]">{emptyMessage}</span>
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/doctor-sunil.jpg" alt={doctor.name} />
                          <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-[#1f2432]">{doctor.name}</p>
                          <p className="text-xs text-[#6b7b77]">{doctor.location}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-3">
                  {filteredHistory.length === 0 ? (
                    <div className="text-sm text-[#1f2432]">
                      <span className="font-semibold">0 results found</span>
                      <span className="ml-2 text-[#1a8f7a]">{emptyMessage}</span>
                    </div>
                  ) : (
                    filteredHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-[#1f2432]">{item.name}</p>
                          <p className="text-xs text-[#6b7b77]">{item.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#1f2432]">{item.date}</p>
                          {item.status ? (
                            <p className="text-xs font-semibold text-[#1a8f7a]">{item.status}</p>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "reports" && (
                <div className="space-y-3">
                  {filteredReports.length === 0 ? (
                    <div className="text-sm text-[#1f2432]">
                      <span className="font-semibold">0 results found</span>
                      <span className="ml-2 text-[#1a8f7a]">{emptyMessage}</span>
                    </div>
                  ) : (
                    filteredReports.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-[#1f2432]">{item.title}</p>
                          <p className="text-xs text-[#6b7b77]">{item.doctor}</p>
                        </div>
                        <p className="text-sm font-semibold text-[#1f2432]">{item.date}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
  );
}
