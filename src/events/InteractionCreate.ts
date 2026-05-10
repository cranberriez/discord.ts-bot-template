import type { Interaction } from "discord.js";
import { Events } from "discord.js";
import type { Event } from "../types/event";
import logger from "../utils/logger";

export default {
    name: Events.InteractionCreate,
    execute: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            logger.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        logger.log(`/${interaction.commandName} used by ${interaction.user.tag} (${interaction.user.id}) in ${interaction.guildId ?? "DM"}`);

        try {
            if (command.subcommands) {
                const sub = interaction.options.getSubcommand(false);
                const handler = sub ? command.subcommands[sub] : undefined;
                if (!handler) {
                    logger.error(`No handler for subcommand "${sub}" in /${interaction.commandName}`);
                    return;
                }
                await handler(interaction);
            } else {
                await command.execute(interaction);
            }
        } catch (error) {
            logger.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        }
    },
} satisfies Event<typeof Events.InteractionCreate>;
