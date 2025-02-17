document.addEventListener('DOMContentLoaded', () => {
    const panelContainer = document.querySelector('.panel-container');
    const tableBody = document.querySelector('.services-table tbody');
    const searchInput = document.querySelector('#search-input');
    const infoModal = document.getElementById('info-modal');
    const modalCloseButton = document.querySelector('.modal-close');

    function formatRate(rate) {
        if (rate === null) return '';
        const formatted = rate.toFixed(2);
        return '$' + formatted + ' per 1000';
    }

    function formatNumber(num) {
        if (num === null) return '';
        return num.toLocaleString();
    }

    function createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        
        // Navigation section
        const nav = document.createElement('div');
        nav.className = 'sidebar-section';
        nav.innerHTML = `
            <h3>Navigation</h3>
            <ul class="nav-list">
                ${panelConfig.categories.map(category => `
                    <li>
                        <a href="#${category.id}" class="nav-link">
                            ${category.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
        
        // Info section
        const info = document.createElement('div');
        info.className = 'sidebar-section';
        info.innerHTML = `
            <h3>Information</h3>
            <div class="info-content">
                <p><strong>About the Panel</strong></p>
                <p>Browse our services by category. Click on any service to view details and ordering instructions.</p>
                <p><strong>How to Order</strong></p>
                <p>Contact us through Telegram (Primary) or Discord to discuss your needs and get pricing information.</p>
                <p><strong>For Sellers</strong></p>
                <p>If you want to sell something here contact me on telegram or discord.</p>
                <p>- currently looking for apple music accounts</p>
                <p><strong>Contact</strong></p>
                <p>Telegram: <a href="https://t.me/iamalbert_a" target="_blank">@iamalbert_a</a></p>
                <p>Discord: iamalbert_a</p>
            </div>
        `;
        
        sidebar.appendChild(nav);
        sidebar.appendChild(info);
        
        return sidebar;
    }

    function initializePanel() {
        if (typeof panelConfig === 'undefined') {
            console.error('Panel configuration not found!');
            return;
        }

        // Add sidebar
        const sidebar = createSidebar();
        panelContainer.insertBefore(sidebar, panelContainer.firstChild);

        // Create all categories and services
        panelConfig.categories.forEach(category => {
            // Add category header row
            const categoryRow = document.createElement('tr');
            categoryRow.className = 'category-row';
            categoryRow.id = category.id;
            categoryRow.innerHTML = `<td colspan="6">${category.name}</td>`;
            tableBody.appendChild(categoryRow);

            // Add service rows
            category.services.forEach(service => {
                const serviceRow = document.createElement('tr');
                serviceRow.className = 'service-row clickable';
                const rate = formatRate(service.rate);
                serviceRow.innerHTML = `
                    <td class="service-id">${service.id}</td>
                    <td>${service.name}</td>
                    <td class="rate">${rate}</td>
                    <td>${formatNumber(service.minOrder)}</td>
                    <td>${formatNumber(service.maxOrder)}</td>
                    <td></td>
                `;
                tableBody.appendChild(serviceRow);

                // Add click event to the entire row
                serviceRow.addEventListener('click', () => showServiceInfo(service));

                // Add search data attributes
                serviceRow.dataset.searchContent = `${service.id} ${service.name} ${service.description}`.toLowerCase();
            });
        });

        // Add smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    function showServiceInfo(service) {
        const modalBody = infoModal.querySelector('.modal-body');
        let modalContent = `
            <h2>${service.name}</h2>
            <div class="service-details">
                <p><strong>ID:</strong> ${service.id}</p>`;

        if (service.rate !== null) {
            modalContent += `<p><strong>Rate:</strong> ${formatRate(service.rate)}</p>`;
        }
        
        if (service.minOrder !== null) {
            modalContent += `<p><strong>Minimum Order:</strong> ${formatNumber(service.minOrder)}</p>`;
        }
        
        if (service.maxOrder !== null) {
            modalContent += `<p><strong>Maximum Order:</strong> ${formatNumber(service.maxOrder)}</p>`;
        }

        modalContent += `
                <p><strong>Description:</strong> ${service.description}</p>
                <div class="order-info">
                    <h3>How to Order</h3>
                    <div class="contact-channels">
                        <p><strong>Contact through our primary channels:</strong></p>
                        <ul>
                            <li>⭐ Telegram: <a href="https://t.me/iamalbert_a" target="_blank" style="color: var(--text-color); text-decoration: none;"><strong>@iamalbert_a</strong></a> (Primary)</li>
                            <li>Discord: <strong>iamalbert_a</strong></li>
                            <li>Email: ytalberta@gmail.com</li>
                        </ul>
                    </div>
                    <div class="message-template">
                        <p><strong>Message Template:</strong></p>
                        <div class="template-box">
                            Service: ${service.name}
                            Order ID: ${service.id}
                            Desired Amount: [Enter your amount]
                            Additional Details: [Any specific requirements]
                        </div>
                        <p class="template-note">Copy and fill in the template above when contacting us.</p>
                    </div>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        infoModal.classList.add('active');
    }

    function handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const serviceRows = document.querySelectorAll('.service-row');
        const categoryRows = document.querySelectorAll('.category-row');
        
        // Create a map to track if categories have visible services
        const categoryVisibility = new Map();
        categoryRows.forEach(row => categoryVisibility.set(row, false));

        // First pass: check services
        serviceRows.forEach(row => {
            const isVisible = row.dataset.searchContent.includes(searchTerm);
            row.classList.toggle('hidden', !isVisible);
            
            // Update category visibility
            let categoryRow = row.previousElementSibling;
            while (categoryRow && !categoryRow.classList.contains('category-row')) {
                categoryRow = categoryRow.previousElementSibling;
            }
            if (categoryRow && isVisible) {
                categoryVisibility.set(categoryRow, true);
            }
        });

        // Second pass: update category visibility
        categoryVisibility.forEach((isVisible, categoryRow) => {
            categoryRow.classList.toggle('hidden', !isVisible && searchTerm !== '');
        });
    }

    // Event Listeners
    modalCloseButton.addEventListener('click', () => {
        infoModal.classList.remove('active');
    });

    // Close modal when clicking outside
    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            infoModal.classList.remove('active');
        }
    });

    searchInput.addEventListener('input', handleSearch);

    // Initialize the panel
    initializePanel();
}); 