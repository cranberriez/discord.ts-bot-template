import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

type CommandData = Pick<SlashCommandBuilder, "name" | "toJSON">;
type Handler = (interaction: ChatInputCommandInteraction) => Promise<void>;

interface BaseCommand {
    data: CommandData;
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
