import Link from "next/link";

import { Button } from "@/components/ui/button";

export interface NotFoundTemplateProps {
	header: string;
	description: string;
	buttonText: string;
	buttonLink: string;
}

export default function NotFoundTemplate(props: NotFoundTemplateProps) {
	return function NotFound() {
		return (
			<div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
				<h2 className="text-2xl font-bold">{props.header}</h2>
				<p>{props.description}</p>
				<Button asChild>
					<Link href={props.buttonLink}>{props.buttonText}</Link>
				</Button>
			</div>
		);
	};
}
