export type NotificationSection = "updates" | "appointments" | "emergency";
export type UpdatesFilter = "subscribed" | "regular";
export type MedicalFilter = "all" | "scheduled" | "rescheduled" | "cancelled";
export type NotificationTone = "upload" | "scheduled" | "rescheduled" | "cancelled" | "emergency";

export interface NotificationItem {
  id: number;
  section: NotificationSection;
  filter: UpdatesFilter | MedicalFilter;
  title: string;
  subtitle: string;
  time: string;
  tone: NotificationTone;
}

export const notifications: NotificationItem[] = [
  { id: 1, section: "updates", filter: "subscribed", title: "You have a new laboratory medical report.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 2, section: "updates", filter: "subscribed", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 3, section: "updates", filter: "subscribed", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 4, section: "updates", filter: "subscribed", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 5, section: "updates", filter: "regular", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "2 hr ago", tone: "upload" },
  { id: 6, section: "updates", filter: "regular", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "3 hr ago", tone: "upload" },

  { id: 7, section: "appointments", filter: "scheduled", title: "You have a new appointment for 1st Sept, 3pm.", subtitle: "Scheduled by patient: Radhika Shetty", time: "30 min ago", tone: "scheduled" },
  { id: 8, section: "appointments", filter: "scheduled", title: "You have a new appointment for 1st Sept, 3pm.", subtitle: "Scheduled by patient: Radhika Shetty", time: "30 min ago", tone: "scheduled" },
  { id: 9, section: "appointments", filter: "cancelled", title: "Your appointment for 11th June, 4 pm was cancelled.", subtitle: "Cancelled by patient: Ramya Reddy", time: "18 min ago", tone: "cancelled" },
  { id: 10, section: "appointments", filter: "rescheduled", title: "You have a reschedule appointment for 31st July, 5 pm.", subtitle: "Rescheduled by patient: Aman Rathod", time: "39 min ago", tone: "rescheduled" },
  { id: 11, section: "appointments", filter: "cancelled", title: "Your appointment for 18th July, 1 pm was cancelled.", subtitle: "Cancelled by patient: Ramya Reddy", time: "30 min ago", tone: "cancelled" },
  { id: 12, section: "appointments", filter: "rescheduled", title: "You have a reschedule appointment for 10th Oct, 11:30 am.", subtitle: "Rescheduled by patient: Aman Rathod", time: "2 days ago", tone: "rescheduled" },

  { id: 13, section: "emergency", filter: "scheduled", title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54", time: "Just now", tone: "emergency" },
  { id: 14, section: "emergency", filter: "scheduled", title: "Severe allergic reaction, swelling in throat, trouble breathing.", subtitle: "Patient: Pramod Iyyer | Age: 65", time: "17 min ago", tone: "emergency" },
  { id: 15, section: "emergency", filter: "rescheduled", title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54", time: "24 min ago", tone: "emergency" },
  { id: 16, section: "emergency", filter: "cancelled", title: "Severe allergic reaction, swelling in throat, trouble breathing.", subtitle: "Patient: Pramod Iyyer | Age: 65", time: "45 min ago", tone: "emergency" },
];

export const updatesFilters: UpdatesFilter[] = ["subscribed", "regular"];
export const medicalFilters: MedicalFilter[] = ["all", "scheduled", "rescheduled", "cancelled"];

export function getFilteredNotifications(
  section: NotificationSection,
  filter: UpdatesFilter | MedicalFilter
) {
  if (filter === "all") {
    return notifications.filter((item) => item.section === section);
  }

  return notifications.filter((item) => item.section === section && item.filter === filter);
}
