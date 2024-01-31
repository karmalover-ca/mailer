import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, ModalBuilder, PermissionFlagsBits, TextInputBuilder, TextInputStyle } from "discord.js";
import { LOGGER } from "../constants";
import BaseCommand from "./base_command";

class TestCommand extends BaseCommand {
    constructor() {
        super({
            name: "send",
            description: "send messages",
            default_member_permissions: "0",
            dm_permission: false,
        })
    }

    public handle = async (interaction: ChatInputCommandInteraction) => {
        if(!interaction.guildId) return interaction.reply("This command can only be run in a server.");

        const modal = new ModalBuilder()
            .setCustomId("msgSender")
            .setTitle("Message Mailer");

        const subjectInput = new TextInputBuilder()
            .setCustomId("subjectInput")
            .setLabel("Subject")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setRequired(true);

        const msgInput = new TextInputBuilder()
            .setCustomId("msgInput")
            .setLabel("Message")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(1)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(subjectInput);
        const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(msgInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
}

export default TestCommand;