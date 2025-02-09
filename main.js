import config from './config.js';

function getFaviconUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (e) {
        if (url.startsWith('mailto:')) {
            return 'https://www.google.com/s2/favicons?domain=gmail.com&sz=32';
        }
        console.error('Invalid URL:', url);
        return '';
    }
}

function getServiceFromUrl(url, title) {
    try {
        return title; // Just use the title directly
    } catch (e) {
        return '';
    }
}

function formatUsername(link) {
    if (!link.username) return '';
    return link.username;
}

function createServiceInfo(link) {
    const serviceInfo = document.createElement('div');
    serviceInfo.className = 'service-info';

    const favicon = document.createElement('img');
    favicon.src = getFaviconUrl(link.url);
    favicon.alt = `${getServiceFromUrl(link.url, link.title)} icon`;
    favicon.onerror = () => {
        favicon.style.display = 'none';
    };

    const serviceName = document.createElement('span');
    serviceName.className = 'service-name';
    serviceName.textContent = getServiceFromUrl(link.url, link.title);

    serviceInfo.appendChild(favicon);
    serviceInfo.appendChild(serviceName);

    return serviceInfo;
}

function createProfileHeader(profile, isRight = false) {
    const header = document.createElement('div');
    header.className = `profile-header${isRight ? ' right' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = 'profile-avatar';
    
    if (profile.avatar) {
        const avatarImg = document.createElement('img');
        avatarImg.src = profile.avatar;
        avatarImg.alt = `${profile.name}'s avatar`;
        avatarImg.onerror = () => {
            avatarImg.style.display = 'none';
            avatar.style.background = '#eee';
        };
        avatar.appendChild(avatarImg);
    } else {
        avatar.style.background = '#eee';
    }

    const name = document.createElement('div');
    name.className = `profile-name${isRight ? ' right' : ''}`;
    name.textContent = profile.name;

    if (isRight) {
        header.appendChild(name);
        header.appendChild(avatar);
    } else {
        header.appendChild(avatar);
        header.appendChild(name);
    }

    return header;
}

function createLinkElement(link, isRight = false) {
    const linkCell = document.createElement('div');
    linkCell.className = `link-cell${isRight ? ' right' : ''}`;

    const linkElement = document.createElement('a');
    linkElement.className = 'link';
    
    // Special handling for email usernames
    if (link.username && link.username.includes('@')) {
        linkElement.className = 'link copy-email';
        linkElement.href = '#';
        linkElement.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(link.username).then(() => {
                const originalText = linkElement.textContent;
                linkElement.textContent = 'Copied!';
                setTimeout(() => {
                    linkElement.textContent = originalText;
                }, 1500);
            });
        });
    } else {
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
    }

    linkElement.setAttribute('data-title', link.username.toLowerCase());
    linkElement.textContent = formatUsername(link);

    linkCell.appendChild(linkElement);
    return linkCell;
}

function initializeLinks() {
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = ''; // Clear existing content
    const profiles = config.profiles;
    
    // Explicitly set the order we want
    const leftProfile = profiles.iamalbert;
    const rightProfile = profiles.einsteincoins;
    
    // Create and add profile headers
    const headerSection = document.createElement('div');
    headerSection.className = 'profile-headers';
    headerSection.appendChild(createProfileHeader(leftProfile));
    headerSection.appendChild(document.createElement('div')); // Empty middle cell
    headerSection.appendChild(createProfileHeader(rightProfile, true));
    linksContainer.appendChild(headerSection);
    
    // Create a map of all services from both profiles
    const allServices = new Map();
    [leftProfile, rightProfile].forEach(profile => {
        if (profile && profile.links) {
            profile.links.forEach(link => {
                allServices.set(getServiceFromUrl(link.url, link.title), link.title);
            });
        }
    });

    // Create rows for each service
    Array.from(allServices.keys()).sort().forEach(service => {
        const row = document.createElement('div');
        row.className = 'link-row';

        // Find matching links for each profile
        const leftLink = leftProfile?.links.find(link => getServiceFromUrl(link.url, link.title) === service);
        const rightLink = rightProfile?.links.find(link => getServiceFromUrl(link.url, link.title) === service);

        // Add left profile's link
        if (leftLink) {
            row.appendChild(createLinkElement(leftLink));
        } else {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'link-cell';
            row.appendChild(emptyCell);
        }

        // Add service info in the middle
        row.appendChild(createServiceInfo(leftLink || rightLink));

        // Add right profile's link
        if (rightLink) {
            row.appendChild(createLinkElement(rightLink, true));
        } else {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'link-cell right';
            row.appendChild(emptyCell);
        }

        linksContainer.appendChild(row);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const linkRows = document.querySelectorAll('.link-row');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        linkRows.forEach(row => {
            if (searchTerm === '') {
                // Show all cells and the row when search is empty
                row.style.display = 'grid';
                row.querySelectorAll('.link-cell').forEach(cell => {
                    cell.style.display = 'flex';
                });
                return;
            }

            // Get the service name from the middle column
            const serviceName = row.querySelector('.service-name').textContent.toLowerCase();
            const isVisible = serviceName.includes(searchTerm);
            
            // Show/hide the entire row based on service name match
            row.style.display = isVisible ? 'grid' : 'none';
            
            // Keep all cells visible if the row is visible
            if (isVisible) {
                row.querySelectorAll('.link-cell').forEach(cell => {
                    cell.style.display = 'flex';
                });
            }
        });
    });
}

// Set up a periodic check for config changes
let lastConfigStr = JSON.stringify(config);
setInterval(() => {
    const currentConfigStr = JSON.stringify(config);
    if (currentConfigStr !== lastConfigStr) {
        lastConfigStr = currentConfigStr;
        initializeLinks();
    }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
    initializeLinks();
    setupSearch();
}); 