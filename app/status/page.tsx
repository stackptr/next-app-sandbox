"use client";

import { useEffect, useState } from "react";
import type { HealthResponse } from "@/app/api/health/route";

type State =
  | { kind: "loading" }
  | { kind: "ok"; health: HealthResponse }
  | { kind: "error"; message: string };

async function fetchHealth(signal: AbortSignal): Promise<HealthResponse> {
  const res = await fetch("/api/health", { cache: "no-store", signal });
  if (!res.ok) {
    throw new Error(`Health check returned HTTP ${res.status}`);
  }
  return (await res.json()) as HealthResponse;
}

function formatUptime(seconds: number): string {
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h ? `${h}h` : "", m ? `${m}m` : "", `${s}s`]
    .filter(Boolean)
    .join(" ");
}

export default function StatusPage(): React.JSX.Element {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal)
      .then((health) => setState({ kind: "ok", health }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Status</h1>
      {state.kind === "loading" && <p>Checking health…</p>}
      {state.kind === "ok" && (
        <dl className="grid grid-cols-2 gap-2">
          <dt className="font-semibold">Status</dt>
          <dd>{state.health.status}</dd>
          <dt className="font-semibold">Uptime</dt>
          <dd>{formatUptime(state.health.uptime)}</dd>
        </dl>
      )}
      {state.kind === "error" && (
        <p role="alert" className="text-red-600">
          Couldn&apos;t reach the health check: {state.message}
        </p>
      )}
    </main>
  );
}
