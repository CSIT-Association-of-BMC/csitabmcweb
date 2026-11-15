import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isRouteActive(currentPath: string, targetPath?: string | null): boolean {
  if (!targetPath || targetPath.startsWith("http")) return false;

  const cleanCurrent = currentPath.replace(/\/+$/, "") || "/";
  const cleanTarget = (targetPath.startsWith("/") ? targetPath : `/${targetPath}`).replace(/\/+$/, "") || "/";

  if (cleanTarget === "/") {
    return cleanCurrent === "/";
  }

  return cleanCurrent === cleanTarget || cleanCurrent.startsWith(`${cleanTarget}/`);
}
