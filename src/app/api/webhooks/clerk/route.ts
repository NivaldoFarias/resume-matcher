import { headers } from "next/headers";

import {
	handleUserCreated,
	handleUserDeleted,
	handleUserUpdated,
} from "@/handlers/webhooks/clerk/user";
import { verifySignature } from "@/lib/verify-webhook";
import { userWebhookSchema } from "@/schemas/webhooks/clerk";

/**
 * Handles Clerk webhook events for user management
 *
 * @param request - The request object
 * @returns Response indicating success or failure
 */
export async function POST(request: Request) {
	const signatureResult = verifySignature(JSON.stringify(request.body), await headers());

	if (signatureResult instanceof Response) return signatureResult;

	const result = userWebhookSchema.safeParse(await request.json());

	if (!result.success) return new Response("Invalid webhook payload", { status: 400 });

	switch (result.data.type) {
		case "user.created":
			await handleUserCreated(result.data);
			break;
		case "user.updated":
			await handleUserUpdated(result.data);
			break;
		case "user.deleted":
			await handleUserDeleted(result.data);
			break;
		case "user.signed_in":
		default:
			break;
	}

	return new Response("Webhook processed", { status: 200 });
}
