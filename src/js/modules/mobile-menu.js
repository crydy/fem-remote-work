import {
    setTransitionTemperory,
    getColorInFilterFormat,
    getBreakpoints
} from "../utils/functions.js";


export function createBurgerButton(animationTime) {
    const menuElement = document.querySelector('.header__nav');
    const parentElement = document.querySelector('.header');

    // prevent tab navigation in invisible menu
    menuElement.hidden = true;

    // insert '<button id="burger-button"></button>' into given parent
    const burgerElement = document.createElement('button');
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


export function manageNavigationSumbenu() {
    const MobileTabletBreakpoint = `(min-width: ${getBreakpoints().medium})`;
    let isMobileMode;

    // gather list items with sublist
    let innerListLI = document.querySelectorAll('.nav__item--sublist');

    innerListLI.forEach(li => {
        // handle clicks and enter keydown
        li.addEventListener('click', handleInnerList);
        li.addEventListener('keydown', handleInnerList);

        // set correct tab navigation
        li.setAttribute('tabindex', '0');
        li.querySelectorAll('.nav__inner-item > a')
            .forEach(link => link.setAttribute('tabindex', '-1'))
    });

    // close submenu if click somewhere outside in non-mobile mode
    document.addEventListener('click', (event) => {

        const isInsideSublistBlock = !!event.target.closest('.nav__item--sublist')

        if (!isInsideSublistBlock && !isMobileMode) {
            collapseMenu();
        };
    });

    visualViewport.addEventListener("resize", () => {
        
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        
        if (window.matchMedia(MobileTabletBreakpoint).matches) {
            isMobileMode = false;
            collapseMenu();
        } else {
            isMobileMode = true;
        }
    });

    // -----------------------------------------------------------------------------------------------

    function handleInnerList(event) {
        const clickOnLabel = event.type === "click" && event.target.classList.contains('nav__label');
        const isEnterDown = event.key === 'Enter' || event.keyCode === 13;
        const isEnterDownOnLinkInside = event.target.parentNode.classList.contains('nav__inner-item');

        if (clickOnLabel || isEnterDown && !isEnterDownOnLinkInside) {

            // toggle current menu
            toggle(event.currentTarget);

            if (!isMobileMode) {
                // close another menu if it's opened
                document.querySelectorAll('.nav__item--sublist').forEach(
                    item => {
                        if (
                            event.currentTarget !== item &&
                            item.classList.contains('opened')
                        ) toggle(item);
                    }
                )
            }
        }
    }

    function toggle(element) {
        const container = element;
        const label = container.querySelector('.nav__label');
        const innerList = container.querySelector('.nav__inner-list');

        container.classList.toggle('opened');
        label.classList.toggle('opened');
        innerList.classList.toggle('opened')
        
        if (container.classList.contains('opened')) {
            innerList.querySelectorAll('a').forEach(item => {item.removeAttribute('tabindex', '-1')});
        } else {
            innerList.querySelectorAll('a').forEach(item => {item.setAttribute('tabindex', '-1')});
        }
    }

    function collapseMenu() {

        document.querySelector('.nav')
        .querySelectorAll('.opened')
        .forEach(
            element => element.classList.remove('opened')
        );

        document.querySelectorAll('.nav__inner-item > a')
            .forEach(link => link.setAttribute('tabindex', '-1'));
    }
}


export function maganeLogoHover() {
    const logoLink = document.querySelector('.header__logo > a');
    let currentColor;
    
    logoLink.addEventListener('mouseover', (event) => {
        changeColor(event.currentTarget);
    });
    
    logoLink.addEventListener('mouseout', (event) => {
        changeColor(event.currentTarget);
    });


    function changeColor(element) {
        const newColor = getColorInFilterFormat();
        if (element.style.filter !== newColor) {
            element.style.filter = newColor;
        } else {
            changeColor(element);
        }
    }
}