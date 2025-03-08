const config = {
    name: "iAmAlbert's personal website",
    title: "iAmAlbert's personal website",
    description: "iAmAlbert's personal website",
    
    about: {
        title: "About Me",
        content: `
            <div class="about-wrapper">
                <div class="about-text">
                    <h3>I am:</h3>
                    <ul class="about-list">
                        <li>a grade 11 highschool student</li>
                        <li>a developer (not really)</li>
                        <li>from Canada</li>
                        <li id="timezone">in time zone UTC-6 (<span id="current-time"></span>)</li>
                        <li>16 years old</li>
                        <li>male</li>
                        <li>190cm tall</li>
                        <li>a Minecraft player</li>
                    </ul>
                </div>
                <div class="about-image">
                    <img src="favicon.ico" alt="Profile Picture" class="profile-pic">
                    <img src="einstein-old.ico" alt="Old Einstein Logo" class="profile-pic second-pic">
                </div>
            </div>
        `
    },
    
    projects: [
        {
            title: "Sell Panel",
            description: "A comprehensive list of items and services available for purchase",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "https://einstein-coins.github.io/panel"
        },
        {
            title: "This Website",
            description: "My personal website, you are looking at it right now",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "https://einstein-coins.github.io"
        },
        {
            title: "School projects",
            description: "Projects I've done for my highschool computer science class",
            technologies: ["p5.js"],
            link: "https://i-am-albert.github.io/school/"
        },
        {
            title: "AI Sans Attack Creator",
            description: "Create custom Sans attacks for Bad Time Simulator using AI",
            technologies: ["HTML", "CSS", "JavaScript", "AI"],
            link: "https://i-am-albert.github.io/ai-sans-attack-creator/"
        }
    ],
    
    social: [
        {
            name: "GitHub | i-am-albert",
            url: "https://github.com/i-am-albert",
            icon: "https://github.com/favicon.ico",
        },
        {
            name: "Google | ytalberta@gmail.com",
            url: "ytalberta@gmail.com",
            icon: "https://www.google.com/favicon.ico",
        },
        {
            name: "Telegram | @iamalbert_a",
            url: "https://t.me/iamalbert_a",
            icon: "https://telegram.org/favicon.ico",
            primary: true
        },
        {
            name: "Discord | @iamalbert_a",
            url: "https://discord.com/users/211594819158409217",
            icon: "https://www.google.com/s2/favicons?domain=discord.com",
            primary: true
        },
        {
            name: "Minecraft: Java | iAmAlbert",
            url: "https://namemc.com/profile/iAmAlbert.4",
            icon: "https://minecraft.wiki/images/Grass_Block_JE7_BE6.png"
        },
        {
            name: "X (Twitter) | @iAmAlbert_a",
            url: "https://x.com/iAmAlbert_a",
            icon: "https://x.com/favicon.ico"
        },
        {
            name: "Instagram | @iamalbert_a",
            url: "https://www.instagram.com/iamalbert_a/",
            icon: "https://www.google.com/s2/favicons?domain=instagram.com"
        },
        {
            name: "TikTok | @iamalbert_a",
            url: "https://www.tiktok.com/@iamalbert00",
            icon: "https://www.tiktok.com/favicon.ico"
        },
        {
            name: "YouTube | @iamalbert",
            url: "https://www.youtube.com/@iamalbert",
            icon: "https://www.youtube.com/favicon.ico"
        },
        {
            name: "Facebook | @iamalbert.yt.3388",
            url: "https://www.facebook.com/albert.yt.3388",
            icon: "https://www.facebook.com/favicon.ico"
        },
        {
            name: "LinkedIn | @iamalbert-a-192168231",
            url: "https://www.linkedin.com/in/iamalbert-a-192168231",
            icon: "https://www.linkedin.com/favicon.ico"
        },
        {
            name: "Reddit | @iamalbert_a",
            url: "https://www.reddit.com/user/iamalbert_a",
            icon: "https://www.reddit.com/favicon.ico"
        },
        {
            name: "Pinterest | @ytalberta",
            url: "https://www.pinterest.com/ytalberta/",
            icon: "https://www.pinterest.com/favicon.ico"
        },
        {
            name: "Twitch | @iamalberta",
            url: "https://www.twitch.tv/iamalberta",
            icon: "https://www.twitch.tv/favicon.ico"
        },
        {
            name: "Matrix | @iamalbert:matrix.org",
            url: "https://matrix.to/#/@iamalbert:matrix.org",
            icon: "https://matrix.org/images/matrix-logo.svg"
        },
        {
            name: "Brawl Stars | @iAmAlbertA",
            url: "https://link.brawlstars.com/invite/friend/en?tag=C2VV8L0U&token=iAmAlbertA",
            icon: "https://supercell.com/favicon.ico"
        },
        {
            name: "Signal | @iamalbert.01",
            url: "https://signal.me/#eu/FaZnO4P3QX6mxq_qeZn_p8b5JbuAvbBYPDT2_X_WqdEIbR1lSzxNAKHIWrhPVJdH",
            icon: "https://www.google.com/s2/favicons?domain=signal.org"
        }
    ],
    
    theme: {
        light: {
            text: "#000000",
            background: "#ffffff",
            sectionBg: "#f5f5f5"
        },
        dark: {
            text: "#ffffff",
            background: "#000000",
            sectionBg: "#111111"
        }
    }
}; 
