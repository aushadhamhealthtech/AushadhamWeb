"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Share2,
  ChevronDown,
  ChevronUp,
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
  Smile,
  Mic,
  Send,
  Plus,
  FileText,
  MoreVertical,
  Edit,
  Eye,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";

/* ─── Static patient data ───────────────────────────────────── */
const patientsDatabase: Record<number, any> = {
  1: {
    name: "Kalyan Rao",
    id: "MT8620",
    age: 32,
    dob: "03/28/1985",
    gender: "Male",
    bloodGroup: "AB +ve",
    email: "kalyan.rao@gmail.com",
    phone: "+1 (969)-258-5147",
    address: "286, El Camino Real, California, Zip code: 86251",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Diabetes", "BP"],
    initials: "KR",
  },
  2: {
    name: "Radhika Iyer",
    id: "MT8621",
    age: 28,
    dob: "05/15/1987",
    gender: "Female",
    bloodGroup: "O +ve",
    email: "radhika.iyer@gmail.com",
    phone: "+1 (555)-123-4567",
    address: "Plot 45, MG Road, Bangalore, Zip code: 560001",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Hypertension"],
    initials: "RI",
  },
  3: {
    name: "Radhika Iyer",
    id: "MT8622",
    age: 45,
    dob: "07/22/1980",
    gender: "Male",
    bloodGroup: "B +ve",
    email: "radhir@gmail.com",
    phone: "+1 (555)-234-5678",
    address: "123 Park Avenue, New Jersey, Zip code: 07003",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Thyroid"],
    initials: "RR",
  },
  4: {
    name: "Radhika Iyer",
    id: "MT8623",
    age: 35,
    dob: "11/10/1989",
    gender: "Female",
    bloodGroup: "AB -ve",
    email: "radhika.new@gmail.com",
    phone: "+1 (555)-345-6789",
    address: "456 Elm Street, Texas, Zip code: 75001",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Asthma"],
    initials: "RI",
  },
  5: {
    name: "Radhika Iyer",
    id: "MT8624",
    age: 52,
    dob: "02/08/1972",
    gender: "Male",
    bloodGroup: "O -ve",
    email: "radhika.five@gmail.com",
    phone: "+1 (555)-456-7890",
    address: "789 Oak Lane, Florida, Zip code: 33101",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Diabetes", "Heart Disease"],
    initials: "RI",
  },
  6: {
    name: "Radhika Iyer",
    id: "MT8625",
    age: 41,
    dob: "09/03/1983",
    gender: "Female",
    bloodGroup: "A +ve",
    email: "radhika.six@gmail.com",
    phone: "+1 (555)-567-8901",
    address: "321 Pine Road, Arizona, Zip code: 85001",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Migraine"],
    initials: "RI",
  },
  7: {
    name: "Radhika Iyer",
    id: "MT8626",
    age: 38,
    dob: "06/19/1988",
    gender: "Male",
    bloodGroup: "B -ve",
    email: "radhika.seven@gmail.com",
    phone: "+1 (555)-678-9012",
    address: "654 Cedar Avenue, Colorado, Zip code: 80202",
    location: "K.K..nagar, Chennai",
    appointmentType: "Offline Appointment",
    diagnosed: ["Arthritis"],
    initials: "RI",
  },
};

const vitals = [
  { label: "Weight", value: "70 kg", color: "bg-blue-100 text-blue-600" },
  { label: "Blood Pressure", value: "120/80 mm hg", color: "bg-orange-100 text-orange-600" },
  { label: "Body temperature", value: "97.2 F", color: "bg-amber-100 text-amber-600" },
  { label: "Oxygen saturation", value: "80%", color: "bg-green-100 text-green-600" },
  { label: "Heart rate", value: "105 bpm", color: "bg-red-100 text-red-600", highlight: true },
];

const chatMessages = [
  { sender: "patient", name: "Kevin James (Patient)", time: "10:30 AM", text: "Hey, happy to hear from you. Yes, I will be back in a couple fo days.", emoji: null },
  { sender: "doctor", name: "Dr. Dristin Watson (Doctor)", time: "10:30 AM", text: "Great, I'm looking forward to meet you soon.. 😊", emoji: null },
  { sender: "patient", name: "Kevin James (Patient)", time: "10:30 AM", text: "Hey, happy to hear from you. Yes, I will be back in a couple fo days.", emoji: null },
  { sender: "patient", name: "Kevin James (Patient)", time: "10:30 AM", text: "Here are some Design i took earlier today.", emoji: "❤️" },
  { sender: "doctor", name: "Dr. Dristin Watson (Doctor)", time: "10:30 AM", text: "Great, I'm looking forward to meet you soon.. 😊", emoji: "🤗" },
  { sender: "patient", name: "Kevin James (Patient)", time: "10:30 AM", text: "Hey, happy to hear from you.", emoji: "👍" },
];

const labReports = [
  { name: "kevin_ecg_test_reports_01/01/2025.pdf", lab: "PathLab Laboratory, Chennai, TN.", size: "7.5 MB", version: "3.22.22", time: "11:15 AM", updated: "Apr 25 | 9:25am", type: "pdf" },
  { name: "kevin_lab_blood_test_reports_01/01/2025.doc", lab: "PathLab Laboratory, Chennai, TN.", size: "7.5 MB", version: "3.22.22", time: "11:15 AM", updated: "Apr 25 | 9:25am", type: "doc" },
  { name: "kevin_ecg_test_reports_01/01/2025.pdf", lab: "PathLab Laboratory, Chennai, TN.", size: "7.5 MB", version: "3.22.22", time: "11:15 AM", updated: "Apr 25 | 9:25am", type: "pdf" },
  { name: "kevin_ecg_test_reports_01/01/2025.pdf", lab: "PathLab Laboratory, Chennai, TN.", size: "7.5 MB", version: "3.22.22", time: "11:15 AM", updated: "Apr 25 | 9:25am", type: "pdf" },
];

