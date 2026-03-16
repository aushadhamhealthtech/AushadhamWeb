import { NextResponse } from "next/server";

type ApiMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
};

export function ok<T>(data: T, meta?: ApiMeta, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    { status }
  );
}

export function fail(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
      },
    },
    { status }
  );
}
