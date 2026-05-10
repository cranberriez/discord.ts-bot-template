import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/command";

export default {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
} satisfies Command;
