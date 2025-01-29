import { NextResponse } from "next/server";

import type { Resume } from "@prisma/client";
import type { NextRequest } from "next/server";

import { db } from "@/lib/db";

/** GET /api/resumes - Retrieve all resumes with optional filtering */
export async function GET() {
	try {
		const resumes = await db.resume.findMany({
			include: {
				candidate: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(resumes);
	} catch (error) {
		console.error("[RESUMES_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

/** POST /api/resumes - Create a new resume entry */
export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Partial<Resume>;
		const { fileUrl, fileName, candidateId } = body;

		if (!fileUrl || !fileName || !candidateId) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		// Check if candidate already has a resume (since it's a 1:1 relationship)
		const existingResume = await db.resume.findUnique({
			where: { candidateId },
		});

		if (existingResume) {
			return new NextResponse("Candidate already has a resume", { status: 400 });
		}

		const resume = await db.resume.create({
			data: {
				fileUrl,
				fileName,
				candidateId,
			},
			include: {
				candidate: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},
			},
		});

		return NextResponse.json(resume);
	} catch (error) {
		console.error("[RESUMES_POST]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
