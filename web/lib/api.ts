const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function parseError(res: Response, path: string): Promise<never> {
  let detail = "";
  try {
    const body = await res.json();
    detail = body?.detail ? `: ${body.detail}` : "";
  } catch {
    // response wasn't JSON -- ignore and use the generic message
  }
  throw new Error(`API error ${res.status} on ${path}${detail}`);
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) return parseError(res, path);
  return res.json();
}

export async function apiGetAuth<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return parseError(res, path);
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return parseError(res, path);
  return res.json();
}

export async function apiPostAuth<T>(path: string, body: unknown, token: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) return parseError(res, path);
  return res.json();
}
