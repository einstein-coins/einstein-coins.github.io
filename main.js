// Star field initialization
document.addEventListener('DOMContentLoaded', () => {
    const perfNow = performance.now.bind(performance);
    
    const starContainer = document.getElementById('starfield') || (() => {
        const container = document.createElement('div');
        container.id = 'starfield';
        container.className = 'star-container';
        document.body.appendChild(container);
        return container;
    })();

    // Optimization: Use TypedArrays for better memory management
    const stars = new Float32Array(50 * 4); // x, y, vx, vy for each star
    const starElements = new Array(50);
    const numberOfStars = 50;
    
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let mouseX = windowWidth / 2;
    let mouseY = windowHeight / 2;
    let frameId;
    let lastTime = perfNow();
    
    // Pre-calculate constants
    const SQRT_2 = Math.sqrt(2);
    const BASE_FORCE = 0.35 / SQRT_2;
    const FRICTION = 0.995;
    let isMouseDown = false;

    // Create stars using DocumentFragment
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfStars; i++) {
        const idx = i * 4;
        stars[idx] = Math.random() * windowWidth;     // x
        stars[idx + 1] = Math.random() * windowHeight; // y
        stars[idx + 2] = (Math.random() - 0.5) * 0.2; // vx
        stars[idx + 3] = (Math.random() - 0.5) * 0.2; // vy

        const star = document.createElement('div');
        star.className = 'star';
        star.style.transform = `translate3d(${stars[idx]}px, ${stars[idx + 1]}px, 0)`;
        fragment.appendChild(star);
        starElements[i] = star;
    }
    starContainer.appendChild(fragment);

    function createStar(x, y) {
        const starIdx = starElements.length * 4;
        // Expand Float32Array or use a dynamic array if MAX_STARS is very large and stars are frequently added/removed.
        // For simplicity, we'll assume MAX_STARS is manageable and pre-allocate or manage a dynamic list.
        // This example will simply push to JS arrays and create a new star element.
        // A more robust solution might involve a pool of star objects or more complex array management if stars are frequently destroyed.

        const newStarsData = new Float32Array(stars.length + 4);
        newStarsData.set(stars);
        newStarsData[starIdx] = x;
        newStarsData[starIdx + 1] = y;
        newStarsData[starIdx + 2] = (Math.random() - 0.5) * 0.2; // vx
        newStarsData[starIdx + 3] = (Math.random() - 0.5) * 0.2; // vy
        stars = newStarsData;

        const star = document.createElement('div');
        star.className = 'star';
        star.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        starContainer.appendChild(star);
        starElements.push(star);
    }

    starContainer.addEventListener('mousedown', (e) => {
        console.log('Star container mousedown. Button:', e.button, 'Target:', e.target);
        if (e.button === 0) { // Left click
            isMouseDown = true;
            createStar(e.clientX, e.clientY);
        }
    });

    starContainer.addEventListener('mouseup', (e) => {
        console.log('Star container mouseup. Button:', e.button, 'Target:', e.target);
        if (e.button === 0) { // Left click
            isMouseDown = false;
        }
    });

    starContainer.addEventListener('auxclick', (e) => { // Middle click
        console.log('Star container auxclick. Button:', e.button, 'Target:', e.target);
        if (e.button === 1) {
            createStar(e.clientX, e.clientY);
        }
    });

    starContainer.addEventListener('contextmenu', (e) => { // Right click
        console.log('Star container contextmenu. Button:', e.button, 'Target:', e.target);
        e.preventDefault(); // Prevent context menu
        createStar(e.clientX, e.clientY);
    });

    starContainer.addEventListener('mouseleave', (e) => {
        console.log('Star container mouseleave. Target:', e.target);
        // Only reset isMouseDown if the mouse truly leaves the starContainer,
        // not when moving over a newly created star element that's a child.
        if (e.target === starContainer) {
            isMouseDown = false;
        }
    });

    // Optimization: Use a single RAF loop without batching
    function update(currentTime) {
        frameId = requestAnimationFrame(update);
        
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Skip frame if too much time has passed (tab was inactive)
        if (deltaTime > 100) return;
        
        for (let i = 0; i < starElements.length; i++) { // Iterate up to current number of stars
            const idx = i * 4;
            const dx = mouseX - stars[idx];
            const dy = mouseY - stars[idx + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 0) {
                const force = Math.min(BASE_FORCE, 0.35 / Math.sqrt(dist));
                const invDist = 1 / dist;
                
                stars[idx + 2] += dx * invDist * force; // vx
                stars[idx + 3] += dy * invDist * force; // vy
            }
            
            stars[idx] += stars[idx + 2];     // x += vx
            stars[idx + 1] += stars[idx + 3]; // y += vy
            
            stars[idx + 2] *= FRICTION; // vx *= friction
            stars[idx + 3] *= FRICTION; // vy *= friction
            
            starElements[i].style.transform = `translate3d(${stars[idx]}px, ${stars[idx + 1]}px, 0)`;
        }
    }

    // Optimization: Debounced window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        }, 150);
    }, { passive: true });

    // Optimization: Throttled mouse move handler
    let lastMouseUpdate = 0;
    const MOUSE_THROTTLE = 1000 / 60; // Increase to 60 updates per second
    
    window.addEventListener('mousemove', e => {
        const now = perfNow();
        if (now - lastMouseUpdate > MOUSE_THROTTLE) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMouseUpdate = now;
            if (isMouseDown) { // Spawn star on drag
                createStar(e.clientX, e.clientY);
            }
        }
    }, { passive: true });

    // Start animation
    update(perfNow());

    // Cleanup
    window.addEventListener('unload', () => {
        if (frameId) cancelAnimationFrame(frameId);
        if (resizeTimeout) clearTimeout(resizeTimeout);
    }, { passive: true });
});

