import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { type UserRole } from "@/lib/auth";

import { setUserRole } from "./_actions";

async function handleSetRole(role: UserRole) {
	"use server";

	const result = await setUserRole(role);

	if (result.success) {
		redirect("/");
	}
}

/**
 * Onboarding page for role selection after first sign-in
 *
 * @returns The onboarding page component
 */
export default async function OnboardingPage() {
	const user = await currentUser();

	// if (!user) redirect("/sign-in");
	// if (user?.publicMetadata?.role) redirect("/");

	return (
		<div className="mx-auto max-w-2xl">
			<div className="rounded-lg border border-gray-200 bg-white p-6">
				<h1 className="text-2xl font-bold text-gray-900">Choose Your Role</h1>
				<p className="mt-2 text-gray-600">Select your role to get started with Resume Matcher.</p>

				<div className="mt-8 grid gap-4">
					<form action={handleSetRole.bind(null, "CANDIDATE")}>
						<button
							type="submit"
							className="w-full rounded-lg border border-blue-200 bg-blue-50 p-4 text-left hover:bg-blue-100"
						>
							<h3 className="text-lg font-semibold text-blue-900">I'm a Candidate</h3>
							<p className="mt-1 text-blue-700">
								Looking for job opportunities that match my skills.
							</p>
						</button>
					</form>

					<form action={handleSetRole.bind(null, "RECRUITER")}>
						<button
							type="submit"
							className="w-full rounded-lg border border-green-200 bg-green-50 p-4 text-left hover:bg-green-100"
						>
							<h3 className="text-lg font-semibold text-green-900">I'm a Recruiter</h3>
							<p className="mt-1 text-green-700">
								Looking for candidates that match our job requirements.
							</p>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
