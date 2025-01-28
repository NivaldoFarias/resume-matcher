import { RoleGate } from "@/components/auth/role-gate";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getCandidates } from "./_actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

/**
 * Candidates page component that displays a list of all candidates
 *
 * @returns The candidates page component with data table and loading states
 */
export default async function CandidatesPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const candidates = await getCandidates();

	return (
		<div className="container mx-auto py-10">
			<RoleGate allowedRole="ADMIN">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
					</div>
					<Suspense fallback={<CandidatesTableSkeleton />}>
						<DataTable columns={columns} data={candidates} />
					</Suspense>
				</div>
			</RoleGate>
		</div>
	);
}

/**
 * Skeleton loader component for the candidates table
 *
 * @returns A skeleton UI component showing loading state
 */
function CandidatesTableSkeleton() {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} className="h-12 w-full" />
				))}
			</div>
		</div>
	);
}
