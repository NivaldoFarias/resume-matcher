import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container mx-auto py-10">
			<Skeleton className="h-10 w-full mb-4" />
			<div className="space-y-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} className="h-16 w-full" />
				))}
			</div>
		</div>
	);
}
