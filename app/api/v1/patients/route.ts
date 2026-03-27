import { ok } from "@/lib/api-response";
import { mockPatients } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const status = (searchParams.get("status") ?? "").toLowerCase().trim();

  const data = mockPatients.filter((patient) => {
    const matchesQuery =
      query.length === 0 ||
      patient.name.toLowerCase().includes(query) ||
      patient.condition.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query);

    const matchesStatus =
      status.length === 0 || patient.status.toLowerCase() === status;

    return matchesQuery && matchesStatus;
  });

  return ok(data, {
    total: data.length,
  });
}
