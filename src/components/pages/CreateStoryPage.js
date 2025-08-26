// Create Story Page Component
function renderCreateStoryPage(container) {
    // Clear container
    container.innerHTML = '';
    
    // Create page title
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'צור סיפור חדשותי';
    container.appendChild(title);

    // Create form
    const form = document.createElement('form');
    form.className = 'create-story-form';

    // Success message container
    const successContainer = document.createElement('div');
    successContainer.id = 'success-message';
    form.appendChild(successContainer);

    // Create form fields
    const fields = [
        { id: 'title', label: 'כותרת', type: 'text', placeholder: 'הכנס כותרת לסיפור', required: true },
        { id: 'author', label: 'שם הכתב', type: 'text', placeholder: 'הכנס שם הכתב', required: true },
        { id: 'description', label: 'תיאור קצר', type: 'textarea', placeholder: 'הכנס תיאור קצר', required: true },
        { id: 'content', label: 'תוכן מלא', type: 'textarea', placeholder: 'הכנס את התוכן המלא', required: true },
        { id: 'imageUrl', label: 'קישור לתמונה', type: 'url', placeholder: 'הכנס קישור לתמונה (אופציונלי)', required: false }
    ];

    fields.forEach(field => {
        const formGroup = createFormGroup(field);
        form.appendChild(formGroup);
    });

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn';
    submitBtn.textContent = 'פרסם סיפור';
    form.appendChild(submitBtn);

    // Add form submission handler
    form.onsubmit = handleStorySubmission;
    
    container.appendChild(form);
}

// Create form group helper
function createFormGroup(field) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = field.id;
    label.textContent = field.label;
    group.appendChild(label);

    let input;
    if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 4;
    } else {
        input = document.createElement('input');
        input.type = field.type;
    }
    
    input.id = field.id;
    input.name = field.id;
    input.placeholder = field.placeholder;
    input.required = field.required;
    group.appendChild(input);

    return group;
}

// Handle story form submission
function handleStorySubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const storyData = {
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description'),
        content: formData.get('content'),
        urlToImage: formData.get('imageUrl') || null
    };

    // Save the story
    const savedStory = saveUserStory(storyData);
    
    if (savedStory) {
        // Add to current news data
        newsData.unshift(savedStory);
        
        // Show success message
        const successContainer = document.getElementById('success-message');
        successContainer.innerHTML = '<div class="success-message">הסיפור פורסם בהצלחה!</div>';
        
        // Clear form
        e.target.reset();
        
        // Navigate to news page after 2 seconds
        setTimeout(() => {
            navigateTo('news');
        }, 2000);
    } else {
        // Show error message
        const successContainer = document.getElementById('success-message');
        successContainer.innerHTML = '<div style="background: #e53e3e; color: white; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; text-align: center;">שגיאה בשמירת הסיפור. נסה שוב.</div>';
    }
}

// Show create story page
function showCreateStoryPage() {
    const main = document.getElementById('main-content');
    renderCreateStoryPage(main);
}