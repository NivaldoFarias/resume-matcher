import { logger } from "@/lib/logger";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** Defines the list of public routes that don't require authentication using pattern matching */
const publicPatterns = [
	"/",
	"/sign-in(.*)",
	"/onboarding",
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
			logger.debug("Processing request", {
				url: url.pathname,
				method: request.method,
			});

			// For non-public routes, protect them by requiring authentication
			if (!isPublicRoute(request)) {
				logger.debug("Protecting non-public route", { url: url.pathname });
				await auth.protect();
			}

			const { userId, redirectToSignIn } = await auth();

			if (!userId && isPublicRoute(request)) {
				logger.info("Redirecting unauthenticated user to sign in", {
					url: url.pathname,
				});
				return redirectToSignIn();
			}

			logger.debug("Request processed successfully", {
				url: url.pathname,
				userId,
			});
		} catch (error) {
			logger.error(
				"Error processing request",
				error instanceof Error ? error : new Error("Unknown error"),
				{ url: request.url },
			);
			throw error;
		}
	},
	{ debug: false }, // We'll use our own logger instead
);

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
