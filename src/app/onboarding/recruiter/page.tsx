import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Recruiter onboarding multi-step form page
 *
 * @returns The recruiter onboarding form layout
 */
export default function RecruiterOnboardingPage() {
	return (
		<div className="flex flex-col items-center justify-start h-screen">
			<div className="container max-w-3xl py-10">
				<Card className="p-6">
					<div className="mb-8">
						<h1 className="text-2xl font-bold">Complete Your Recruiter Profile</h1>
						<p className="text-muted-foreground">Tell us about your company to get started</p>
					</div>

					{/* Progress indicator */}
					<div className="mb-8">
						<div className="flex justify-between">
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center">
									1
								</div>
								<div className="ml-2">Company Info</div>
							</div>
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
									2
								</div>
								<div className="ml-2">Job Details</div>
							</div>
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
									3
								</div>
								<div className="ml-2">Requirements</div>
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
						<Button variant="outline">Back</Button>
						<Button>Continue</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
