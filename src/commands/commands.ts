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

const registerCommands = () => {

    if (DEV_ENVIRONMENT) {
        const definitions = commands.map(c => c.definition);
        definitions.forEach((v, i, a) => {
            if (!a[i].name.startsWith("t_")) a[i].name = "t_" + v.name;
        });

        return rest.put(Routes.applicationGuildCommands(APPLICATION_ID, DEV_SERVER_ID as string), {
            body: definitions
          });
    }
    return rest.put(Routes.applicationCommands(APPLICATION_ID), {
        body: commands.map(c => c.definition)
    });
}

const registerTagCommand = (definition: ApplicationCommandStructure, guildID: Snowflake) => {
    return rest.post(Routes.applicationGuildCommands(APPLICATION_ID, guildID), {
        body: definition
    });
}

const removeTagCommand = async (name: string, guildID: Snowflake) => {
    const commands = (await rest.get(Routes.applicationGuildCommands(APPLICATION_ID, guildID))) as ApplicationCommand[];
    const c = commands.find(v => v.name == name);
    if (!c) return false;

    await rest.delete(Routes.applicationGuildCommand(APPLICATION_ID, guildID, c.id));
    return true;
}

const commandHandler = (interaction: ChatInputCommandInteraction) => {
    if (DEV_ENVIRONMENT && !interaction.commandName.startsWith("t_")) return;

    const i = commands.findIndex(v => v.definition.name == interaction.commandName);

    const r = commands[i].handle(interaction);
    if (r instanceof Promise) r.catch(LOGGER.error);
}

export { registerCommands, commandHandler, registerTagCommand, removeTagCommand };