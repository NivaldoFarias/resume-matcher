type LogLevel = "debug" | "info" | "warn" | "error";

/** Represents the structure of a log entry */
interface LogEntry {
	level: LogLevel;
	message: string;
	timestamp: string;
	context?: Record<string, unknown>;
	error?: Error;
}

/** Creates a formatted timestamp for logging */
const getTimestamp = () => new Date().toISOString();

/** Formats a log entry into a readable string */
const formatLogEntry = (entry: LogEntry): string => {
	const { level, message, timestamp, context, error } = entry;
	const contextStr = context ? `\nContext: ${JSON.stringify(context, null, 2)}` : "";
	const errorStr = error ? `\nError: ${error.message}\nStack: ${error.stack}` : "";

	return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}${errorStr}`;
};

/** Logger class for handling application logging */
class Logger {
	private readonly isDevelopment: boolean;

	constructor() {
		this.isDevelopment = process.env.NODE_ENV === "development";
	}

	/** Logs a debug message */
	public debug(message: string, context?: Record<string, unknown>) {
		if (this.isDevelopment) {
			this.log("debug", message, context);
		}
	}

	/** Logs an info message */
	public info(message: string, context?: Record<string, unknown>) {
		this.log("info", message, context);
	}

	/** Logs a warning message */
	public warn(message: string, context?: Record<string, unknown>) {
		this.log("warn", message, context);
	}

	/** Logs an error message */
	public error(message: string, error?: Error, context?: Record<string, unknown>) {
		this.log("error", message, context, error);
	}

	/** Internal method to handle log entry creation and output */
	private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
		const entry: LogEntry = {
			level,
			message,
			timestamp: getTimestamp(),
			context,
			error,
		};

		const formattedLog = formatLogEntry(entry);

		// In production, we might want to send logs to a service
		if (this.isDevelopment) {
			console[level](formattedLog);
		} else {
			// TODO: Add production logging service integration
			console[level](formattedLog);
		}
	}
}

export const logger = new Logger();
