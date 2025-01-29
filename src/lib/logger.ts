import pc from "picocolors";

type LogLevel = "debug" | "info" | "warn" | "error";

/** Represents the structure of a log entry */
interface LogEntry {
	level: LogLevel;
	message: string;
	timestamp: string;
	context?: Record<string, unknown>;
	error?: Error;
}

/** Color configuration for different log levels */
const LOG_COLORS = {
	debug: {
		level: pc.magenta,
		timestamp: pc.gray,
		message: pc.white,
		context: pc.cyan,
	},
	info: {
		level: pc.blue,
		timestamp: pc.gray,
		message: pc.white,
		context: pc.cyan,
	},
	warn: {
		level: pc.yellow,
		timestamp: pc.gray,
		message: pc.yellow,
		context: pc.cyan,
	},
	error: {
		level: pc.red,
		timestamp: pc.gray,
		message: pc.red,
		context: pc.cyan,
	},
} as const;

/** Creates a formatted timestamp for logging */
const getTimestamp = () => new Date().toISOString();

/** Formats a context object into a colored string */
const formatContext = (context?: Record<string, unknown>): string => {
	if (!context || Object.keys(context).length === 0) return "";

	try {
		return ` ${pc.gray("•")} ${pc.cyan(JSON.stringify(context))}`;
	} catch {
		return ` ${pc.gray("•")} ${pc.red("[Invalid Context]")}`;
	}
};

/** Formats an error object into a colored string */
const formatError = (error?: Error): string => {
	if (!error) return "";

	const errorMessage = error.message || "Unknown error";
	const errorStack = error.stack || "";

	return `\n${pc.red("Error:")} ${errorMessage}\n${pc.gray("Stack:")} ${errorStack}`;
};

/** Formats a log entry into a readable string with colors */
const formatLogEntry = (entry: LogEntry): string => {
	const { level, message, timestamp, context, error } = entry;
	const colors = LOG_COLORS[level];

	const timestampStr = colors.timestamp(`[${timestamp}]`);
	const levelStr = colors.level(level.toUpperCase().padEnd(5));
	const messageStr = colors.message(message);
	const contextStr = formatContext(context);
	const errorStr = formatError(error);

	// For debug level, create a compact single-line format
	if (level === "debug") {
		return `${timestampStr} ${levelStr} ${messageStr}${contextStr}`;
	}

	// Multi-line format for other log levels
	return `${timestampStr} ${levelStr} ${messageStr}${contextStr}${errorStr}`;
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
