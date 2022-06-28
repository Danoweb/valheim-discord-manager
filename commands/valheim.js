import { SlashCommandBuilder } from '@discordjs/builders';
import { shellExec } from 'shell-exec';
import { valheim_status_embed } from '../embeds/valheim_status_embed';

//ENV VARS
const DOCKER_DIRECTORY = process.env.DOCKER_DIRECTORY || '';
const SUDO_PASSWORD = process.env.SUDO_PASSWORD || '';

function exec_command(command) {
    cmd_result = ""
    // Change directory to where Docker Compose File is, and run shutdown.
    change_directory(DOCKER_DIRECTORY)

    shellExec(command).then(cmd_result = stdout).catch(console.log)
    return cmd_result
}

function change_directory(docker_directory) {
    console.log('Starting directory: ' + process.cwd());
    try {
        process.chdir(`${docker_directory}`);
        console.log('New directory: ' + process.cwd());
    }
    catch (err) {
        console.log('chdir: ' + err);
    }
}

export const valheim_command = {
    data: new SlashCommandBuilder().setName('valheim')
        .setDescription('Manage the Valheim Server')
        .addSubcommand(subcommand =>
            subcommand
                .setName("status")
                .setDescription("Display the Status of the Server"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("shutdown")
                .setDescription("Shutdown the Server"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("start")
                .setDescription("Start the Server"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("password")
                .setDescription("Change the server Password")),
    async execute(interaction) {
        let duty_embed = {}
        if (interaction.options.getSubcommand() === 'status') {            
            duty_embed = await valheim_status_embed(interaction)
        } else if (interaction.options.getSubcommand() === 'shutdown') {
            var command_result = exec_command(`echo "${SUDO_PASSWORD}" | sudo -S "docker-compose down"`)

            // Send result to Discord
            await interaction.reply(`Server Shutdown Command Sent! - ${command_result}`);
        } else if (interaction.options.getSubcommand() === 'start') {
            var command_result = exec_command(`echo "${SUDO_PASSWORD}" | sudo -S "docker-compose up -d"`)

            // Send result to Discord
            await interaction.reply(`Server Start Command Sent!`);
        } else if (interaction.options.getSubcommand() === 'password') {
            await interaction.reply(`Not Yet Available`);
        } else {
            // No Sub Command (Valheim) was given!
            await interaction.reply(`Please provide a sub command with this command, from: start, stop, status, password`);
        }        
    }
}