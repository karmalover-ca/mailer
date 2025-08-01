import { ChatInputCommandInteraction } from "discord.js";
import { LOGGER } from "../constants";
import BaseCommand from "./base_command";
import { EmailManagerImpl } from "../database";

class ListEmailsCommand extends BaseCommand {
    constructor() {
        super({
            name: "list_emails",
            description: "Show all the emails on the email list",
            default_member_permissions: "0",
            dm_permission: false,
        });
    }

    public handle = async (interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply({ephemeral: true}).catch(LOGGER.error);
        const emailManager = new EmailManagerImpl();

        let msg: string = `\`\`\`json\n${JSON.stringify(emailManager.getEmails(), null, 4)}\`\`\``

        if (msg.length >= 2000 ) msg = "Message is too big please bully Liam for more info"

        await interaction.followUp({content: msg}).catch(LOGGER.error);
    }
}

export default ListEmailsCommand;