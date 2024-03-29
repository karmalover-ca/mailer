import {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LOGGER, SMTP_ADDRESS, SMTP_REPLY_TO } from "./constants"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

export async function sendMail(subject: string, msg: string, bcc: string[]) {
    const mailOptions = {
        from: SMTP_ADDRESS,
        to: SMTP_USER,
        subject: subject,
        text: `${msg}\n\nRespectfully,\nLake Effect Robotics`,
        bcc: bcc,
        replyTo: SMTP_REPLY_TO,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return LOGGER.error(error.message);
        }
    });
};