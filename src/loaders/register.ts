import { REST, Routes } from "discord.js";
import type { Client } from "discord.js";
import config from "../../config.jsonc";

export async function registerCommands(client: Client): Promise<void> {
    const commands = client.commands.map((command) => command.data.toJSON());

    const rest = new REST().setToken(config.token);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data: any = await rest.put(
            Routes.applicationGuildCommands(config.appId, config.guildId),
            {
                body: commands,
            },
        );

        console.log(`Successfully reloaded ${(data as any).length} application (/) commands.`);
    } catch (error) {
        console.error("Failed to register commands:", error);
        throw error;
    }
}
