import { Client } from "discord.js";
import { commandHandler, registerCommands } from "./commands/commands";
import { BOT_TOKEN, VERSION_STRING, LOGGER, CHANNEL_ID, ROLE_ID, DEV_ENVIRONMENT } from "./constants";
import { sendMail } from "./mail_utils";
import { EmailManagerImpl } from "./database";

const client = new Client({
    intents: ["DirectMessages","DirectMessageTyping","DirectMessageReactions","GuildMessages","GuildMessageTyping","GuildMessageReactions"]
});

client.on("ready", () => {
    LOGGER.info(`Mailer online. ${VERSION_STRING}`);
    
});

client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand()) return commandHandler(interaction);
    if(!interaction.isModalSubmit()) return;
    if(interaction.customId === "msgSender") {
        await interaction.reply({ content: "Message sent", ephemeral: true });
        const subject = interaction.fields.getTextInputValue("subjectInput");
        const msg = interaction.fields.getTextInputValue("msgInput");
        const emailManager = new EmailManagerImpl();
        const bccEmails = emailManager.getEmails();

        await sendMail(subject, msg, bccEmails);

        client.channels.fetch(CHANNEL_ID)
        .then(channel => {if(channel?.isTextBased()) channel.send(msg + "\n\n<@&" + ROLE_ID + ">")});
    }
});

registerCommands().then(() => {
    return client.login(BOT_TOKEN);
}).catch(LOGGER.error);