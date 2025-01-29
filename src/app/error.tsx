"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-2">
			<h2 className="text-2xl font-bold">Something went wrong!</h2>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}
