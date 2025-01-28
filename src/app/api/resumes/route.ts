import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/** GET /api/resumes - Retrieve all resumes with optional filtering */
export async function GET() {
	try {
		const resumes = await prisma.resume.findMany({
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
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { fileUrl, fileName, candidateId } = body;

		if (!fileUrl || !fileName || !candidateId) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		// Check if candidate already has a resume (since it's a 1:1 relationship)
		const existingResume = await prisma.resume.findUnique({
			where: { candidateId },
		});

		if (existingResume) {
			return new NextResponse("Candidate already has a resume", { status: 400 });
		}

		const resume = await prisma.resume.create({
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
