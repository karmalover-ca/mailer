import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { LOGGER } from "../constants";
import BaseCommand from "./base_command";
import { EmailManagerImpl } from "../database";

class EmailCommand extends BaseCommand {
    constructor() {
        super({
            name: "email",
            description: "manage emails",
            default_member_permissions: "0",
            dm_permission: false,

            options: [
                {
                    name: "add",
                    description: "add an email to the bcc list",
                    type: ApplicationCommandOptionType.Subcommand,

                    options: [
                        {
                            name: "email",
                            description: "the email you with to add",
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: "remove",
                    description: "remove email from the bcc list",
                    type: ApplicationCommandOptionType.Subcommand,

                    options: [
                        {
                            name: "email",
                            description: "the email you with to remove",
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                }
            ]
        });
    }

    public handle = async (interaction: ChatInputCommandInteraction) => {
        const command  = interaction.options.getSubcommand(true);
        await interaction.deferReply({ ephemeral: true }).catch(LOGGER.error);
        const email = interaction.options.getString("email", true);
        if (validateEmail(email) !== true) return await interaction.followUp("Email is not valid");
        const emailManager = new EmailManagerImpl();

        if (command === "add") {
            emailManager.addEmail(email);
            await interaction.followUp("Added email to bcc list");
        }
        if (command === "remove") {
            if (emailManager.removeEmail(email)) {
                await interaction.followUp("Successfully removed email from bcc list");
            } else {
                await interaction.followUp("Unable to find/remove, specified email. Please check the imput and try again");
            }
        }
    }
}

const validateEmail = (email: string): boolean => {
    const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
};

export default EmailCommand;