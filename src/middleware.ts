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
		// For non-public routes, protect them by requiring authentication
		if (!isPublicRoute(request)) {
			await auth.protect();
		}

		const { userId, redirectToSignIn } = await auth();

		if (!userId && isPublicRoute(request)) {
			// Add custom logic to run before redirecting

			return redirectToSignIn();
		}
	},
	{ debug: process.env.NODE_ENV === "development" },
);

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
