// Main Application Controller

// Global state variables
let currentPage = 'news';
let newsData = [];
let selectedArticle = null;

// Initialize the application
function initApp() {
    const root = document.getElementById('root');
    
    // Create navigation
    const nav = createNavBar();
    root.appendChild(nav);
    
    // Create main content container
    const main = document.createElement('main');
    main.id = 'main-content';
    root.appendChild(main);
    
    // Load initial page
    loadPage();
}

// Load appropriate page based on current state
async function loadPage() {
    const main = document.getElementById('main-content');
    
    switch (currentPage) {
        case 'news':
            await renderMainNewsPage(main);
            break;
        case 'expanded':
            renderExpandedNewsPage(main);
            break;
        case 'create':
            renderCreateStoryPage(main);
            break;
        default:
            await renderMainNewsPage(main);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);