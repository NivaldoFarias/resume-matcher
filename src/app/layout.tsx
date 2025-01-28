import { Header } from "@/components/layout/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Resume Matcher",
	description: "Match resumes with job descriptions using AI",
};

/**
 * Root layout component that wraps all pages
 *
 * @param props - The component props
 * @returns The root layout with Clerk provider and common UI elements
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Header />
					<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
