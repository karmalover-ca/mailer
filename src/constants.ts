import { ConsoleLogger, FileLogger, Logger } from "./logger";

export const IS_PRODUCTION: boolean = process.env.IS_PRODUCTION != undefined;

// make this a file logger for production
export const LOGGER: Logger = IS_PRODUCTION ? new FileLogger(process.env.LOG_FILE ?? "./latest.log") : new ConsoleLogger();

export const BOT_TOKEN: string = process.env.BOT_TOKEN || "";

export const APPLICATION_ID: string = process.env.APPLICATION_ID || "";

export const DEV_SERVER_ID: string = process.env.DEV_SERVER_ID || "";
export const DEV_ENVIRONMENT = !IS_PRODUCTION;

export const VERSION = process.env.VERSION ?? "1.0.0";

export const VERSION_STRING = process.env.VERSION_STRING ?? "Mailer-v" + VERSION;

export const SMTP_HOST = process.env.SMTP_HOST || "";
// parseInt as base 10
export const SMTP_PORT: number = parseInt(process.env.SMTP_PORT!, 10) || 587;
export const SMTP_USER = process.env.SMTP_USER || "";
export const SMTP_PASS = process.env.SMTP_PASS || "";
export const SMTP_ADDRESS = process.env.SMTP_ADDRESS || "";
export const SMTP_REPLY_TO = process.env.SMTP_REPLY_TO || "";

export const CC_EMAILS = process.env.CC_EMAILS?.split(" ") || [""];
export const TEST_CC_EMAILS = process.env.TEST_CC_EMAILS?.split(" ") || [""];
export const TEST_BCC_EMAILS = process.env.TEST_BCC_EMAILS?.split(" ") || [""];

export const CHANNEL_ID = process.env.CHANNEL_ID || "";
export const TEST_CHANNEL_ID = process.env.TEST_CHANNEL_ID || "";

export const ROLE_ID = process.env.ROLE_ID || "";
export const TEST_ROLE_ID = process.env.TEST_ROLE_ID || "";