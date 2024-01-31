import { ConsoleLogger, FileLogger, Logger } from "./logger";

export const IS_PRODUCTION: boolean = process.env.IS_PRODUCTION != undefined;

// make this a file logger for production
export const LOGGER: Logger = IS_PRODUCTION ? new FileLogger(process.env.LOG_FILE ?? "./latest.log") : new ConsoleLogger();

export const BOT_TOKEN: string = process.env.BOT_TOKEN || "";

export const APPLICATION_ID: string = process.env.APPLICATION_ID || "";

export const DEV_SERVER_ID: string = process.env.DEV_SERVER_ID || "";
export const DEV_ENVIRONMENT = DEV_SERVER_ID != undefined;

export const VERSION = process.env.VERSION ?? "1.0.0";

export const VERSION_STRING = process.env.VERSION_STRING ?? "Mailer-v" + VERSION;

export const SMTP_HOST = process.env.SMTP_HOST || "";
// parseInt as base 10
export const SMTP_PORT: number = parseInt(process.env.SMTP_PORT!, 10) || 587;
export const SMTP_USER = process.env.SMTP_USER || "";
export const SMTP_PASS = process.env.SMTP_PASS || "";
export const SMTP_ADDRESS = process.env.SMTP_ADDRESS || "";