import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type UserRole = "CANDIDATE" | "RECRUITER" | "ADMIN";

/**
 * Gets the current authenticated user's role
 *
 * @returns The user's role or null if not authenticated
 */
export async function getUserRole() {
	const { userId } = await auth();

	if (!userId) return null;

	const user = await currentUser();
	return user?.publicMetadata?.role as UserRole | null;
}

/**
 * Checks if the current user has the required role
 *
 * @param role - The role to check against
 * @returns True if the user has the required role
 */
export async function checkUserRole(role: UserRole) {
	const userRole = await getUserRole();
	return userRole === role;
}

/**
 * Protects a route based on user role
 *
 * @param role - The required role to access the route
 * @param redirectTo - The path to redirect to if unauthorized
 */
export async function protectRoute(role: UserRole, redirectTo = "/") {
	const hasRole = await checkUserRole(role);

	if (!hasRole) {
		redirect(redirectTo);
	}
}

/**
 * Gets the current user's authentication status and data
 *
 * @returns Object containing auth status and user data
 */
export async function getAuthStatus() {
	const { userId } = await auth();

	if (!userId) {
		return { isAuthenticated: false, user: null };
	}

	const user = await currentUser();
	return {
		isAuthenticated: true,
		user: {
			id: userId,
			role: user?.publicMetadata?.role as UserRole | null,
			email: user?.emailAddresses[0]?.emailAddress,
			name: `${user?.firstName} ${user?.lastName}`,
			imageUrl: user?.imageUrl,
		},
	};
}
