import { RoleGate } from "@/components/auth/role-gate";
import { getAuthStatus } from "@/lib/auth";

/**
 * Home page component with role-protected sections
 *
 * @returns The home page with different content for each role
 */
export default async function HomePage() {
	const { user } = await getAuthStatus();

	return (
		<div className="space-y-8">
			<section className="rounded-lg border border-gray-200 bg-white p-6">
				<h1 className="text-2xl font-bold text-gray-900">Welcome to Resume Matcher</h1>
				<p className="mt-2 text-gray-600">
					{user ?
						"You are signed in. Check out the role-specific content below."
					:	"Sign in to access role-specific features."}
				</p>
			</section>

			{user && (
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
			)}
		</div>
	);
}
