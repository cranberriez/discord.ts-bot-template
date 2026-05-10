import fs from "node:fs";
import path from "node:path";
import type { Client } from "discord.js";
import type { Event } from "../types/event";
import logger from "../utils/logger";

function getEventFiles(dir: string): string[] {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => path.join(dir, entry.name))
        .filter((f) => f.endsWith(".ts"));
}

export async function loadEvents(client: Client): Promise<void> {
    const eventsDir = path.join(import.meta.dir, "../events");

    for (const file of getEventFiles(eventsDir)) {
        const mod = await import(file);
        const event: Event = mod.default ?? mod;

        if ("name" in event && "execute" in event) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        } else {
            logger.warn(`[WARNING] ${file} is missing "name" or "execute"`);
        }
    }
}
