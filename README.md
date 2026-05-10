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
    - `clientId`: Your bot's application ID
    - `guildId`: Your test server ID (for command deployment)

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
