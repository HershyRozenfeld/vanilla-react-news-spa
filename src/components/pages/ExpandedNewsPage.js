// Expanded News Page Component
function renderExpandedNewsPage(container) {
    // Clear container
    container.innerHTML = '';
    
    if (!selectedArticle) {
        navigateTo('news');
        return;
    }

    // Create back button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn back-btn';
    backBtn.textContent = '← חזור לחדשות';
    backBtn.onclick = () => navigateTo('news');
    container.appendChild(backBtn);

    // Create article container
    const article = document.createElement('article');
    article.className = 'expanded-news';

    // Add image if available
    if (selectedArticle.urlToImage) {
        const img = document.createElement('img');
        img.src = selectedArticle.urlToImage;
        img.alt = selectedArticle.title;
        img.onerror = () => img.style.display = 'none';
        article.appendChild(img);
    }

    // Add title
    const title = document.createElement('h1');
    title.textContent = selectedArticle.title;
    article.appendChild(title);

    // Add metadata
    const meta = document.createElement('div');
    meta.className = 'meta';
    const authorName = selectedArticle.author || selectedArticle.source?.name || 'מקור לא ידוע';
    const publishDate = new Date(selectedArticle.publishedAt || Date.now()).toLocaleDateString('he-IL');
    meta.textContent = `${authorName} • ${publishDate}`;
    article.appendChild(meta);

    // Add description if available
    if (selectedArticle.description) {
        const description = document.createElement('div');
        description.className = 'description';
        description.textContent = selectedArticle.description;
        article.appendChild(description);
    }

    // Add content if available
    if (selectedArticle.content) {
        const content = document.createElement('div');
        content.className = 'content';
        // Clean up content (remove API truncation indicators)
        const cleanContent = selectedArticle.content.replace(/\[\+\d+\s+chars\].*$/, '');
        content.textContent = cleanContent;
        article.appendChild(content);
    }

    container.appendChild(article);
}

// Show expanded news page
function showExpandedNews(article, index) {
    selectedArticle = { ...article, index };
    currentPage = 'expanded';
    updateNavigation();
    
    const main = document.getElementById('main-content');
    renderExpandedNewsPage(main);
}