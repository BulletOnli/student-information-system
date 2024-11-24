import { SIS_DOMAIN } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateEmail = (firstName: string, lastName: string) => {
  const cleanFirstName = firstName?.replace(/\s+/g, "") || "";
  const cleanLastName = lastName?.replace(/\s+/g, "") || "";

  if (cleanFirstName || cleanLastName) {
    return `${cleanLastName?.toLowerCase()}${cleanFirstName?.toLowerCase()}@${SIS_DOMAIN}`;
  }

  return "";
};
