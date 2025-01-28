import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
