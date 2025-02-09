# Basic social media links page

A modern, interactive profile page showcasing social media links with a dynamic particle background.

## Features

- Interactive background
- Dark/Light mode support
- Real-time search functionality
- Automatic favicon fetching

## Configuration

Edit `config.js` to modify profiles:
```javascript
{
    profiles: {
        profileName: {
            name: "Display Name",
            avatar: "path/to/avatar.png",
            links: [
                {
                    url: "https://example.com/profile",
                    title: "Service Name",
                    username: "username"
                }
            ]
        }
    }
}
```

## Development

1. Clone the repository
2. Serve with any static file server (e.g., GitHub Pages)
3. Edit `config.js` to update profiles and links