import { toast } from "react-hot-toast";

let API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "";

export function setApiBaseUrl(u: string) {
  API_BASE_URL = u?.replace(/\/+$/, "");
}

let _token: string | null = null;
export function setAuthToken(t: string | null) {
  _token = t;
}

let lastErrorMsg = "";
let lastErrorTime = 0;

async function http<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers = new Headers(opts.headers || {});
  const hasBody = opts.body != null && (!opts.method || opts.method !== "GET");

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (_token) headers.set("Authorization", `Bearer ${_token}`);

  try {
    const res = await fetch(
      `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`,
      { ...opts, headers }
    );

    let data: any = null;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const msg =
        (data && (data.error || data.message)) ||
        "System error, please try again later.";
      throw new Error(msg);
    }

    return data as T;
  } catch (err: any) {
    const errorMsg =
      err instanceof TypeError && err.message === "Failed to fetch"
        ? "System error, please try again later."
        : err.message?.startsWith("Unexpected token")
        ? "System error, please try again later."
        : err.message || "Unknown error occurred.";

    const now = Date.now();
    if (errorMsg !== lastErrorMsg || now - lastErrorTime > 1000) {
      toast.error(errorMsg);
      lastErrorMsg = errorMsg;
      lastErrorTime = now;
    }

    throw new Error(errorMsg);
  }
}

export const api = {
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    http<T>(path, { method: "POST", body: JSON.stringify(body), ...init }),
  get: <T>(path: string, init?: RequestInit) =>
    http<T>(path, { method: "GET", ...init }),
};

export type LoginResponse = {
  token: string;
  user: { id: string; email: string; role: string };
};
