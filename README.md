# valheim-discord-manager
Manage a Valheim game server from Discord


# ENV VARS Needed
- `DISCORD_TOKEN` - Token used when communicating with Discord APIs
- `DOCKER_DIRECTORY` - folder containing the docker-compose.yaml for the Valheim server (used in start/stop)
- `STATUS_HOST` - The http:// host where the status file is served
- `STATUS_FILE` - The Status file name as served from the status host (default: `status.json`)
- `SUDO_PASSWORD` - The password to use with sudo when making the docker command call on the system.