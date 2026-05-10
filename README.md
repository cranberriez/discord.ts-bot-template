# Discord.ts Bot Template

A TypeScript Discord bot template using Bun, discord.js, and an event-driven architecture.

## Setup

### Prerequisites

- [Bun](https://bun.sh) installed
- A Discord bot token from the [Developer Portal](https://discord.com/developers/applications)

### Configuration

1. Copy the example config file:

    ```bash
    cp config.example.jsonc config.jsonc
    ```

2. Edit `config.jsonc` and replace the parameters:
    - `token`: Your Discord bot token
    - `appId`: Your bot's application ID
    - `guilds`: Guild-specific command routing (see [Commands](#commands) below)

### Running

**Development (with hot reload):**

```bash
bun run dev
```

Changes to your code will automatically restart the bot.

**Production:**

```bash
bun run start
```

### Other Scripts

Deploy commands to Discord:

```bash
bun run deploy
```

Lint code:

```bash
bun run lint
```

Type check:

```bash
bun run type-check
```

## Project Structure

- `src/index.ts` - Bot entry point
- `src/commands/` - Command files
- `src/events/` - Event handlers
- `scripts/deploy-commands.ts` - Command deployment script

## Development

The bot uses a modular command and event system. New commands are automatically loaded from the `src/commands/` directory.

## Commands

### Adding a command

Create a `.ts` file anywhere under `src/commands/`. It will be picked up automatically on next startup.

**Simple command:**

```ts
// src/commands/utility/ping.ts
import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/command";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
} satisfies Command;
```

**Command with subcommands:**

```ts
// src/commands/utility/calendar.ts
import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/command";

export default {
    data: new SlashCommandBuilder()
        .setName("calendar")
        .setDescription("Calendar commands")
        .addSubcommand(sub => sub.setName("add").setDescription("Add an event"))
        .addSubcommand(sub => sub.setName("list").setDescription("List events")),
    subcommands: {
        add: async (interaction) => { await interaction.reply("Added!"); },
        list: async (interaction) => { await interaction.reply("Here are your events..."); },
    },
} satisfies Command;
```

A command uses either `execute` or `subcommands` — not both.

### Command registration

By default, every command is registered as a **global** Discord command (available in all servers and DMs). To restrict a command to specific guilds, list it under the relevant guild ID in `config.jsonc`:

```jsonc
{
    "guilds": {
        "123456789012345678": ["calendar", "admin"]
    }
}
```

Any command not listed under any guild remains global. A command can appear under multiple guild IDs to register it in each of those servers without making it global.

> **Note:** Global commands can take up to an hour to propagate after registration. Guild commands are instant.
