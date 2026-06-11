"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { labReports } from "../data";

export function LabReportsTab({ patient }: { patient: any }) {
  const [subTab, setSubTab] = useState("recent");

  const fileIcon = (type: string) => {
    if (type === "pdf") return <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-red-600" /></div>;
    return <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-blue-600" /></div>;
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Sub-tabs */}
        <div className="flex items-center border-b border-gray-100 px-6">
          <button
            onClick={() => setSubTab("recent")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              subTab === "recent"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSubTab("previous")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              subTab === "previous"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Previous
          </button>
        </div>

        <div className="p-6 space-y-2">
          {labReports.map((report, idx) => (
            <div key={idx}>
              <div className="flex items-start gap-4 py-4 hover:bg-gray-50 rounded-xl px-3 cursor-pointer transition-colors">
                {fileIcon(report.type)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800">{report.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {report.lab} {report.size} {report.version}, {report.time}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Last Updated at: {report.updated}
                  </p>
                </div>
              </div>
              {idx < labReports.length - 1 && <Separator className="mx-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
