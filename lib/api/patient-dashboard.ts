import type {
  PatientProfile,
  Appointment,
  HealthProfile,
  Report,
  MedicationGroup,
  PaymentMethod,
  RescheduleData,
} from "@/types/patient-dashboard"

// ─── Patient ───────────────────────────────────────────────────────────
export async function getPatientProfile(patientId: string): Promise<PatientProfile> {
  // TODO: replace with real API call — GET /api/patients/:patientId
  return {
    id: patientId,
    name: "Priyanka",
    photo: "/patient-priyanka.jpg",
    age: 35,
    weight: "70 kg",
    gender: "Female",
    city: "Bengaluru",
    phone: "+91 7555974388",
  }
}

// ─── Appointments ──────────────────────────────────────────────────────
export async function getUpcomingAppointments(patientId: string): Promise<Appointment[]> {
  // TODO: replace with real API call — GET /api/patients/:patientId/appointments?status=upcoming
  return [
    {
      id: "appt-1",
      date: "Wednesday, 20 March 2024",
      doctor: "Dr. Sunil Shinde",
      specialty: "Orthopedic",
      time: "4.15 - 4.30 pm",
      type: "In-person",
      reason: "Neck pain",
      photo: "/doctor-sunil.jpg",
    },
    {
      id: "appt-2",
      date: "Friday, 22 March 2024",
      doctor: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      time: "10.00 - 10.15 am",
      type: "Online",
      reason: "Blood pressure review",
      photo: "/doctor-sunil.jpg",
    },
    {
      id: "appt-3",
      date: "Monday, 25 March 2024",
      doctor: "Dr. Ramesh Kumar",
      specialty: "General Physician",
      time: "2.00 - 2.15 pm",
      type: "In-person",
      reason: "Routine check-up",
      photo: "/doctor-sunil.jpg",
    },
  ]
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
  // TODO: replace with real API call — DELETE /api/appointments/:appointmentId
  console.log("Cancel appointment", appointmentId)
}

export async function rescheduleAppointment(
  appointmentId: string,
  date: string,
  slotId: string,
  type: "in-clinic" | "online"
): Promise<void> {
  // TODO: replace with real API call — PATCH /api/appointments/:appointmentId/reschedule
  console.log("Reschedule", { appointmentId, date, slotId, type })
}

// ─── Health profile ────────────────────────────────────────────────────
export async function getHealthProfile(patientId: string): Promise<HealthProfile> {
  // TODO: replace with real API call — GET /api/patients/:patientId/health-profile
  return {
    pastIssues: ["Diabetes", "Blood Pressure", "Hypertension"],
    presentIssues: ["Blood Pressure", "Hypertension"],
    currentDiagnosis: "Malaria",
    consultingDoctor: "Dr. Suresh Radhakrishnan",
  }
}

// ─── Reports ───────────────────────────────────────────────────────────
export async function getLatestReports(patientId: string): Promise<Report[]> {
  // TODO: replace with real API call — GET /api/patients/:patientId/reports?limit=3
  return [
    { id: "rep-1", name: "Basic metabolic panel (BMP)", date: "1 hr ago" },
    { id: "rep-2", name: "Complete Blood Count (CBC)", date: "15 Sep" },
    { id: "rep-3", name: "Lipid panel", date: "15 Sep" },
  ]
}

// ─── Medication ────────────────────────────────────────────────────────
export async function getNextMedication(patientId: string): Promise<MedicationGroup[]> {
  // TODO: replace with real API call — GET /api/patients/:patientId/medications/next
  return [
    {
      period: "Afternoon (1pm -3 pm)",
      medications: [
        { id: "med-1", name: "Steam inhalation", dosage: "" },
        { id: "med-2", name: "Navision Drops", dosage: "3 Drops in each nostrils" },
        { id: "med-3", name: "Ear Drops", dosage: "3 Drops in each ear" },
        { id: "med-4", name: "Paracetomol 200 mg", dosage: "After lunch" },
      ],
    },
  ]
}

// ─── Payment methods ───────────────────────────────────────────────────
export async function getPaymentMethods(patientId: string): Promise<PaymentMethod[]> {
  // TODO: replace with real API call — GET /api/patients/:patientId/payment-methods
  return [
    { id: "pm-1", type: "upi", label: "dgdgddgd@ybl", logo: "gpay" },
    { id: "pm-2", type: "upi", label: "PhonePe", logo: "phonepe" },
    { id: "pm-3", type: "card", label: "Visa *****1211", subLabel: "Expires 05/26", logo: "visa" },
    { id: "pm-4", type: "card", label: "MasterCard *****1211", subLabel: "Expired!", logo: "mastercard" },
    { id: "pm-5", type: "clinic", label: "Pay at the clinic", logo: "clinic" },
  ]
}

export async function makePayment(appointmentId: string, paymentMethodId: string): Promise<void> {
  // TODO: replace with real API call — POST /api/appointments/:appointmentId/payment
  console.log("Make payment", { appointmentId, paymentMethodId })
}

// ─── Slots ─────────────────────────────────────────────────────────────
export async function getAvailableSlots(
  doctorId: string,
  type: "in-clinic" | "online"
): Promise<RescheduleData> {
  // TODO: replace with real API call — GET /api/doctors/:doctorId/slots?type=in-clinic
  return {
    dates: [
      { id: "mon", label: "Mon, 15 Mar", slotsAvailable: 3, disabled: false },
      { id: "tue", label: "Tue, 16 Mar", slotsAvailable: 0, disabled: false },
      { id: "wed", label: "Wed, 17 Mar", slotsAvailable: 0, disabled: true },
      { id: "thu", label: "Thu, 18 Oct", slotsAvailable: 3, disabled: false },
    ],
    slots: [
      { id: "10:00", label: "10:00 AM", available: false, period: "morning" },
      { id: "10:15", label: "10:15 AM", available: false, period: "morning" },
      { id: "10:30", label: "10:30 AM", available: false, period: "morning" },
      { id: "10:45", label: "10:45 AM", available: false, period: "morning" },
      { id: "11:00", label: "11:00 AM", available: false, period: "morning" },
      { id: "11:15", label: "11:15 AM", available: false, period: "morning" },
      { id: "11:30", label: "11:30 AM", available: false, period: "morning" },
      { id: "11:45", label: "11:45 AM", available: false, period: "morning" },
      { id: "12:00", label: "12:00 PM", available: true,  period: "morning" },
      { id: "12:15", label: "12:15 PM", available: true,  period: "morning" },
      { id: "12:30", label: "12:30 PM", available: false, period: "morning" },
      { id: "12:45", label: "12:45 PM", available: false, period: "morning" },
      { id: "16:00", label: "04:00 PM", available: false, period: "evening" },
      { id: "16:15", label: "04:15 PM", available: true,  period: "evening" },
      { id: "16:30", label: "04:30 PM", available: false, period: "evening" },
      { id: "16:45", label: "04:45 PM", available: false, period: "evening" },
      { id: "17:00", label: "05:00 PM", available: false, period: "evening" },
      { id: "17:15", label: "05:15 PM", available: false, period: "evening" },
      { id: "17:30", label: "05:30 PM", available: false, period: "evening" },
    ],
  }
}
