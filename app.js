import { Client, Intents, Collection } from 'discord.js';

// Command Imports
import { valheim_command } from './commands/valheim.js'

// ENV VARS
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Inject commands into client commands known
client.commands.set("rtduty", duty_command)

// Log Ready State
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() && !interaction.isButton()) return;
        
    if (interaction.isCommand()) {
        console.log(`UserCommand: ${interaction.commandName}`)
        let command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    } else if (interaction.isButton()) {
        console.log(`InteractionGuild: ${interaction.guild} - ${interaction.guildId}`)
        console.log(`${interaction.user.id} will become: ${interaction.customId}`);

        if (interaction.customId.includes('char_setup_')) {
            await enlist_handler(interaction)            
        }
    }
});

// Login to Discord with Token
client.login(DISCORD_TOKEN);