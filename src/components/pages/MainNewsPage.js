import 'dotenv/config';

const root = document.getElementById('root');
const main = document.createElement('main');
const pages = ['add news', 'news'];

root.appendChild(GetNavBar(pages))
root.appendChild(main);

function LoadPage(pageName = "news") {
    main.innerHTML = '';
    let page;
    switch (pageName) {
        case 'news':
            page = NewsPage();
            break;
        case 'add news':
            page = GetStory();
            break;
        default:
            page = NewsPage();
            break;
    }
    main.appendChild(page);
}