import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import type { Command } from "./types/command";
import { loadCommands } from "./loaders/commands";
import config from "../config.json";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
    }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = await loadCommands();

client.login(config.token);
