import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Candidate onboarding multi-step form page
 *
 * @returns The candidate onboarding form layout
 */
export default function CandidateOnboardingPage() {
	return (
		<div className="flex flex-col items-center justify-start h-screen">
			<div className="container max-w-3xl  py-10">
				<Card className="p-6">
					<div className="mb-8">
						<h1 className="text-2xl font-bold">Complete Your Candidate Profile</h1>
						<p className="text-muted-foreground">Tell us about yourself to get started</p>
					</div>

					{/* Progress indicator */}
					<div className="mb-8">
						<div className="flex justify-between">
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
									1
								</div>
								<div className="ml-2">Basic Info</div>
							</div>
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
									2
								</div>
								<div className="ml-2">Experience</div>
							</div>
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
									3
								</div>
								<div className="ml-2">Resume</div>
							</div>
						</div>
					</div>

					{/* Form placeholder */}
					<div className="space-y-6">
						<div className="h-32 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
							Form fields will go here
						</div>
					</div>

					{/* Navigation buttons */}
					<div className="mt-8 flex justify-between">
						<Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
							Back
						</Link>
						<Button>Continue</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