// Config-dependent code
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Update time function
        function updateTime() {
            const timeElement = document.getElementById('current-time');
            if (timeElement) {
                const now = new Date();
                const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
                const utc6Time = new Date(utcTime - (6 * 60 * 60 * 1000));
                timeElement.textContent = utc6Time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
            }
        }

        // Update time immediately and then every second
        updateTime();
        setInterval(updateTime, 1000);

        // Update page title and meta description
        if (typeof config !== 'undefined') {
            document.title = config.title;
            document.querySelector('meta[name="description"]').content = config.description;

            // Update name in navigation and footer
            document.querySelectorAll('.name').forEach(el => el.textContent = config.name);

            // Load about section
            const aboutContent = document.querySelector('.about-content');
            aboutContent.innerHTML = config.about.content;

            // Load projects
            const projectsGrid = document.querySelector('.projects-grid');
            config.projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project-card';
                projectElement.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>
                `;
                projectsGrid.appendChild(projectElement);
            });

            // Load social links
            const socialLinks = document.querySelector('.social-links');
            
            // Sort social links by primary status and then alphabetically
            const sortedSocials = [...config.social].sort((a, b) => {
                // First sort by primary status
                if (a.primary && !b.primary) return -1;
                if (!a.primary && b.primary) return 1;
                
                // Then sort alphabetically by name
                return a.name.localeCompare(b.name);
            });

            sortedSocials.forEach(social => {
                const link = document.createElement('a');
                link.className = `social-link ${social.primary ? 'primary' : ''}`;
                
                // Check if the URL is an email or a regular link
                const isEmail = social.url.includes('@') && !social.url.startsWith('http');
                
                if (isEmail) {
                    // For email addresses, make it copyable
                    link.onclick = (e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(social.url)
                            .then(() => {
                                // Show a brief "Copied!" message
                                const originalText = link.querySelector('.link-text').textContent;
                                link.querySelector('.link-text').textContent = 'Copied!';
                                setTimeout(() => {
                                    link.querySelector('.link-text').textContent = originalText;
                                }, 1500);
                            })
                            .catch(err => console.error('Failed to copy:', err));
                    };
                    link.style.cursor = 'copy';
                } else {
                    // For regular links, open in new tab
                    link.href = social.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
                
                link.innerHTML = `
                    <div class="social-link-content">
                        <img src="${social.icon}" alt="${social.name}" loading="lazy">
                        <span class="link-text">${social.name}</span>
                    </div>
                    ${social.primary ? '<span class="star-indicator">★</span>' : ''}
                `;
                socialLinks.appendChild(link);
            });

            // Initialize search functionality
            const searchInput = document.getElementById('socialSearch');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const socialLinks = document.querySelectorAll('.social-link');
                    
                    socialLinks.forEach(link => {
                        const text = link.textContent.toLowerCase();
                        const url = link.href.toLowerCase();
                        if (text.includes(searchTerm) || url.includes(searchTerm)) {
                            link.classList.remove('hidden');
                        } else {
                            link.classList.add('hidden');
                        }
                    });
                });
            }

            // Apply custom theme if specified
            if (config.theme) {
                const applyTheme = (theme) => {
                    Object.entries(theme).forEach(([key, value]) => {
                        document.documentElement.style.setProperty(`--${key}-color`, value);
                    });
                };

                // Apply theme based on system preference
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const applyThemeBasedOnPreference = (e) => {
                    const theme = e.matches ? config.theme.dark : config.theme.light;
                    applyTheme(theme);
                };

                darkModeMediaQuery.addListener(applyThemeBasedOnPreference);
                applyThemeBasedOnPreference(darkModeMediaQuery);
            }
        }
    } catch (error) {
        console.error('Error loading config:', error);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 