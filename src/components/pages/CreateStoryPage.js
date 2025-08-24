function NewsPage() {
    const div = document.createElement('div')
    const h1 = document.createElement('h1');
    h1.textContent = 'TITLE';
    h1.style.backgroundColor = 'blue';
    div.appendChild(h1);
    return div;
}