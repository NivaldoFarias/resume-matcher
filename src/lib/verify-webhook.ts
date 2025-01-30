import { Webhook } from "svix/dist/webhook";

import type { WebhookEvent } from "@clerk/nextjs/server";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

/**
 * Verifies the webhook signature
 *
 * @param body - The webhook body
 * @param headers - The webhook headers
 * @returns The webhook event
 */
export function verifySignature(body: string, headers: ReadonlyHeaders) {
	const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!CLERK_WEBHOOK_SECRET) {
		throw new Error(
			"Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
		);
	}

	const webhook = new Webhook(CLERK_WEBHOOK_SECRET);

	const svix_id = headers.get("svix-id");
	const svix_timestamp = headers.get("svix-timestamp");
	const svix_signature = headers.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		const concatMissingHeaders = [
			{ label: "svix-id", value: svix_id },
			{ label: "svix-timestamp", value: svix_timestamp },
			{ label: "svix-signature", value: svix_signature },
		]
			.filter(({ value }) => !value)
			.map(({ label }) => `'${label}'`)
			.join(", ");

		return new Response(`Missing svix headers: ${concatMissingHeaders}`, { status: 400 });
	}

	try {
		return webhook.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (error) {
		console.error("Error: Could not verify webhook:", error);

		return new Response("Invalid signature", { status: 400 });
	}
}
