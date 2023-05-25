import { fastLog } from './utils/functions.js';
import setBrowserWEBPSupportMark from  './utils/webp-support.js';
import createFiguresBlock from './modules/figures.js';
import {
    createBurgerButton,
    maganeLogoHover,
    manageNavigationSumbenu
} from  './modules/mobile-menu.js';


const MOBILE_MENU_ANIMATION_TIME = .5; // seconds

// figures movement settings
const RECOLORING_FREQUENCY = 6000;
const RECOLORING_DURATION = 3000; // no more then frequency
const MOVEMENT_FREQUENCY = 4000;
const MOVEMENT_DURATION_RANGE = [1500, 4500]; // no more then frequency
const SIMULTANIOUSLY_ALLOWED = 2;


// start the code after HTML loading
window.addEventListener('DOMContentLoaded', () => {

    fastLog();
    
    setBrowserWEBPSupportMark();

    maganeLogoHover();

    manageNavigationSumbenu();

    createBurgerButton(MOBILE_MENU_ANIMATION_TIME);

    // main page graphics
    createFiguresBlock(
        RECOLORING_FREQUENCY,
        RECOLORING_DURATION,
        MOVEMENT_FREQUENCY,
        MOVEMENT_DURATION_RANGE,
        SIMULTANIOUSLY_ALLOWED,
        'make alive'
    );
});