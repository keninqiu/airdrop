type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
    private prefix: string;

    constructor(prefix: string = 'Crawler') {
        this.prefix = prefix;
    }

    private formatMessage(level: LogLevel, message: string, data?: unknown): string {
        const timestamp = new Date().toISOString();
        const dataStr = data ? ` ${JSON.stringify(data)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] [${this.prefix}] ${message}${dataStr}`;
    }

    info(message: string, data?: unknown) {
        console.log(this.formatMessage('info', message, data));
    }

    warn(message: string, data?: unknown) {
        console.warn(this.formatMessage('warn', message, data));
    }

    error(message: string, error?: unknown) {
        const errorData = error instanceof Error
            ? { message: error.message, stack: error.stack }
            : error;
        console.error(this.formatMessage('error', message, errorData));
    }

    debug(message: string, data?: unknown) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(this.formatMessage('debug', message, data));
        }
    }
}

export const createLogger = (prefix: string) => new Logger(prefix);
export const logger = new Logger();
