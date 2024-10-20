# discord multi vc afk bot
# made by https://einstein-coins.github.io/ with chatgpt

import discord
import asyncio

class SelfBot(discord.Client):
    def __init__(self, channel_id, **options):
        super().__init__(**options)
        self.channel_id = channel_id

    async def on_ready(self):
        channel = self.get_channel(self.channel_id)
        if channel:
            try:
                await channel.connect()
                print(f"Successfully connected to channel: {channel.name}")
            except Exception as e:
                print(f"Error connecting to channel {channel.name}: {e}")

async def main():
    # Create multiple SelfBot instances for different voice channels
    voice_channels = [
        channelid1,
        channelid2,
    ]
    
    clients = []
    
    # Create SelfBot instances for each channel and run them with a delay
    for channel_id in voice_channels:
        client = SelfBot(channel_id)
        clients.append(client)
    # Run all clients
    await asyncio.gather(*(client.start('put token here, keep the apostrophes') for client in clients))

# Run the main function
if __name__ == "__main__":
    asyncio.run(main())
