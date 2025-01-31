import type { UserCreatedWebhook, UserDeletedWebhook, UserUpdatedWebhook } from "./schemas";

import { db } from "@/lib/db";

/**
 * Handles the user created webhook event
 *
 * @param event - The user created webhook event
 * @returns The created user and profile
 */
export async function handleUserCreated(event: UserCreatedWebhook) {
	const user = await db.user.create({
		data: {
			clerkId: event.data.id,
			email: event.data.email_addresses[0]?.email_address,
			firstName: event.data.first_name,
			lastName: event.data.last_name,
			// role: "CANDIDATE",
		},
	});

	const profile = await db.profile.create({
		data: {
			userId: user.id,
			name: `${user.firstName} ${user.lastName}`,
			email: user.email,
		},
	});

	return { user, profile };
}

/**
 * Handles the user updated webhook event
 *
 * @param event - The user updated webhook event
 * @returns The updated user and profile
 */
export async function handleUserUpdated(event: UserUpdatedWebhook) {
	const user = await db.user.findUnique({
		where: { clerkId: event.data.id },
	});

	if (!user) return new Response("User not found", { status: 404 });

	const profile = await db.profile.update({
		where: { userId: user.id },
		data: {
			name: `${user.firstName} ${user.lastName}`,
			email: user.email,
		},
	});

	return { user, profile };
}

/**
 * Handles the user deleted webhook event
 *
 * @param event - The user deleted webhook event
 * @returns The deleted user and profile
 */
export async function handleUserDeleted(event: UserDeletedWebhook) {
	const user = await db.user.findUnique({
		where: { clerkId: event.data.id },
	});

	if (!user) return new Response("User not found", { status: 404 });

	const deletedUser = await db.user.update({
		where: { id: user.id },
		data: { deleted: true },
	});

	const deletedProfile = await db.profile.update({
		where: { userId: user.id },
		data: { deleted: true },
	});

	return { user: deletedUser, profile: deletedProfile };
}
