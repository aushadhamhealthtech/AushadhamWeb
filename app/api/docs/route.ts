import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  spec: {
    url: "/api/openapi",
  },
  theme: "purple" as const,
  darkMode: true,
  metaData: {
    title: "Aushadham API Docs",
  },
};

export const GET = ApiReference(config);
