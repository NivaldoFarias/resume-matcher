"use client";

import { logger } from "@/lib/logger";
import React from "react";

interface Props {
	children: React.ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

/** Error boundary component for handling client-side errors gracefully */
export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		logger.error("Client-side error caught", error, {
			componentStack: errorInfo.componentStack,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
						<h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
						<p className="text-gray-600 mb-4">
							We apologize for the inconvenience. Please try refreshing the page or contact support
							if the problem persists.
						</p>
						<button
							onClick={() => {
								this.setState({ hasError: false, error: null });
								window.location.reload();
							}}
							className="w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
						>
							Refresh Page
						</button>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto text-sm">
								{this.state.error.message}
								{"\n"}
								{this.state.error.stack}
							</pre>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
