import { setTransitionTemperory } from "../utils/func.js";

export default function createBurgerButton(menuElement, parentElement, animationTime) {

    // prevent tab navigation in invisible menu
    menuElement.hidden = true;

    // insert '<button id="burger-button"></button>' into given parent
    const burgerElement = document.createElement('button');
    burgerElement.setAttribute('tabindex', '-1');
    burgerElement.id = 'burger-button';
    burgerElement.style.setProperty('--trans-time', `${animationTime}s`);
    burgerElement.setAttribute('tabindex', '0');
    burgerElement.style.outline = 'none';
    parentElement.appendChild(burgerElement);

    // set overlay
    const overlay = createOverlay();
    document.body.appendChild(overlay);

    burgerElement.addEventListener('click', () => {
        const isOpened = burgerElement.classList.contains('opened');
        if (isOpened) close();
        else open();
    })

    overlay.addEventListener('click', () => close());

    return burgerElement;

    // -----------------------------------------------
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.hidden = true;
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '1';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        overlay.style.transition = `background-color ${animationTime}s ease`;

        overlay.show = function() {
            overlay.hidden = false;
            setTimeout(() => {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }, 20);
        }

        overlay.hide = function() {
            setTimeout(() => {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }, 20);
            setTimeout(() => {
                this.hidden = true;
            }, animationTime * 1000);
        }

        return overlay;
    }

    function close() {
        setTransitionTemperory(menuElement, animationTime);

        burgerElement.classList.remove('opened');
        menuElement.classList.remove('opened');
        overlay.hide();

        setTimeout(() => menuElement.hidden = true, animationTime * 1000);
    }

    function open() {
        menuElement.hidden = false;
        
        setTimeout(() => {
            
            setTransitionTemperory(menuElement, animationTime);
            burgerElement.classList.add('opened');
            menuElement.classList.add('opened');
            overlay.show();

        }, 20);
    }
}