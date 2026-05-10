import type { Client } from "discord.js";
import { Events } from "discord.js";
import type { Event } from "../types/event";
import logger from "../utils/logger";

export default {
    name: Events.ClientReady,
    once: true,
    execute: (readyClient: Client<true>) => {
        logger.log(`Ready! Logged in as ${readyClient.user.tag}`);
    },
} satisfies Event<typeof Events.ClientReady>;
