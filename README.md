# valheim-discord-manager
Manage a Valheim game server from Discord


# ENV VARS Needed
- `DISCORD_TOKEN` - Token used when communicating with Discord APIs
- `DOCKER_DIRECTORY` - folder containing the docker-compose.yaml for the Valheim server (used in start/stop)
- `STATUS_HOST` - The http:// host where the status file is served
- `STATUS_FILE` - The Status file name as served from the status host (default: `status.json`)
- `SUDO_PASSWORD` - The password to use with sudo when making the docker command call on the system.

## Script as Startup
```
[Unit]
Description=Valheim Discord Manager
After=network.target

[Service]
ExecStart=/usr/bin/python3 main.py
WorkingDirectory=/path/to/scriptdir
StandardOutput=inherit
StandardError=inherit
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```
* Save this in `/etc/systemd/system/servicename.service` 
  * `servicename` can be anything, 
* Set it to run on startup with `sudo systemctl enable servicename.service` .