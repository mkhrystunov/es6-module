// src/libs/header.js
function createLink(href, linkText) {
    let link = document.createElement('a');
    link.setAttribute('href', href);
    link.innerText = linkText;
    return link;
}

export default function () {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let div =  document.createElement('div');
            div.appendChild(createLink('index.html', 'Index'));
            div.appendChild(createLink('weather.html', 'Weather'));
            resolve(div);
        }, 2000);
    });
    return promise;
}
