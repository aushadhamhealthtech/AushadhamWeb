import { fail, ok } from "@/lib/api-response";
import { getAvailabilityStore, setAvailabilityStore } from "@/lib/api-store";

export async function GET() {
  return ok(getAvailabilityStore());
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      days?: string[];
      startTime?: string;
      endTime?: string;
      durationMinutes?: number;
      gapMinutes?: number;
    };

    if (!body || typeof body !== "object") {
      return fail("Invalid payload", 400);
    }

    if (body.days && !Array.isArray(body.days)) {
      return fail("days must be an array of weekday strings", 400);
    }

    const updated = setAvailabilityStore(body);
    return ok(updated);
  } catch {
    return fail("Invalid JSON body", 400);
  }
}
