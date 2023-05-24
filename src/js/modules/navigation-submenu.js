import { getBreakpoints } from "../utils/func.js";

export default function manageNavigationSumbenu() {
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