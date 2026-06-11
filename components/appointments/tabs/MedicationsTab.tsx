"use client";

import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MedicationsTab({ patient }: { patient: any }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Current Medications</h2>
        <div className="space-y-4">
          <Card className="rounded-xl border-gray-100 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800">Metformin</h3>
                  <p className="text-xs text-gray-500 mt-1">500 mg twice daily</p>
                  <p className="text-xs text-gray-400 mt-0.5">For Diabetes management</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-gray-100 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800">Insulin Glargine</h3>
                  <p className="text-xs text-gray-500 mt-1">10 units at bedtime</p>
                  <p className="text-xs text-gray-400 mt-0.5">For Diabetes management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
