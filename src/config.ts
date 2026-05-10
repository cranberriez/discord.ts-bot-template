import raw from "../config.jsonc";

export interface Config {
    token: string;
    appId: string;
    guilds: Record<string, string[]>;
}

export default raw as Config;
