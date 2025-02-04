import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { logger } from "@/lib/logger";

/** Defines the list of public routes that don't require authentication using pattern matching */
const publicPatterns = [
	"/",
	"/sign-in(.*)",
	"/onboarding(.*)",
	"/api/webhooks/clerk",

	// Static files
	"/favicon.ico",
	"/robots.txt",
	"/sitemap.xml",
];

const isPublicRoute = createRouteMatcher(publicPatterns);

/** Configuration for the Clerk authentication middleware */
export default clerkMiddleware(
	async (auth, request) => {
		try {
			const url = new URL(request.url);

			// For non-public routes, protect them by requiring authentication
			if (!isPublicRoute(request)) {
				await auth.protect();
			}

			const { userId } = await auth();
		} catch (error) {
			logger.error(
				"Error processing request",
				error instanceof Error ? error : new Error("Unknown error"),
				{ url: request.url },
			);
			throw error;
		}
	},
	{ debug: process.env.NODE_ENV === "development" && process.env.CLERK_DEBUG === "true" },
);

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
