import { Client } from "discord.js";
import { commandHandler, registerCommands } from "./commands/commands";
import { BOT_TOKEN, VERSION_STRING, LOGGER, CHANNEL_ID, ROLE_ID, DEV_ENVIRONMENT, TEST_ROLE_ID, TEST_CHANNEL_ID } from "./constants";
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

    // Checking for modal interaction
    if(!interaction.isModalSubmit()) return;
    if(interaction.customId === "msgSender") {
        await interaction.reply({ content: "Message sent", ephemeral: true });
        const subject = interaction.fields.getTextInputValue("subjectInput");
        const msg = interaction.fields.getTextInputValue("msgInput");
        const emailManager = new EmailManagerImpl();
        const bccEmails = emailManager.getEmails();

        await sendMail(subject, msg, ["wartmand@limestone.on.ca"], bccEmails);

        client.channels.fetch(CHANNEL_ID)
        .then(channel => {if(channel?.isTextBased()) channel.send(msg + "\n\n<@&" + ROLE_ID + ">")});

    } else if(interaction.customId === "testMsgSender") {
        await interaction.reply({ content: "Test Message sent", ephemeral: true });
        const subject = interaction.fields.getTextInputValue("testSubjectInput");
        const msg = interaction.fields.getTextInputValue("testMsgInput");

        await sendMail("*TEST* "+subject, msg, ["liamphone0@gmail.com"], ["lakeeffectrobotics@gmail.com"]);

        client.channels.fetch(TEST_CHANNEL_ID)
        .then(channel => {if(channel?.isTextBased()) channel.send(msg + "\n\n<@&" + TEST_ROLE_ID + ">")});
    }
});

registerCommands().then(() => {
    return client.login(BOT_TOKEN);
}).catch(LOGGER.error);