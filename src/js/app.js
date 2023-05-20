import setBrowserWEBPSupportMark from  './utils/webp-support.js';
import { log } from  './utils/func.js';
import createBurgerButton from  './modules/mobile-menu.js';

const MENU_ANIMATION_TIME = .5;

// all the work after HTML loading
window.addEventListener('DOMContentLoaded', () => {

    // WEBP support mark
    setBrowserWEBPSupportMark();

    // mobile menu with burger button
    const menuToManupulate = document.querySelector('.header__nav');
    const parentElement = document.querySelector('.header');
    createBurgerButton(menuToManupulate, parentElement, MENU_ANIMATION_TIME);

});