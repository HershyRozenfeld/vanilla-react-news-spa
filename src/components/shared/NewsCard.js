// News Card Component
function createNewsCard(article, index) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    // Create image
    const img = document.createElement('img');
    img.src = article.urlToImage || 'https://cdn.prod.website-files.com/65ba70a5bb6f912baf0094a3/686f6a0896946e6903e15ef4_dynacap.com_404(1440).webp';
    img.alt = article.title;
    img.onerror = () => {
        img.src = 'https://cdn.prod.website-files.com/65ba70a5bb6f912baf0094a3/686f6a0896946e6903e15ef4_dynacap.com_404(1440).webp';
    };
    
    // Create content container
    const content = document.createElement('div');
    content.className = 'news-card-content';
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = article.title;
    
    // Create author info
    const author = document.createElement('div');
    author.className = 'author';
    author.textContent = article.author || article.source?.name || 'מקור לא ידוע';
    
    // Assemble card
    content.appendChild(title);
    content.appendChild(author);
    card.appendChild(img);
    card.appendChild(content);
    
    // Add click handler
    card.onclick = () => {
        showExpandedNews(article, index);
    };
    
    return card;
}

// Create news grid
function createNewsGrid(articles) {
    const grid = document.createElement('div');
    grid.className = 'news-grid';

    articles.forEach((article, index) => {
        const card = createNewsCard(article, index);
        grid.appendChild(card);
    });

    return grid;
}