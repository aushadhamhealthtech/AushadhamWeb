import { NextResponse } from "next/server";

// Frontend-only fallback spec.
// Add API paths here as backend modules are wired.
const customSpec = {
  paths: {} as Record<string, unknown>,
  tags: [] as Array<{ name: string; description: string }>,
};

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Aushadham API",
      description:
        "API documentation for Aushadham — an Ayurvedic healthcare platform.\n\n" +
        "**Auth endpoints** are currently unavailable in this frontend-only build.\n" +
        "**Custom endpoints** (doctors, appointments, etc.) are added manually as they are built.",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api/auth",
        description: "Local development",
      },
      {
        url: "https://aushadham-web.vercel.app/api/auth",
        description: "Production",
      },
    ],
    paths: {
      ...customSpec.paths,
    },
    components: {},
    tags: [...customSpec.tags],
  };

  return NextResponse.json(spec);
}
