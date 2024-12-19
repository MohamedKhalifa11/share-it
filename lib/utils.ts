import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY, BLOGS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export async function getUserById(id: string) {
  return client.fetch(AUTHOR_BY_ID_QUERY, { id });
}

export async function getBlogById(id: string) {
  return client.fetch(BLOGS_BY_ID_QUERY, { id });
}
