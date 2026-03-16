import {
  getFilteredNotifications,
  type MedicalFilter,
  type NotificationSection,
  type UpdatesFilter,
} from "@/lib/notifications-data";
import { fail, ok } from "@/lib/api-response";

const validSections: NotificationSection[] = ["updates", "appointments", "emergency"];
const validUpdateFilters: UpdatesFilter[] = ["subscribed", "regular"];
const validMedicalFilters: MedicalFilter[] = ["all", "scheduled", "rescheduled", "cancelled"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sectionInput = (searchParams.get("section") ?? "updates") as NotificationSection;
  const filterInput = searchParams.get("filter") ?? "all";

  if (!validSections.includes(sectionInput)) {
    return fail("Invalid section. Use updates, appointments, emergency", 400);
  }

  if (sectionInput === "updates") {
    if (!(filterInput === "all" || validUpdateFilters.includes(filterInput as UpdatesFilter))) {
      return fail("Invalid updates filter. Use all, subscribed, regular", 400);
    }

    const payload =
      filterInput === "all"
        ? [
            ...getFilteredNotifications("updates", "subscribed"),
            ...getFilteredNotifications("updates", "regular"),
          ]
        : getFilteredNotifications("updates", filterInput as UpdatesFilter);

    return ok(payload, { total: payload.length });
  }

  if (!validMedicalFilters.includes(filterInput as MedicalFilter)) {
    return fail("Invalid filter. Use all, scheduled, rescheduled, cancelled", 400);
  }

  const data = getFilteredNotifications(sectionInput, filterInput as MedicalFilter);
  return ok(data, { total: data.length });
}
