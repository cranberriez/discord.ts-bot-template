import { Client, GatewayIntentBits, Collection } from "discord.js";
import type { Command } from "./types/command";
import { loadCommands } from "./loaders/commands";
import { loadEvents } from "./loaders/events";
import { registerCommands } from "./loaders/register";
import config from "./config";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
    }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = await loadCommands();
await loadEvents(client);
await registerCommands(client);

client.login(config.token);
