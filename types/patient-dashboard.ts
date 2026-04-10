export interface PatientProfile {
  id: string
  name: string
  photo: string
  age: number
  weight: string
  gender: string
  city: string
  phone: string
}

export interface Appointment {
  id: string
  date: string
  doctor: string
  specialty: string
  time: string
  type: "In-person" | "Online"
  reason: string
  photo: string
}

export type HealthIssue = string

export interface HealthProfile {
  pastIssues: HealthIssue[]
  presentIssues: HealthIssue[]
  currentDiagnosis: string
  consultingDoctor: string
}

export interface Report {
  id: string
  name: string
  date: string
}

export interface Medication {
  id: string
  name: string
  dosage: string
}

export interface MedicationGroup {
  period: string       // e.g. "Afternoon (1pm -3 pm)"
  medications: Medication[]
}

export interface PaymentMethod {
  id: string
  type: "upi" | "card" | "clinic"
  label: string
  subLabel?: string    // e.g. UPI ID or card expiry
  logo: "gpay" | "phonepe" | "visa" | "mastercard" | "clinic"
}

export interface DateSlot {
  id: string
  label: string         // e.g. "Mon, 15 Mar"
  slotsAvailable: number
  disabled: boolean
}

export interface TimeSlot {
  id: string
  label: string         // e.g. "10:00 AM"
  available: boolean
  period: "morning" | "evening"
}

export interface RescheduleData {
  dates: DateSlot[]
  slots: TimeSlot[]
}
