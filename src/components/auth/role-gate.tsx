import { getUserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

import type { UserRole } from "@/lib/auth";
import type React from "react";

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
	fallback?: React.ReactNode;
}

/**
 * A component that controls access to its children based on user role
 *
 * @param props - The component props
 * @returns The children if user has required role, fallback otherwise
 */
export async function RoleGate({ children, allowedRole, fallback }: RoleGateProps) {
	const role = await getUserRole();

	if (!role) {
		redirect("/sign-in");
	}

	if (role !== allowedRole) {
		return fallback || null;
	}

	return children;
}
