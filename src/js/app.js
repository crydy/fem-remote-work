import setBrowserWEBPSupportMark from  './utils/webp-support.js';
import createBurgerButton from  './modules/mobile-menu.js';
import createFiguresBlock from './modules/figures.js';

const MENU_ANIMATION_TIME = .5;

// start the code after HTML loading
window.addEventListener('DOMContentLoaded', () => {

    // WEBP support mark
    setBrowserWEBPSupportMark();

    // mobile menu with burger button
    const menuToManupulate = document.querySelector('.header__nav');
    const parentElement = document.querySelector('.header');
    createBurgerButton(menuToManupulate, parentElement, MENU_ANIMATION_TIME);

    // main page graphics
    createFiguresBlock();
});