const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type User = {
  id: number;
  email: string;
  full_name: string;
  role: string;
  campus_id?: number | null;
};

function authHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("mia_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export async function login(email: string, password: string) {
  return api<{ access_token: string; user: User }>("/auth/login-json", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export { API_URL };
