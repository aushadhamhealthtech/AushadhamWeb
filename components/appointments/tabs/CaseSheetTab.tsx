"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  ShieldAlert,
  Droplets,
  Pencil,
  Heart,
  FileText,
  Plus,
  MessageCircle,
  Search,
  Edit,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vitals } from "../data";

export function CaseSheetTab({ patient }: { patient: any }) {
  const [subTab, setSubTab] = useState("recent");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [illnessOpen, setIllnessOpen] = useState(true);
  const [diagnosisOpen, setDiagnosisOpen] = useState(true);
  const [symptomsOpen, setSymptomsOpen] = useState(true);
  const [medicationOpen, setMedicationOpen] = useState(true);
  const [labTestsOpen, setLabTestsOpen] = useState(true);
  const [anyNotesOpen, setAnyNotesOpen] = useState(true);

  const [patientName, setPatientName] = useState("Kevin Shah");
  const [glycemicControl] = useState(`Initially managed with oral antidiabetic medications (metformin).
Over the years, transitioned to insulin therapy (long-acting and rapid-acting insulin).
Requires insulin for survival.`);
  const [familyHistory] = useState(`Family Members with Diabetes: Her father had type 2 diabetes.
Other Relevant Family Medical Conditions: Her mother had hypertension and osteoarthritis.`);
  const [presentIllness, setPresentIllness] = useState("");
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [presentTags, setPresentTags] = useState(["Diabetes", "High Blood Pressure"]);
  const [diagnosisTags, setDiagnosisTags] = useState(["Low Vitamin B12", "Low Vitamin D", "High BP", "High blood sugar"]);
  const [labTestInput, setLabTestInput] = useState("");
  const [labTestTags, setLabTestTags] = useState(["Complete blood test", "Glucose test", "MRI", "T4/TSH"]);
  const [anyNotes, setAnyNotes] = useState("");
  const [recommendPersonalizedPlan, setRecommendPersonalizedPlan] = useState(false);
  const [planDuration, setPlanDuration] = useState("7");
  const [planDurationUnit, setPlanDurationUnit] = useState("days");
  const [additionalExpert, setAdditionalExpert] = useState("nutritionist");
  const [medications, setMedications] = useState([
    { id: 1, name: "", category: "Category", breakfast: false, breakfastFrequency: "", lunch: false, lunchFrequency: "", dinner: false, dinnerFrequency: "", duration: "", notes: "" },
  ]);

  const addDiagnosisTag = () => {
    const value = diagnosisInput.trim();
    if (!value) return;
    setDiagnosisTags((prev) => [...prev, value]);
    setDiagnosisInput("");
  };

  const removeDiagnosisTag = (tag: string) => {
    setDiagnosisTags((prev) => prev.filter((item) => item !== tag));
  };

  const removePresentTag = (tag: string) => {
    setPresentTags((prev) => prev.filter((item) => item !== tag));
  };

  const addLabTestTag = () => {
    const value = labTestInput.trim();
    if (!value) return;
    const exists = labTestTags.some((item) => item.toLowerCase() === value.toLowerCase());
    if (exists) {
      setLabTestInput("");
      return;
    }
    setLabTestTags((prev) => [...prev, value]);
    setLabTestInput("");
  };

  const removeLabTestTag = (tag: string) => {
    setLabTestTags((prev) => prev.filter((item) => item !== tag));
  };

  const updateMedication = (id: number, key: string, value: string | boolean) => {
    setMedications((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const addMedicationRow = () => {
    setMedications((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        category: "Category",
        breakfast: false,
        breakfastFrequency: "",
        lunch: false,
        lunchFrequency: "",
        dinner: false,
        dinnerFrequency: "",
        duration: "",
        notes: "",
      },
    ]);
  };

  const removeMedicationRow = (id: number) => {
    setMedications((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Sub-tabs */}
      <div className="flex items-center border-b border-gray-100 px-6">
        <div className="flex flex-1">
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
      </div>

      {subTab === "recent" ? (
        <div className="p-6 space-y-5">
          {/* Patient Details Collapsible */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="flex items-center justify-between w-full p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-lg font-bold text-gray-800">Patient Details</span>
              </div>
              {detailsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {detailsOpen && (
              <CardContent className="px-5 pb-5 pt-0 space-y-5">
                <Separator />
                <div>
                  <h3 className="text-[15px] font-bold text-teal-700">Patient Name: {patientName}</h3>
                  <div className="flex items-center gap-4 mt-2 flex-wrap text-xs text-gray-500">
                    <span className="flex items-center gap-1">✦ Patient ID: {patient.id}</span>
                    <span className="flex items-center gap-1">✦ {patient.age} Years</span>
                    <span className="flex items-center gap-1">✦ {patient.gender}</span>
                    <span className="flex items-center gap-1">✦ Location: {patient.location}</span>
                    <span className="flex items-center gap-1">✦ Offline Appointment (mm/dd/yyyy)</span>
                  </div>
                </div>

                {/* Latest Vitals */}
                <div>
                  <h4 className="text-[22px] font-bold text-gray-800 mb-4">Latest Vitals</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {vitals.map((v) => (
                      <div key={v.label} className="rounded-xl border border-gray-100 bg-white p-3 text-center space-y-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto ${v.color}`}>
                          <Heart className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-[10px] text-gray-500">{v.label}</p>
                        <p className={`text-sm font-bold ${v.highlight ? "text-red-500" : "text-gray-800"}`}>
                          {v.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Past History */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Past History</h4>
                  <div className="flex gap-2 flex-wrap mb-5">
                    <Badge className="bg-teal-600 text-white hover:bg-teal-700 rounded-full px-4 py-1.5 text-sm">Summary</Badge>
                    {["HbA1c", "HbA1c", "HbA1c", "HbA1c", "FPG"].map((tag, i) => (
                      <Badge key={i} variant="outline" className="rounded-full px-4 py-1.5 text-sm border-gray-300 text-gray-700 hover:bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Glycemic Control */}
                  <div className="mb-5">
                    <h5 className="text-sm font-bold text-gray-800 mb-2">Glycemic Control</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-1">
                      {glycemicControl.split("\n").map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Family History */}
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 mb-2">Family History</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 ml-1">
                      {familyHistory.split("\n").map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button onClick={() => setIllnessOpen(!illnessOpen)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Present Illness</span>
              </div>
              {illnessOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {illnessOpen && (
              <CardContent className="px-5 pb-5 pt-0 space-y-4">
                <Separator />
                <Input
                  value={presentIllness}
                  onChange={(e) => setPresentIllness(e.target.value)}
                  placeholder="List down any additional symptoms"
                  className="h-12 rounded-full border-0 bg-gray-100 text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  {presentTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1">
                      {tag}
                      <button type="button" className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => removePresentTag(tag)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button onClick={() => setDiagnosisOpen(!diagnosisOpen)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Diagnosis</span>
              </div>
              {diagnosisOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {diagnosisOpen && (
              <CardContent className="px-5 pb-5 pt-0 space-y-4">
                <Separator />
                <div className="flex gap-2">
                  <Input
                    value={diagnosisInput}
                    onChange={(e) => setDiagnosisInput(e.target.value)}
                    placeholder="Search by name"
                    className="h-11 rounded-full border-0 bg-gray-100 text-sm"
                  />
                  <Button type="button" onClick={addDiagnosisTag} className="rounded-full bg-teal-600 hover:bg-teal-700">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {diagnosisTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1">
                      {tag}
                      <button type="button" className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => removeDiagnosisTag(tag)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button onClick={() => setSymptomsOpen(!symptomsOpen)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Symptoms</span>
              </div>
              {symptomsOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {symptomsOpen && (
              <CardContent className="px-5 pb-5 pt-0">
                <Separator className="mb-4" />
                <Textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="List down all the symptoms"
                  className="min-h-16 rounded-3xl border-0 bg-gray-100 text-sm resize-none"
                />
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button onClick={() => setLabTestsOpen(!labTestsOpen)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Lab tests</span>
              </div>
              {labTestsOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {labTestsOpen && (
              <CardContent className="px-5 pb-5 pt-0 space-y-4">
                <Separator />
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <Input
                    value={labTestInput}
                    onChange={(e) => setLabTestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addLabTestTag();
                      }
                    }}
                    placeholder="Search by name"
                    className="h-12 rounded-full border-0 bg-gray-100 pl-11 text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {labTestTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        aria-label={`Remove ${tag}`}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={() => removeLabTestTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button onClick={() => setAnyNotesOpen(!anyNotesOpen)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Any Notes</span>
              </div>
              {anyNotesOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {anyNotesOpen && (
              <CardContent className="px-5 pb-5 pt-0">
                <Separator className="mb-4" />
                <Textarea
                  value={anyNotes}
                  onChange={(e) => setAnyNotes(e.target.value)}
                  placeholder="List down any additional notes or suggestions"
                  className="min-h-16 rounded-3xl border-0 bg-gray-100 text-sm resize-none"
                />
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <button onClick={() => setMedicationOpen(!medicationOpen)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Medication</span>
              </div>
              {medicationOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {medicationOpen && (
              <CardContent className="px-0 pb-5 pt-0">
                <Separator />
                <div className="overflow-x-auto">
                  <div className="min-w-245">
                    <div className="grid grid-cols-[2fr_3fr_1fr_2fr] bg-stone-100 text-gray-800 text-sm font-semibold border-b border-gray-200">
                      <div className="px-4 py-3 border-r border-gray-200">Medicine Name</div>
                      <div className="px-4 py-3 border-r border-gray-200">Medication Time and Frequency</div>
                      <div className="px-4 py-3 border-r border-gray-200">Duration</div>
                      <div className="px-4 py-3">Notes</div>
                    </div>
                    {medications.map((med) => (
                      <div key={med.id} className="grid grid-cols-[2fr_3fr_1fr_2fr] border-b border-gray-100">
                        <div className="px-4 py-3 border-r border-gray-100 space-y-2">
                          <Input
                            value={med.name}
                            onChange={(e) => updateMedication(med.id, "name", e.target.value)}
                            placeholder="Write medicine name"
                            className="h-10 border-0 bg-transparent shadow-none px-0 focus-visible:ring-0"
                          />
                          <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-xs w-fit">{med.category}</Badge>
                        </div>
                        <div className="px-4 py-3 border-r border-gray-100 space-y-2">
                          {[{ label: "Breakfast", flag: "breakfast", freq: "breakfastFrequency" }, { label: "Lunch", flag: "lunch", freq: "lunchFrequency" }, { label: "Dinner", flag: "dinner", freq: "dinnerFrequency" }].map((slot) => (
                            <div key={slot.label} className="grid grid-cols-[1fr_1fr] items-center gap-2">
                              <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                  type="checkbox"
                                  checked={Boolean(med[slot.flag as keyof typeof med])}
                                  onChange={(e) => updateMedication(med.id, slot.flag, e.target.checked)}
                                  className="accent-teal-600"
                                />
                                {slot.label}
                              </label>
                              <Input
                                value={String(med[slot.freq as keyof typeof med] ?? "")}
                                onChange={(e) => updateMedication(med.id, slot.freq, e.target.value)}
                                placeholder="Frequency"
                                className="h-9"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-r border-gray-100">
                          <Input
                            value={med.duration}
                            onChange={(e) => updateMedication(med.id, "duration", e.target.value)}
                            placeholder="Days"
                            className="h-10"
                          />
                        </div>
                        <div className="px-4 py-3 flex items-start gap-2">
                          <Textarea
                            value={med.notes}
                            onChange={(e) => updateMedication(med.id, "notes", e.target.value)}
                            placeholder="Write notes or description if any"
                            className="min-h-14 resize-none"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Remove medication"
                            className="w-8 h-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => removeMedicationRow(med.id)}
                          >
                            <span className="text-lg leading-none">🗑</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button type="button" onClick={addMedicationRow} className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white px-6">
                    <Plus className="w-4 h-4 mr-1" />
                    Add more medicine
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <div className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-[2rem] font-bold text-gray-800">Recommend Personalized Plan</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={recommendPersonalizedPlan}
                aria-label="Recommend personalized plan"
                onClick={() => setRecommendPersonalizedPlan((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  recommendPersonalizedPlan ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    recommendPersonalizedPlan ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {recommendPersonalizedPlan && (
              <CardContent className="px-5 pb-5 pt-0">
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Duration</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={planDuration} onValueChange={setPlanDuration}>
                        <SelectTrigger className="w-full h-10 rounded-lg border-0 bg-gray-100 text-sm">
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={planDurationUnit} onValueChange={setPlanDurationUnit}>
                        <SelectTrigger className="w-full h-10 rounded-lg border-0 bg-gray-100 text-sm">
                          <SelectValue placeholder="Days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Additional Expert</p>
                    <Select value={additionalExpert} onValueChange={setAdditionalExpert}>
                      <SelectTrigger className="w-full h-10 rounded-lg border-0 bg-gray-100 text-sm">
                        <SelectValue placeholder="Select expert" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nutritionist">Nutritionist</SelectItem>
                        <SelectItem value="physiotherapist">Physiotherapist</SelectItem>
                        <SelectItem value="psychologist">Psychologist</SelectItem>
                        <SelectItem value="trainer">Fitness Trainer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="fixed bottom-5 right-8 z-20">
            <Button onClick={() => setSubTab("previous")} className="bg-teal-600 hover:bg-teal-700 text-white rounded-full gap-2 px-6 py-2.5 shadow-sm">
              <MessageCircle className="w-4 h-4" />
              Submit
            </Button>
          </div>
        </div>
      ) : (
        /* Previous tab - empty state with buttons */
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <div className="flex gap-3">
            <Button
              onClick={() => setSubTab("recent")}
              variant="outline"
              className="rounded-full gap-2 px-5 border-gray-300 text-gray-600"
            >
              <Edit className="w-4 h-4" />
              Edit Case Sheet
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full gap-2 px-5">
              <Eye className="w-4 h-4" />
              View File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
