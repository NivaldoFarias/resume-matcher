import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@/lib/db";

/**
 * Handles Clerk webhook events for user management
 *
 * @returns Response indicating success or failure
 */
export async function POST(request: Request) {
	const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!CLERK_WEBHOOK_SECRET) {
		throw new Error(
			"Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
		);
	}

	// Create new Svix instance with secret
	const webhook = new Webhook(CLERK_WEBHOOK_SECRET);

	// Verify the webhook signature
	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Missing svix headers", { status: 400 });
	}

	// Get the webhook body
	const payload = await request.json();
	const body = JSON.stringify(payload);

	let event: WebhookEvent;

	try {
		event = webhook.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (error) {
		console.error("Error: Could not verify webhook:", error);

		return new Response("Invalid signature", { status: 400 });
	}

	// Handle the webhook event
	if (event.type === "user.created") {
		// Create a new candidate record
		await db.candidate.create({
			data: {
				clerkId: event.data.id,
				email: event.data.email_addresses[0]?.email_address,
				firstName: event.data.first_name,
				lastName: event.data.last_name,
				role: "CANDIDATE", // Set default role
			},
		});
	}

	return new Response("Webhook processed", { status: 200 });
}
