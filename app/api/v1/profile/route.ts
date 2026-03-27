import { fail, ok } from "@/lib/api-response";
import { getDoctorProfileStore, setDoctorProfileStore } from "@/lib/api-store";

export async function GET() {
  return ok(getDoctorProfileStore());
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;

    if (!body || typeof body !== "object") {
      return fail("Invalid payload", 400);
    }

    const updated = setDoctorProfileStore(body);
    return ok(updated);
  } catch {
    return fail("Invalid JSON body", 400);
  }
}
