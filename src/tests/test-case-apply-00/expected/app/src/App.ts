import "dotenv/config.js"
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { HandleInteractions } from "./HandleInteractions.js";
import { ISlashCommand } from "./commands/ISlashCommand.js";

class App {

    public main() {
        const { DISCORD_TOKEN } = process.env;
        const commands = new Collection<string, ISlashCommand>();
        const client = new Client({ intents: [GatewayIntentBits.Guilds]});
        const handleInteractions = new HandleInteractions(commands);

        // commands.set(placeholderCommand.name, placeholderCommand);

        client.on(Events.ClientReady, () => console.log(`Logged as ${client.user?.tag}`));
        client.on(Events.InteractionCreate, async interaction => handleInteractions.handle(interaction));

        client.login(DISCORD_TOKEN);
    }
}

new App().main();