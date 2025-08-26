// Navigation Bar Component
function createNavBar() {
    const nav = document.createElement('nav');
    
    const pages = [
        { key: 'news', label: 'חדשות' },
        { key: 'create', label: 'צור סיפור' }
    ];

    pages.forEach(page => {
        const link = document.createElement('a');
        link.textContent = page.label;
        link.className = currentPage === page.key ? 'active' : '';
        link.onclick = (e) => {
            e.preventDefault();
            navigateTo(page.key);
        };
        nav.appendChild(link);
    });

    return nav;
}

// Update navigation active state
function updateNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const links = nav.querySelectorAll('a');
    const pages = ['news', 'create'];
    
    links.forEach((link, index) => {
        link.className = currentPage === pages[index] ? 'active' : '';
    });
}

// Navigation function
function navigateTo(page) {
    currentPage = page;
    updateNavigation();
    loadPage();
}