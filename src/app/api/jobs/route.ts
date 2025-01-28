import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/jobs - Retrieve all jobs with optional filtering
 */
export async function GET() {
	try {
		const jobs = await prisma.job.findMany({
			include: {
				recruiter: {
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

		return NextResponse.json(jobs);
	} catch (error) {
		console.error("[JOBS_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

/**
 * POST /api/jobs - Create a new job posting
 */
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { title, company, description, location, recruiterId } = body;

		if (!title || !company || !description || !location || !recruiterId) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const job = await prisma.job.create({
			data: {
				title,
				company,
				description,
				location,
				recruiterId,
			},
			include: {
				recruiter: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					},
				},
			},
		});

		return NextResponse.json(job);
	} catch (error) {
		console.error("[JOBS_POST]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
