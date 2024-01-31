import { ChatInputCommandInteraction } from "discord.js";
import { LOGGER } from "../constants";
import BaseCommand from "./base_command";

class TestCommand extends BaseCommand {
    constructor() {
        super({
            name: "test",
            description: "testy test"
        });
    }

    public handle = async (interaction: ChatInputCommandInteraction) => {
        interaction.reply("Pong!").catch(LOGGER.error);
    }
}

export default TestCommand;