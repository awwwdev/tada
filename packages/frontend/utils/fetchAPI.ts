import { API } from "@/constants";

type Body = Object | string | undefined;
export default async function fetchAPI(url: string, body?: Body, options?: RequestInit) {
  const _url = url.startsWith("/") ? url.replace("/", "") : url;
  const res = await fetch(`${API}/${_url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
  });
  // if (!res.ok) throw new Error('Network response was not ok');
  let json;
  if (!res.ok) {
    try {
      json = await res.json();
      throw new Error(json.message);
    } catch (err) {
      throw new Error(err?.message ?? "Something went wrong");
    }
  } else {
    json = await res.json();
  }
  return json;
}

fetchAPI.GET = (url: string, body?: Body, options?: RequestInit) => fetchAPI(url, body, { method: "GET", ...options });
fetchAPI.POST = (url: string, body?: Body, options?: RequestInit) =>
  fetchAPI(url, body, { method: "POST", ...options });
fetchAPI.PUT = (url: string, body?: Body, options?: RequestInit) => fetchAPI(url, body, { method: "PUT", ...options });
fetchAPI.PATCH = (url: string, body?: Body, options?: RequestInit) => fetchAPI(url, body, { method: "PATCH", ...options });
fetchAPI.DELETE = (url: string, body?: Body, options?: RequestInit) =>
  fetchAPI(url, body, { method: "DELETE", ...options });