/* ─── Collapsible Section ───────────────────────────────────── */
function CollapsibleSection({
  icon,
  title,
  defaultOpen = false,
  actions,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!open); }}}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-gray-800">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          {actions}
          {open ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

/* ─── Patient Left Sidebar ──────────────────────────────────── */
function PatientSidebar({ patient }: { patient: any }) {
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
          <Button variant="ghost" size="icon" className="w-6 h-6 p-0" onClick={(e) => e.stopPropagation()}>
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
            <Button variant="ghost" size="icon" className="w-5 h-5 p-0">
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

/* ─── Patient Details Tab ───────────────────────────────────── */
function PatientDetailsTab({ patient }: { patient: any }) {
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

/* ─── Case Sheet Tab ────────────────────────────────────────── */
function CaseSheetTab({ patient }: { patient: any }) {
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
                      <button type="button" className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => removeLabTestTag(tag)}>
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

/* ─── Chat Tab ──────────────────────────────────────────────── */
function ChatTab({ patient }: { patient: any }) {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-1 overflow-hidden">
      <PatientSidebar patient={patient} />
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-5">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-lg ${msg.sender === "doctor" ? "text-right" : ""}`}>
                  {/* Sender name + time */}
                  <div className={`flex items-center gap-2 mb-1.5 ${msg.sender === "doctor" ? "justify-end" : ""}`}>
                    <span className={`text-xs font-semibold ${msg.sender === "doctor" ? "text-teal-700" : "text-teal-600"}`}>
                      {msg.name}
                    </span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>

                  {/* Message bubble */}
                  <div className={`flex items-end gap-2 ${msg.sender === "doctor" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className={`text-xs font-semibold ${msg.sender === "doctor" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"}`}>
                        {msg.sender === "doctor" ? "DW" : "KJ"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-3 h-3 text-gray-400" />
                      </Button>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender === "doctor"
                            ? "bg-teal-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-700 rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>

                  {/* Emoji reaction */}
                  {msg.emoji && (
                    <div className={`mt-1 ${msg.sender === "doctor" ? "text-right mr-10" : "ml-10"}`}>
                      <span className="text-sm">{msg.emoji}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Lab document shared notification */}
            <div className="flex justify-center my-4">
              <span className="text-xs text-gray-400">Today, 14 Jan, 2025</span>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-red-600" />
              </div>
              <span className="text-sm text-gray-700 flex-1">
                Lab test document has been shared by Dr. Ritika Sahu
              </span>
              <button className="text-sm text-teal-600 font-medium underline hover:text-teal-700">
                View now
              </button>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-100 p-4 bg-white shrink-0">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-teal-600 hover:text-teal-700">
              <Plus className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm"
            />
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600">
                <Mic className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button size="icon" className="w-8 h-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Lab Reports Tab ───────────────────────────────────────── */
function LabReportsTab({ patient }: { patient: any }) {
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

/* ─── Insurance Details Tab (placeholder) ───────────────────── */
function InsuranceDetailsTab({ patient }: { patient: any }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <PatientSidebar patient={patient} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No insurance details available.</p>
      </div>
    </div>
  );
}

/* ─── Medications Tab ───────────────────────────────────────── */
function MedicationsTab({ patient }: { patient: any }) {
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

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
function PatientDetailContent({ patient }: { patient: any }) {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("case-sheet");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-emerald-200">
            <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
        </div>
        <div className="flex items-center gap-3">
          <DateSelector />
          <Button
            onClick={() => setInviteOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full gap-2 px-5 py-2.5 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Invite
          </Button>
        </div>
      </header>

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />

      {/* Patient Banner */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg"
            onClick={() => router.push("/appointments")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Avatar className="w-12 h-12 border-2 border-teal-200">
            <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-sm">
              {patient.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold text-teal-700">
              {patient.name} <span className="text-gray-500 font-normal">(patient)</span>
            </h2>
            <div className="flex items-center gap-4 mt-0.5 text-xs text-gray-500">
              <span className="flex items-center gap-1">✦ Patient ID: {patient.id}</span>
              <span className="flex items-center gap-1">✦ {patient.age} Years</span>
              <span className="flex items-center gap-1">✦ {patient.gender}</span>
              <span className="flex items-center gap-1">✦ {patient.appointmentType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none bg-white border-b border-gray-100 h-auto p-0 px-6">
          {[
            { value: "case-sheet", label: "Case Sheet" },
            { value: "medications", label: "Medications" },
            { value: "lab-reports", label: "Lab reports" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="case-sheet" className="flex-1 flex overflow-hidden mt-0">
          <CaseSheetTab patient={patient} />
        </TabsContent>
        <TabsContent value="medications" className="flex-1 flex overflow-hidden mt-0">
          <MedicationsTab patient={patient} />
        </TabsContent>
        <TabsContent value="lab-reports" className="flex-1 flex overflow-hidden mt-0">
          <LabReportsTab patient={patient} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = parseInt(params.id as string, 10);
  const patient = patientsDatabase[patientId] || patientsDatabase[1];

  return <PatientDetailContent patient={patient} />;
}
