"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export interface ErrorTemplateProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorTemplate(text: string) {
	return function Error({ error, reset }: ErrorTemplateProps) {
		useEffect(() => {
			console.error(error);
		}, [error]);

		return (
			<div className="flex h-full flex-col items-center justify-center gap-2">
				<h2 className="text-2xl font-bold">{text}</h2>
				<Button onClick={() => reset()}>Try again</Button>
			</div>
		);
	};
}
