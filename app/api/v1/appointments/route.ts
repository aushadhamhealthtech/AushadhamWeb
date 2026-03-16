import { fail, ok } from "@/lib/api-response";
import { mockAppointments } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date");

  let data = mockAppointments;

  if (status) {
    data = data.filter((appointment) =>
      appointment.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (date) {
    data = data.filter((appointment) => appointment.date === date);
  }

  return ok(data, {
    total: data.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      time?: string;
      patient?: string;
      reason?: string;
      status?: string;
      date?: string;
    };

    if (!body.time || !body.patient || !body.reason || !body.status || !body.date) {
      return fail("time, patient, reason, status and date are required", 400);
    }

    const created = {
      id: Date.now(),
      time: body.time,
      patient: body.patient,
      reason: body.reason,
      status: body.status,
      date: body.date,
      initials: body.patient
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join(""),
      avatarColor: "bg-gray-200",
      isActive: false,
    };

    return ok(created, undefined, 201);
  } catch {
    return fail("Invalid JSON body", 400);
  }
}
