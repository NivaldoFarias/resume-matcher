import { currentUser } from "@clerk/nextjs/server";

import type { Candidate } from "@prisma/client";

import { db } from "@/lib/db";

/**
 * Fetches all candidates from the database
 *
 * @returns An array of candidates with their information
 */
export async function getCandidates() {
	const user = await currentUser();

	if (!user) throw new Error("Unauthorized");

	try {
		const candidates = await db.candidate.findMany({
			orderBy: {
				createdAt: "desc",
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				status: true,
				createdAt: true,
			},
		});

		return candidates as Candidate[];
	} catch (error) {
		console.error("Error fetching candidates:", error);
		throw new Error("Failed to fetch candidates");
	}
}

/**
 * Updates a candidate's status
 *
 * @param candidateId - The ID of the candidate to update
 * @param status - The new status to set
 * @returns The updated candidate
 */
export async function updateCandidateStatus(candidateId: string, status: string) {
	const user = await currentUser();

	if (!user) throw new Error("Unauthorized");

	try {
		const updatedCandidate = await db.candidate.update({
			where: {
				id: candidateId,
			},
			data: {
				status,
			},
		});

		return updatedCandidate;
	} catch (error) {
		console.error("Error updating candidate status:", error);
		throw new Error("Failed to update candidate status");
	}
}
