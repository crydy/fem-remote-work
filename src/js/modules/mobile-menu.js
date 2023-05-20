export default function createBurgerButton(menuElement, parentElement, animationTime) {

    // insert '<button id="burger-button"></button>' into given parent
    const burgerElement = document.createElement('button');
    burgerElement.id = 'burger-button';

    parentElement.appendChild(burgerElement);

    // set transition time for button
    burgerElement.style.setProperty('--trans-time', `${animationTime}s`);

    // add/remove class 'opened' by click
    burgerElement.addEventListener('click', () => {
        const isOpened = burgerElement.classList.contains('opened');

        if (isOpened) {
            burgerElement.classList.remove('opened');
            menuElement.classList.remove('opened');
        } else {
            burgerElement.classList.add('opened');
            menuElement.classList.add('opened');
        }

        // Set transition time for menu and delete after execution
        setTransitionTemperory(menuElement, animationTime);
    })

    return burgerElement;
}


function setTransitionTemperory(elem, time) {
    elem.style.transition = `${time}s`;

    setTimeout(() => {
        elem.style.transition = '';
    }, time * 1000);
}