import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

type CommandData = Pick<SlashCommandBuilder, "name" | "toJSON">;
type Handler = (interaction: ChatInputCommandInteraction) => Promise<void>;

interface BaseCommand {
    data: CommandData;
    /** Register this command as a global Discord command (available in all guilds and DMs). */
    global?: boolean;
    /** Restrict this command to specific guild IDs. Ignored when `global` is true. */
    servers?: string[];
}

interface SimpleCommand extends BaseCommand {
    execute: Handler;
    subcommands?: never;
}

interface SubcommandCommand extends BaseCommand {
    subcommands: Record<string, Handler>;
    execute?: never;
}

export type Command = SimpleCommand | SubcommandCommand;
