import { NextResponse } from "next/server";

export type HealthResponse = { status: "ok"; uptime: number };

export function GET(): NextResponse<HealthResponse> {
  return NextResponse.json({ status: "ok", uptime: "unknown" });
}
