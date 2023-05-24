import { fastLog, getBreakpoints } from './utils/func.js';
import setBrowserWEBPSupportMark from  './utils/webp-support.js';
import createBurgerButton from  './modules/mobile-menu.js';
import createFiguresBlock from './modules/figures.js';
import manageNavigationSumbenu from './modules/navigation-submenu.js';

const MOBILE_MENU_ANIMATION_TIME = .5;

// start the code after HTML loading
window.addEventListener('DOMContentLoaded', () => {
    // fast console log
    fastLog();

    // WEBP support mark
    setBrowserWEBPSupportMark();

    // submenu in main navigation
    manageNavigationSumbenu();

    // mobile menu with burger button
    const menuToManupulate = document.querySelector('.header__nav');
    const parentElement = document.querySelector('.header');
    createBurgerButton(menuToManupulate, parentElement, MOBILE_MENU_ANIMATION_TIME);

    // main page graphics
    createFiguresBlock('make alive');

    log(getBreakpoints())

    
    // СВОРАЧИВАТЬ ДРУГОЙ БЛОК ТОЛЬКО В НЕМОБИЛЬНОМ РЕЖИМЕ
    // ДОБАВИТЬ ХОВЕРЫ НА ССЫЛКИ МЕНЮ
    
    // Define the breakpoint value
    // const breakpointMedium = `(min-width: ${getBreakpoints().medium})`;
    // let isMobile;

    // visualViewport.addEventListener("resize", () => {
        
    //     var w = document.documentElement.clientWidth;
    //     var h = document.documentElement.clientHeight;
        
    //     if (window.matchMedia(breakpointMedium).matches) {
    //         isMobile = false;
    //         log('it is not mobile')
    //     } else {
    //         log('it is mobile')
    //         isMobile = true;
    //     }

    // });
});