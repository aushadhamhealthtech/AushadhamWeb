"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  ShieldAlert,
  Pencil,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PatientSidebar } from "../PatientSidebar";
import { vitals } from "../data";

export function PatientDetailsTab({ patient }: { patient: any }) {
  const [problemsOpen, setProblemsOpen] = useState(true);
  const [testsOpen, setTestsOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(true);

  const problems = [
    "Peanut butter allergy",
    "Dust allergy",
    "Mold allergy",
    "Artificial fragrance allergy",
  ];

  const previousTests = [
    "UV Ultrasound",
    "Blood Test",
    "Sugar Tests",
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <PatientSidebar patient={patient} />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Latest Vitals */}
        <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <Heart className="w-5 h-5 text-teal-600" />
          </div>
          Latest Vitals
        </h2>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {vitals.map((v) => (
            <Card key={v.label} className="rounded-xl border-gray-100 shadow-sm">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${v.color}`}>
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-500 font-medium">{v.label}</span>
                <span className={`text-lg font-bold ${v.highlight ? "text-red-500" : "text-gray-800"}`}>
                  {v.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Problems Section */}
        <div className="border border-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setProblemsOpen(!problemsOpen)}
            className="flex items-center justify-between w-full p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span className="text-base font-semibold text-gray-800">Problems</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 text-gray-400">
                <Pencil className="w-3.5 h-3.5 text-gray-400" />
              </span>
              {problemsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>
          {problemsOpen && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="space-y-3 mt-4">
                {problems.map((problem, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-700">{problem}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Previous Tests Section */}
        <div className="border border-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setTestsOpen(!testsOpen)}
            className="flex items-center justify-between w-full p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-base font-semibold text-gray-800">Previous Tests</span>
            </div>
            {testsOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {testsOpen && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="space-y-3 mt-4">
                {previousTests.map((test, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-700">{test}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="border border-gray-100 rounded-xl">
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            className="flex items-center justify-between w-full p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-base font-semibold text-gray-800">Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 text-gray-400">
                <Pencil className="w-3.5 h-3.5 text-gray-400" />
              </span>
              {notesOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>
          {notesOpen && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-2">Glycemic Control</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Initially managed with oral antidiabetic medications (metformin).
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    Over the years, transitioned to insulin therapy (long-acting and rapid-acting insulin).
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    Requires insulin for survival.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
