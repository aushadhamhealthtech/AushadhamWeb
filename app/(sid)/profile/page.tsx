"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, CirclePlus, Save, Upload, User, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type DoctorProfileForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  firstNameAlt: string;
  middleNameAlt: string;
  lastNameAlt: string;
  mobileNumber: string;
  practice: string;
  specialization: string;
  qualification: string;
  illnessTypes: string;
  appointmentMode: string;
  experience: string;
  tags: string;
  hospitalName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  consultationFee: string;
  universityName: string;
  degree: string;
  graduationYear: string;
  achievements: string;
  memberships: string;
};

const defaultProfile: DoctorProfileForm = {
  firstName: "Ritika",
  middleName: "",
  lastName: "Shah",
  firstNameAlt: "Ritika",
  middleNameAlt: "",
  lastNameAlt: "Shah",
  mobileNumber: "+91 98201 12345",
  practice: "General Medicine",
  specialization: "General Physician",
  qualification: "MBBS, MD",
  illnessTypes: "Diabetes, Hypertension",
  appointmentMode: "video",
  experience: "8",
  tags: "Preventive Care",
  hospitalName: "Aushadham Health Clinic",
  addressLine1: "Door No. 12, Shanti Nagar",
  addressLine2: "Near City Heart Mall",
  city: "Mumbai",
  state: "maharashtra",
  zipCode: "400001",
  country: "India",
  consultationFee: "500",
  universityName: "Maharashtra University of Health Sciences",
  degree: "MD (General Medicine)",
  graduationYear: "2017",
  achievements: "Gold medal in Internal Medicine and 10+ years of OPD care excellence.",
  memberships: "Indian Medical Association (IMA)",
};

