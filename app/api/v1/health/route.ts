import { ok } from "@/lib/api-response";

export async function GET() {
  return ok({
    service: "aushadham-web-api",
    version: "v1",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
}
