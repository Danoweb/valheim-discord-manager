#!/usr/bin/python3
# bot.py
import os

import discord
from dotenv import load_dotenv

load_dotenv()
DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
DISCORD_GUILD_ID = os.getenv('DISCORD_GUILD_ID')
VALHEIM_DOCKER_PATH = "/home/dano/valheim-server"
PERMITTED_ROLE = "valheim-admins"

class CustomClient(discord.Client):
    async def on_ready(self):
        print(f'{self.user} has Connected!')

    async def on_message(self, message):
        # Disable Messages from the Bot
        if message.author == client.user:
            return

        if '!valheim start' in message.content:
            print(f"Got Valheim Start Command")
            
            # Allow only Authorized Users
            if not self.check_role(message.author, PERMITTED_ROLE):
                print(f"{message.author} unauthorized command attempt.")
                response = f"{message.author}, You are Not authorized to issue Valheim Server Commands."
                await message.channel.send(response)
                return
            
            os.chdir(VALHEIM_DOCKER_PATH)
            cmd_output = os.popen('docker-compose up -d').read()
            response = f"{message.author}, Valheim Startup Command sent!\n\n ```\n{cmd_output}\n```"
            await message.channel.send(response)

        if '!valheim stop' in message.content:
            print(f"Got Valheim Stop Command")
            
            # Allow only Authorized Users
            if not self.check_role(message.author, PERMITTED_ROLE):
                print(f"{message.author} unauthorized command attempt.")
                response = f"{message.author}, You are Not authorized to issue Valheim Server Commands."
                await message.channel.send(response)
                return
            
            response = f"{message.author}, Valheim Stop Command sent Please Allow a few Minutes..."
            await message.channel.send(response)
            os.chdir(VALHEIM_DOCKER_PATH)
            cmd_output = os.popen('docker-compose down').read()
            response = f"{message.author}, Shutdown Response:\n\n ```\n{cmd_output}\n```"
            await message.channel.send(response)

    def check_role(self, member: discord.member, role_name: str):
        for role in member.roles():
            if role.name.lower() is role_name:
                print(f"{member.__name__} was found to have {role_name} role!")
                return True
            
        # If none of those roles match, return false.
        print(f"{member.__name__} does not have {role_name} role!")
        return False
            
        

client = CustomClient()
client.run(DISCORD_TOKEN)
