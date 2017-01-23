export function dev(message) {
    console.log(message);
}

export function user(message) {
    alert(message);
}

export function flash(containerId, message) {
    const container = document.getElementById(containerId);
    const flashMessage = document.createElement('div');
    flashMessage.appendChild(document.createTextNode(message));
    container.insertBefore(flashMessage, container.childNodes[0]);
    setTimeout(() => {
        flashMessage.parentNode.removeChild(flashMessage);
    }, 3000);
}
