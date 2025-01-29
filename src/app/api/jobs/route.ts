import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import type { Job } from "@prisma/client";
import type { NextRequest } from "next/server";

import { db } from "@/lib/db";

/**
 * GET /api/jobs - Retrieve all jobs with optional filtering
 *
 * @param request - NextRequest object containing query parameters:
 *
 *   - Search: string - Search term for title, company, or description
 *   - Page: number - Page number for pagination (default: 1)
 *   - Limit: number - Number of items per page (default: 10)
 *   - SortBy: 'createdAt' | 'title' | 'company' - Field to sort by (default: 'createdAt')
 *   - Order: 'asc' | 'desc' - Sort order (default: 'desc')
 *   - Location: string - Filter by location
 *
 * @returns - A Promise that resolves to a NextResponse object containing the jobs and pagination
 *   metadata
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Parse query parameters
		const search = searchParams.get("search");
		const page = Math.max(1, Number(searchParams.get("page")) || 1);
		const limit = Math.max(1, Math.min(50, Number(searchParams.get("limit")) || 10));
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const order = searchParams.get("order")?.toLowerCase() === "asc" ? "asc" : "desc";
		const location = searchParams.get("location");

		// Calculate pagination
		const skip = (page - 1) * limit;

		// Build where clause for filtering
		const where: Prisma.JobWhereInput = {
			...(search ?
				{
					OR: [
						{ title: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
						{ company: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
						{ description: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
					],
				}
			:	{}),
			...(location ?
				{
					location: { contains: location, mode: "insensitive" as Prisma.QueryMode },
				}
			:	{}),
		};

		// Get total count for pagination
		const total = await db.job.count({ where });

		// Get filtered and paginated jobs
		const jobs = await db.job.findMany({
			where,
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
				[sortBy]: order,
			},
			skip,
			take: limit,
		});

		// Return response with pagination metadata
		return NextResponse.json({
			jobs,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				hasMore: page * limit < total,
			},
		});
	} catch (error) {
		console.error("[JOBS_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

/** POST /api/jobs - Create a new job posting */
export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Partial<Job>;
		const { title, company, description, location, recruiterId } = body;

		if (!title || !company || !description || !location || !recruiterId) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const job = await db.job.create({
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
