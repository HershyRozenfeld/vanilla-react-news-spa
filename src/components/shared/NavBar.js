function GetNavBar(links) {
    const nav = document.createElement('nav')
    links.forEach(element => {
        const a = document.createElement('a');
        a.textContent = element;
        a.style.margin = '10px';
        a.onclick = (e) => {
            LoadPage(e.target.innerText)
        }
        nav.appendChild(a)
    });
    return nav;
}
