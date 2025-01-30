import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/layout/header";

import "./globals.css";

import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Resume Matcher",
	description: "Match your resume with job descriptions",
};

/**
 * Root layout component that wraps all pages
 *
 * @param props - The component props
 * @returns The root layout with Clerk provider and common UI elements
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<ClerkProvider afterSignOutUrl="/">
				<body className={inter.className + " min-h-screen"}>
					<ErrorBoundary>
						<Header />
						<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
					</ErrorBoundary>
				</body>
			</ClerkProvider>
		</html>
	);
}