function FieldLabel({ label, required = false }: { label: string; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
      {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}

export default function DoctorProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [initialProfile, setInitialProfile] = useState(defaultProfile);
  const [profile, setProfile] = useState(defaultProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasChanges = useMemo(
    () => JSON.stringify(profile) !== JSON.stringify(initialProfile),
    [profile, initialProfile]
  );

  const handleChange = (key: keyof DoctorProfileForm, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!hasChanges) return;
    setInitialProfile(profile);
    setSaved(true);
    setSuccessOpen(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
  };

  if (!mounted) {
    return <div className="flex flex-1 bg-gray-50" />;
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mx-auto max-w-6xl rounded-3xl border border-gray-100 shadow-sm">
          <CardHeader className="pb-0 pt-6">
            <div className="mb-8 flex items-start justify-between gap-4">
              <h2 className="text-4xl font-bold text-teal-700">Personal Details</h2>
              <Button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges}
                className={cn(
                  "min-w-40 gap-2 rounded-full bg-teal-600 text-white hover:bg-teal-700",
                  hasChanges && "ring-2 ring-teal-200 shadow-lg shadow-teal-200",
                  !hasChanges && "cursor-not-allowed opacity-60",
                  saved && "bg-emerald-600 hover:bg-emerald-600"
                )}
              >
                {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {saved ? "Saved" : "Save changes"}
              </Button>
            </div>

            <div className="mb-8 flex flex-col items-center gap-4">
              <Avatar className="h-28 w-28 border-2 border-teal-600">
                <AvatarFallback className="bg-gray-100 text-gray-400">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                onClick={() => setUploadOpen(true)}
                className="rounded-full bg-teal-600 px-5 text-white hover:bg-teal-700"
              >
                <Upload className="h-4 w-4" />
                Upload your picture
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-12 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <FieldLabel label="First Name" required />
                <Input
                  value={profile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <FieldLabel label="Middle Name" />
                <Input
                  value={profile.middleName}
                  onChange={(e) => handleChange("middleName", e.target.value)}
                  placeholder="Enter your middle name"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <FieldLabel label="Last Name" required />
                <Input
                  value={profile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <FieldLabel label="First Name" required />
                <Input
                  value={profile.firstNameAlt}
                  onChange={(e) => handleChange("firstNameAlt", e.target.value)}
                  placeholder="Enter your first name"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <FieldLabel label="Middle Name" required />
                <Input
                  value={profile.middleNameAlt}
                  onChange={(e) => handleChange("middleNameAlt", e.target.value)}
                  placeholder="Enter your middle name"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <FieldLabel label="Last Name" required />
                <Input
                  value={profile.lastNameAlt}
                  onChange={(e) => handleChange("lastNameAlt", e.target.value)}
                  placeholder="Enter your last name"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <FieldLabel label="Mobile Number" required />
                <Input
                  value={profile.mobileNumber}
                  onChange={(e) => handleChange("mobileNumber", e.target.value)}
                  placeholder="Enter your mobile number"
                  className="rounded-xl border-gray-200"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              <h3 className="text-4xl font-bold text-teal-700">Practice Details</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <FieldLabel label="Practice" required />
                  <Input
                    value={profile.practice}
                    onChange={(e) => handleChange("practice", e.target.value)}
                    placeholder="Select your practice"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Qualification" required />
                  <Input
                    value={profile.qualification}
                    onChange={(e) => handleChange("qualification", e.target.value)}
                    placeholder="Enter your qualification"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Speciality" required />
                  <Input
                    value={profile.specialization}
                    onChange={(e) => handleChange("specialization", e.target.value)}
                    placeholder="Enter texts to add Tags"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Add type of illness for your specialty" required />
                  <Input
                    value={profile.illnessTypes}
                    onChange={(e) => handleChange("illnessTypes", e.target.value)}
                    placeholder="Enter texts to add Tags"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Mode of Appointment" required />
                  <Select value={profile.appointmentMode} onValueChange={(value) => handleChange("appointmentMode", value)}>
                    <SelectTrigger className="rounded-xl border-gray-200">
                      <SelectValue placeholder="Select Appointment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="clinic">In-clinic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel label="Experience" required />
                  <Input
                    value={profile.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    placeholder="Enter texts to add Tags"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Add Tags" required />
                  <Select value={profile.tags} onValueChange={(value) => handleChange("tags", value)}>
                    <SelectTrigger className="rounded-xl border-gray-200">
                      <SelectValue placeholder="Select or enter texts to add Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preventive Care">Preventive Care</SelectItem>
                      <SelectItem value="Chronic Care">Chronic Care</SelectItem>
                      <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              <h3 className="text-4xl font-bold text-teal-700">Clinic or Hospital Details</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <FieldLabel label="Hospital/ Clinic Name" required />
                  <Input
                    value={profile.hospitalName}
                    onChange={(e) => handleChange("hospitalName", e.target.value)}
                    placeholder="Enter your clinic or hospital name"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Hospital/ Clinic address" required />
                  <Input
                    value={profile.addressLine1}
                    onChange={(e) => handleChange("addressLine1", e.target.value)}
                    placeholder="Door No./ Flat name"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Hospital/ Clinic address line 2" />
                  <Input
                    value={profile.addressLine2}
                    onChange={(e) => handleChange("addressLine2", e.target.value)}
                    placeholder="Street name or nearby landmark"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="City" required />
                  <Input
                    value={profile.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Enter your city name"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="State" required />
                  <Select value={profile.state} onValueChange={(value) => handleChange("state", value)}>
                    <SelectTrigger className="rounded-xl border-gray-200">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel label="Zip Code" required />
                  <Input
                    value={profile.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    placeholder="Enter zip code numbers"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Country" required />
                  <Input
                    value={profile.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              <h3 className="text-4xl font-bold text-teal-700">Clinic or Hospital Details</h3>
              <div className="md:col-span-2">
                <FieldLabel label="Consultation Fees" required />
                <div className="max-w-sm">
                  <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <span className="px-3 text-gray-700">₹</span>
                    <Input
                      value={profile.consultationFee}
                      onChange={(e) => handleChange("consultationFee", e.target.value)}
                      placeholder="Ex: 400"
                      className="border-0 rounded-none focus-visible:ring-0"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    The amount you enter here will be displayed to others during appointment booking.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-5">
              <h3 className="text-4xl font-bold text-teal-700">Education Details</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                <div>
                  <FieldLabel label="University name" />
                  <Input
                    value={profile.universityName}
                    onChange={(e) => handleChange("universityName", e.target.value)}
                    placeholder="Enter the name of the institution"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Degree" />
                  <Input
                    value={profile.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    placeholder="Enter the degree"
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <FieldLabel label="Year" />
                  <Select value={profile.graduationYear} onValueChange={(value) => handleChange("graduationYear", value)}>
                    <SelectTrigger className="rounded-xl border-gray-200">
                      <SelectValue placeholder="Select the year of graduation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                      <SelectItem value="2018">2018</SelectItem>
                      <SelectItem value="2017">2017</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="outline" className="rounded-xl border-gray-200 text-gray-600">
                  <CirclePlus className="h-4 w-4" />
                  Add more
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <FieldLabel label="Achievements" />
                  <Textarea
                    value={profile.achievements}
                    onChange={(e) => handleChange("achievements", e.target.value)}
                    placeholder="Describe the achievements you have received"
                    className="min-h-24 rounded-xl border-gray-200"
                  />
                </div>
                <Button type="button" variant="outline" className="rounded-xl border-gray-200 text-gray-600">
                  <CirclePlus className="h-4 w-4" />
                  Add more
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <FieldLabel label="Memberships" />
                  <Textarea
                    value={profile.memberships}
                    onChange={(e) => handleChange("memberships", e.target.value)}
                    placeholder="Mention any memberships you are part of"
                    className="min-h-24 rounded-xl border-gray-200"
                  />
                </div>
                <Button type="button" variant="outline" className="rounded-xl border-gray-200 text-gray-600">
                  <CirclePlus className="h-4 w-4" />
                  Add more
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[90vw] rounded-[44px] border border-gray-200 bg-white px-6 py-16 sm:max-w-3xl"
          >
            <DialogTitle className="sr-only">Profile saved successfully</DialogTitle>
            <Button
              type="button"
              size="icon"
              onClick={() => setSuccessOpen(false)}
              className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-amber-950 text-white hover:bg-amber-950"
            >
              <X className="h-8 w-8" />
            </Button>
            <p className="mx-auto max-w-2xl text-center text-3xl font-bold leading-tight text-gray-800 sm:text-5xl">
              Your profile details has been saved successfully.
            </p>
          </DialogContent>
        </Dialog>

        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[82vw] rounded-[30px] border border-gray-200 bg-white px-4 py-6 sm:max-w-2xl sm:px-7 sm:py-7"
          >
            <DialogTitle className="sr-only">Upload profile picture</DialogTitle>
            <Button
              type="button"
              size="icon"
              onClick={() => setUploadOpen(false)}
              className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-amber-950 text-white hover:bg-amber-950"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-3 py-6 sm:px-6 sm:py-7">
              <div className="mx-auto flex max-w-xl flex-col items-center">
                <Upload className="h-8 w-8 text-blue-500" />
                <p className="mt-5 text-center text-xl font-semibold text-gray-900">Drag and Drop files here</p>
                <p className="mt-1.5 text-center text-sm font-semibold text-gray-600">Files supported: PDF, JPEG, PNG</p>

                <div className="mt-6 flex w-full items-center gap-3">
                  <Separator className="flex-1 bg-gray-400" />
                  <span className="text-3xl font-medium text-black">OR</span>
                  <Separator className="flex-1 bg-gray-400" />
                </div>

                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={handleFilePick}
                  className="hidden"
                />

                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 rounded-full bg-teal-300 px-7 py-4 text-xl font-semibold text-gray-900 hover:bg-teal-300"
                >
                  Choose File
                </Button>

                <p className="mt-2 text-xl font-semibold text-gray-700">Maximum size: 10 MB</p>
                {selectedFileName ? (
                  <p className="mt-2 text-sm font-medium text-teal-700">Selected: {selectedFileName}</p>
                ) : null}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
