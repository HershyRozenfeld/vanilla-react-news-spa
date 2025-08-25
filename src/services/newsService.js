// Fetch news from API or use cached data
async function fetchNews() {
    // Check cache first
    const cachedData = getCachedNews();
    if (cachedData) {
        return cachedData;
    }

    // Try to fetch from API
    try {
        const response = await fetch(CONFIG.NEWS_URL + CONFIG.API_KEY);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.articles) {
            cacheNews(data.articles);
            return data.articles;
        }
    } catch (error) {
        console.error('Error fetching news from API:', error);
        console.log('Using sample data instead');
    }
}

// Cache management functions
function getCachedNews() {
    try {
        const cached = localStorage.getItem(CONFIG.CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        
        // Check if cache is still valid
        if (Date.now() - timestamp > CONFIG.CACHE_EXPIRY) {
            localStorage.removeItem(CONFIG.CACHE_KEY);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error reading cache:', error);
        return null;
    }
}

function cacheNews(articles) {
    try {
        const cacheData = {
            data: articles,
            timestamp: Date.now()
        };
        localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error caching news:', error);
    }
}

// User stories management
function getUserStories() {
    try {
        return JSON.parse(localStorage.getItem('user_stories')) || [];
    } catch (error) {
        console.error('Error reading user stories:', error);
        return [];
    }
}

function saveUserStory(story) {
    try {
        const userStories = getUserStories();
        const newStory = {
            ...story,
            publishedAt: new Date().toISOString(),
            source: { name: 'סיפור משתמש' },
            isUserStory: true
        };
        
        userStories.unshift(newStory);
        localStorage.setItem('user_stories', JSON.stringify(userStories));
        return newStory;
    } catch (error) {
        console.error('Error saving user story:', error);
        return null;
    }
}