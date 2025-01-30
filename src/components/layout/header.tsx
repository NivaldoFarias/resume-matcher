import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAuthStatus } from "@/lib/auth";

/**
 * Main application header with authentication controls and navigation
 *
 * @returns Header component with auth status and navigation
 */
export async function Header() {
	const { isAuthenticated, user } = await getAuthStatus();

	return (
		<header className="border-b border-gray-200 bg-white">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-x-4">
					<Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
						Resume Matcher
					</Link>
					<nav className="hidden space-x-4 md:flex">
						<Link href="/jobs" className="text-sm font-medium text-gray-700 hover:text-gray-900">
							Jobs
						</Link>
						<Link
							href="/candidates"
							className="text-sm font-medium text-gray-700 hover:text-gray-900"
						>
							Candidates
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-x-4">
					{isAuthenticated ?
						<>
							<span className="text-sm text-gray-700">{user?.role?.toLowerCase()}</span>
							<UserButton />
						</>
					:	<SignInButton mode="modal">
							<Button>Sign In</Button>
						</SignInButton>
					}
				</div>
			</div>
		</header>
	);
}
