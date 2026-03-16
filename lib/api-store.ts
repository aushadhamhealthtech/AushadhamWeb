export type DoctorProfile = {
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  practice: string;
  specialization: string;
  qualification: string;
  experience: string;
  consultationFee: string;
  hospitalName: string;
  city: string;
  state: string;
  country: string;
};

export type AvailabilityConfig = {
  days: string[];
  startTime: string;
  endTime: string;
  durationMinutes: number;
  gapMinutes: number;
};

declare global {
  var __doctorProfile: DoctorProfile | undefined;
  var __availabilityConfig: AvailabilityConfig | undefined;
}

const defaultDoctorProfile: DoctorProfile = {
  firstName: "Ritika",
  middleName: "",
  lastName: "Sahu",
  mobileNumber: "+91 98201 12345",
  email: "ritika.sahu@aushadham.in",
  practice: "General Medicine",
  specialization: "General Physician",
  qualification: "MBBS, MD",
  experience: "8",
  consultationFee: "500",
  hospitalName: "Aushadham Health Clinic",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
};

const defaultAvailabilityConfig: AvailabilityConfig = {
  days: ["TUE", "WED", "THU", "FRI", "SAT"],
  startTime: "06:00 AM",
  endTime: "11:00 AM",
  durationMinutes: 5,
  gapMinutes: 5,
};

export function getDoctorProfileStore() {
  if (!globalThis.__doctorProfile) {
    globalThis.__doctorProfile = defaultDoctorProfile;
  }

  return globalThis.__doctorProfile;
}

export function setDoctorProfileStore(next: Partial<DoctorProfile>) {
  const current = getDoctorProfileStore();
  globalThis.__doctorProfile = {
    ...current,
    ...next,
  };

  return globalThis.__doctorProfile;
}

export function getAvailabilityStore() {
  if (!globalThis.__availabilityConfig) {
    globalThis.__availabilityConfig = defaultAvailabilityConfig;
  }

  return globalThis.__availabilityConfig;
}

export function setAvailabilityStore(next: Partial<AvailabilityConfig>) {
  const current = getAvailabilityStore();
  globalThis.__availabilityConfig = {
    ...current,
    ...next,
  };

  return globalThis.__availabilityConfig;
}
