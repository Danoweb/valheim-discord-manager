import { axios } from 'axios';

// ENV VARS
const STATUS_HOST = process.env.STATUS_HOST || '';
const STATUS_FILE = process.env.STATUS_FILE || '';

// Get the Server Stats JSON, for use in Status Embed data fields.
async function get_server_stats(status_host, status_file="status.json") {
    let server_response = {}

    axios.get(`http://${status_host}/${status_file}`)
        .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res);
            server_response = res
        })
        .catch(error => {
            console.error(error);
        });

    return server_response
}

let valheim_status_embed = async function(interaction) {
    server_stats = get_server_stats(STATUS_HOST, STATUS_FILE)
    return {
        color: 0x009900,
        title: 'Valheim Server Status',
        //url: 'https://discord.js.org',
        author: {
            name: `${server_status['server_name']}`,
            //icon_url: 'https://i.imgur.com/AfFp7pu.png',
            //url: 'https://discord.js.org',
        },
        description: `${server_stats['error']}`,
        // thumbnail: {
        //     url: 'https://i.imgur.com/AfFp7pu.png',
        // },
        fields: [
            {
                name: `Online Player Count:`,
                value: `${server_stats['player_count']}`,
                inline: true,
            },
            {
                name: `Server Type:`,
                value: `${server_stats['server_type']}`,
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Players',
                value: `${server_stats['players']}`,
                inline: false,
            },
            
        ],
        // image: {
        //     url: 'https://i.imgur.com/AfFp7pu.png',
        // },
        timestamp: new Date(),
        footer: {
            text: 'Valheim Server Manager - https://www.github.com/danoweb/valheim-discord-manager',
            //icon_url: 'https://i.imgur.com/AfFp7pu.png',
        },
    }
}

export {
    valheim_status_embed
}