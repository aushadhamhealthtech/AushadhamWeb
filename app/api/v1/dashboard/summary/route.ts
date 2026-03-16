import { mockAppointments, mockMetrics, mockPatients } from "@/lib/mock-data";
import { getFilteredNotifications } from "@/lib/notifications-data";
import { fail, ok } from "@/lib/api-response";

const PERIODS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const periodInput = searchParams.get("period") ?? "Weekly";
  const normalizedPeriod =
    PERIODS.find((period) => period.toLowerCase() === periodInput.toLowerCase()) ?? null;

  if (!normalizedPeriod) {
    return fail("Invalid period. Use one of: Daily, Weekly, Monthly, Yearly", 400);
  }

  const metric = mockMetrics[normalizedPeriod];
  const updates = getFilteredNotifications("updates", "all");
  const emergencies = getFilteredNotifications("emergency", "all");

  return ok({
    period: normalizedPeriod,
    metric,
    cards: {
      totalPatients: mockPatients.length,
      totalAppointments: mockAppointments.length,
      unreadUpdates: updates.length,
      activeEmergencies: emergencies.length,
    },
  });
}
