// Main News Page Component
async function renderMainNewsPage(container) {
    // Clear container
    container.innerHTML = '';
    
    // Create page title
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'חדשות עדכניות';
    container.appendChild(title);

    // Show loading while fetching news
    if (newsData.length === 0) {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="spinner"></div>טוען חדשות...';
        container.appendChild(loading);
        
        // Load news data
        try {
            const apiNews = await fetchNews();
            const userStories = getUserStories();
            newsData = [...userStories, ...apiNews]; // User stories first
            
            // Re-render without loading
            renderMainNewsPage(container);
        } catch (error) {
            console.error('Error loading news:', error);
            loading.innerHTML = 'שגיאה בטעינת החדשות. נסה שוב מאוחר יותר.';
        }
        return;
    }

    // Create and append news grid
    const grid = createNewsGrid(newsData);
    container.appendChild(grid);
}

// Show news page
function showMainNewsPage() {
    const main = document.getElementById('main-content');
    renderMainNewsPage(main);
}