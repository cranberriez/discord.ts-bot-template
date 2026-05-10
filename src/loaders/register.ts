import { REST, Routes } from "discord.js";
import type { Client } from "discord.js";
import config from "../../config.jsonc";

export async function registerCommands(client: Client): Promise<void> {
    const rest = new REST().setToken(config.token);

    const globalCommands: any[] = [];
    const guildCommands = new Map<string, any[]>();

    for (const command of client.commands.values()) {
        const json = command.data.toJSON();

        if (command.global) {
            globalCommands.push(json);
        } else if (command.servers?.length) {
            for (const serverId of command.servers) {
                if (!guildCommands.has(serverId)) guildCommands.set(serverId, []);
                guildCommands.get(serverId)!.push(json);
            }
        } else {
            if (!guildCommands.has(config.guildId)) guildCommands.set(config.guildId, []);
            guildCommands.get(config.guildId)!.push(json);
        }
    }

    const tasks: Promise<void>[] = [];

    if (globalCommands.length > 0) {
        tasks.push(
            rest
                .put(Routes.applicationCommands(config.appId), { body: globalCommands })
                .then((data: any) => {
                    console.log(`Registered ${data.length} global command(s).`);
                }),
        );
    }

    for (const [guildId, commands] of guildCommands) {
        tasks.push(
            rest
                .put(Routes.applicationGuildCommands(config.appId, guildId), { body: commands })
                .then((data: any) => {
                    console.log(`Registered ${data.length} command(s) to guild ${guildId}.`);
                }),
        );
    }

    try {
        await Promise.all(tasks);
    } catch (error) {
        console.error("Failed to register commands:", error);
        throw error;
    }
}
