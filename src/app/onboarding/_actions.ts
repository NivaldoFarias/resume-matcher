import { type UserRole } from "@/lib/auth";
import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * Updates the user's role in Clerk's public metadata
 *
 * @param role - The role to set for the user (CANDIDATE or RECRUITER)
 * @returns An object containing a success/error message
 */
export const setUserRole = async (role: UserRole) => {
	const { userId } = await auth();
	const client = await clerkClient();

	if (!userId) {
		return { success: false, message: "No logged in user" };
	}

	try {
		await client.users.updateUser(userId, {
			publicMetadata: { role },
		});

		return { success: true, message: "Role updated successfully" };
	} catch (error) {
		console.error("Error updating user role:", error);
		return { success: false, message: "Error updating user role" };
	}
};
