import { SignIn } from "@clerk/nextjs";

/**
 * Sign In page component that only shows Google OAuth
 *
 * @returns The SignIn component configured for Google OAuth only
 */
export default function SignInPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<SignIn
				appearance={{
					elements: {
						rootBox: "mx-auto",
						card: "bg-white dark:bg-gray-900",
						headerTitle: "text-gray-900 dark:text-white",
						headerSubtitle: "text-gray-600 dark:text-gray-400",
					},
				}}
				fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
				signUpUrl="/sign-in"
				routing="path"
				path="/sign-in"
			/>
		</div>
	);
}
