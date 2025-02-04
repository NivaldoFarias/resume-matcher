import Link from "next/link";

import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { getAuthStatus } from "@/lib/auth";

/**
 * Home page component with role-protected sections and role selection for non-authenticated users
 *
 * @returns The home page with different content based on authentication status
 */
export default async function HomePage() {
	const { user } = await getAuthStatus();

	if (!user) {
		return (
			<div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 text-center">
				<div className="max-w-2xl">
					<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
						Find Your Perfect Match
					</h1>
					<p className="mb-8 text-xl text-gray-600">
						Whether you're looking for your next career opportunity or searching for top talent,
						we've got you covered.
					</p>
				</div>

				<div className="grid w-full max-w-lg gap-6 sm:grid-cols-2">
					<Link href="/onboarding/candidate" className="w-full" prefetch={true}>
						<Button
							size="lg"
							className="w-full h-32 text-xl bg-white border-2 border-purple-500 hover:bg-purple-50 text-purple-600 shadow-lg shadow-purple-400/50 hover:shadow-purple-500/50 transition-all duration-300"
						>
							I'm a Candidate
						</Button>
					</Link>
					<Link href="/onboarding/recruiter" className="w-full" prefetch={true}>
						<Button
							size="lg"
							className="w-full h-32 text-xl bg-white border-2 border-green-500 hover:bg-green-50 text-green-600 shadow-lg shadow-green-400/50 hover:shadow-green-500/50 transition-all duration-300"
						>
							I'm a Recruiter
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<section className="rounded-lg border border-gray-200 bg-white p-6">
				<h1 className="text-2xl font-bold text-gray-900">Welcome to Resume Matcher</h1>
				<p className="mt-2 text-gray-600">
					Welcome back! Check out your personalized dashboard below.
				</p>
			</section>

			<div className="grid gap-6 md:grid-cols-2">
				<RoleGate allowedRole="CANDIDATE">
					<section className="rounded-lg border border-blue-200 bg-blue-50 p-6">
						<h2 className="text-xl font-semibold text-blue-900">Candidate Dashboard</h2>
						<p className="mt-2 text-blue-700">Upload your resume and find matching jobs.</p>
					</section>
				</RoleGate>

				<RoleGate allowedRole="RECRUITER">
					<section className="rounded-lg border border-green-200 bg-green-50 p-6">
						<h2 className="text-xl font-semibold text-green-900">Recruiter Dashboard</h2>
						<p className="mt-2 text-green-700">Post jobs and find matching candidates.</p>
					</section>
				</RoleGate>

				<RoleGate allowedRole="ADMIN">
					<section className="rounded-lg border border-purple-200 bg-purple-50 p-6">
						<h2 className="text-xl font-semibold text-purple-900">Admin Dashboard</h2>
						<p className="mt-2 text-purple-700">Manage users and system settings.</p>
					</section>
				</RoleGate>
			</div>
		</div>
	);
}
