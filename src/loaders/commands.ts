import fs from "node:fs";
import path from "node:path";
import { Collection } from "discord.js";
import type { Command } from "../types/command";
import logger from "../utils/logger";

function getCommandFiles(dir: string): string[] {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((entry) => {
            const full = path.join(dir, entry.name);
            return entry.isDirectory() ? getCommandFiles(full) : [full];
        })
        .filter((f) => f.endsWith(".ts"));
}

export async function loadCommands(): Promise<Collection<string, Command>> {
    const commands = new Collection<string, Command>();
    const commandsDir = path.join(import.meta.dir, "../commands");

    for (const file of getCommandFiles(commandsDir)) {
        const mod = await import(file);
        const command: Command = mod.default ?? mod;

        if ("data" in command && ("execute" in command || "subcommands" in command)) {
            commands.set(command.data.name, command);
        } else {
            logger.warn(`[WARNING] ${file} is missing "data" or "execute"`);
        }
    }

    return commands;
}
