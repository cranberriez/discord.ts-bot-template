import { REST, Routes } from "discord.js";
import type { Client } from "discord.js";
import config from "../config";
import logger from "../utils/logger";

export async function registerCommands(client: Client): Promise<void> {
    const rest = new REST().setToken(config.token);

    // Build a set of every command name that is explicitly assigned to a guild.
    const guildAssigned = new Set(Object.values(config.guilds).flat());

    // Everything not assigned to a guild is registered globally.
    const globalCommands = [...client.commands.values()]
        .filter((cmd) => !guildAssigned.has(cmd.data.name))
        .map((cmd) => cmd.data.toJSON());

    // Per-guild: resolve each name to a command, warn on unknowns.
    const guildCommands = new Map<string, any[]>();
    for (const [guildId, names] of Object.entries(config.guilds)) {
        const cmds = names.flatMap((name) => {
            const cmd = client.commands.get(name);
            if (!cmd) {
                logger.warn(`Guild ${guildId} lists unknown command "${name}" — skipping`);
                return [];
            }
            return [cmd.data.toJSON()];
        });
        if (cmds.length) guildCommands.set(guildId, cmds);
    }

    const tasks: Promise<void>[] = [];

    if (globalCommands.length > 0) {
        tasks.push(
            rest
                .put(Routes.applicationCommands(config.appId), { body: globalCommands })
                .then((data: any) => {
                    logger.log(`Registered ${data.length} global command(s).`);
                }),
        );
    }

    for (const [guildId, cmds] of guildCommands) {
        tasks.push(
            rest
                .put(Routes.applicationGuildCommands(config.appId, guildId), { body: cmds })
                .then((data: any) => {
                    logger.log(`Registered ${data.length} command(s) to guild ${guildId}.`);
                }),
        );
    }

    try {
        await Promise.all(tasks);
    } catch (error) {
        logger.error("Failed to register commands:");
        throw error;
    }
}
