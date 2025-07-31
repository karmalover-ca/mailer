import { ApplicationCommand, ChatInputCommandInteraction, REST, Routes, Snowflake } from "discord.js";
import { APPLICATION_ID, BOT_TOKEN, DEV_ENVIRONMENT, DEV_SERVER_ID, LOGGER } from "../constants";

import BaseCommand, { ApplicationCommandStructure } from "./base_command";
import PingCommand from "./ping_command";
import SendCommand from "./send_command";
import EmailCommand from "./email_command";
import TestCommand from "./test_command";
import ListEmailsCommand from "./list_emails_command";

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

// new commands get added here
const commands: BaseCommand[] = [
    new PingCommand(),
    new SendCommand(),
    new EmailCommand(),
    new ListEmailsCommand(),
    new TestCommand()
];

const registerCommands = async () => {
    try {
        let definitions;

        if (DEV_ENVIRONMENT) {
            definitions = commands.map(c => {
                const name = c.definition.name.startsWith("t_") ? c.definition.name : "t_" + c.definition.name;
                return { ...c.definition, name };
            });

            const result = await rest.put(
                Routes.applicationGuildCommands(APPLICATION_ID, DEV_SERVER_ID as string),
                { body: definitions }
            );

            LOGGER.info(`Registered ${definitions.length} dev commands to guild id ${DEV_SERVER_ID}`);
            return result;
        }

        // Production
        definitions = commands.map(c => c.definition);

        const result = await rest.put(
            Routes.applicationCommands(APPLICATION_ID),
            { body: definitions }
        );

        LOGGER.info(`Registered ${definitions.length} global commands`);
        return result
    } catch(error) {
        LOGGER.fatal("Failed to register commands:\n" + error);
    }
}

// Use to fix really stuck commands that don't wanna clear
// ! Only use once
const fixUnclearedCommands = async () => {
    if (DEV_ENVIRONMENT) {
        const result = await rest.put(
            Routes.applicationGuildCommands(APPLICATION_ID, DEV_SERVER_ID as string),
            { body: [] } // Sends a empty array to "clear" the commands
        );

        LOGGER.info("Cleared registered dev commands");
        return result;
    }

    // For global commands
    const result = await rest.put(
        Routes.applicationCommands(APPLICATION_ID),
        { body: [] } // Sends a empty array to "clear" the commands
    );

    LOGGER.info("Cleared registered global commands");
    return result;
}

const commandHandler = (interaction: ChatInputCommandInteraction) => {
    if (DEV_ENVIRONMENT && !interaction.commandName.startsWith("t_")) return;

    const i = commands.findIndex(v => v.definition.name == interaction.commandName);

    const r = commands[i].handle(interaction);
    if (r instanceof Promise) r.catch(LOGGER.error);
}

export { registerCommands, commandHandler, fixUnclearedCommands};