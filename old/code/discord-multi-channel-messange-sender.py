# Discord multi-channel message sender
# Credit to u/One-Inflation-9425 for making my request
# Contact me (iAmAlbert/Einstein Coins) at https://einstein-coins.github.io/

import requests
TOKEN = "put your discord token here"
CHANNEL_IDS = [
    'put channel id here',
    'put second channel id here'
]

c='text example line 1/ntext example line 2'
for channel in CHANNEL_IDS:
  response = requests.post(f'https://discord.com/api/v9/channels/{channel}/messages', headers={'Authorization': f'{TOKEN}','Content-Type': 'application/json'}, json={'content': c})
  if response.status_code == 200:
    print('Message sent successfully!')
  else:
    print(f'{response.status_code} - {response.text}')
