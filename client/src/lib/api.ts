const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export type ApiOk<T> = { ok: true; data: T };
export type ApiFail = { ok: false; error: string; fields?: Record<string, string> };

/** Thrown for any non-2xx response, carrying per-field messages when the API sent them. */
export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      ...init,
    });
  } catch {
    // Network-level failure: no response at all.
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    if (!res.ok) throw new ApiError('Unexpected server response.', res.status);
  }

  if (!res.ok) {
    const fail = body as ApiFail | null;
    throw new ApiError(fail?.error ?? 'Something went wrong.', res.status, fail?.fields);
  }

  return body as T;
};

export const api = {
  get: <T>(path: string, signal?: AbortSignal) =>
    request<ApiOk<T>>(path, { method: 'GET', signal }).then((r) => r.data),

  post: <T>(path: string, payload: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(payload) }),
};

export type LeadResponse = { ok: true; id?: string; message: string };
