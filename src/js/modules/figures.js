import * as f from  '../utils/func.js';

export default function createFiguresBlock() {

    const RECOLORING_FREQUENCY = 6000;
    const RECOLORING_DURATION = 3000; // no more then frequency
    const MOVEMENT_FREQUENCY = 4000;
    const MOVEMENT_DURATION_RANGE = [1500, 4500]; // no more then frequency
    const SIMULTANIOUSLY_ALLOWED = 2;

    createFiguresInParent(document.querySelector('.main'));

    const figures = document.querySelectorAll('.main__figure');

    setInterval(() => {

        const figuresAtOnce = f.randomInteger(1, SIMULTANIOUSLY_ALLOWED);
        const figuresToMove = new Set();

        for (let i = 0; i < figuresAtOnce; i++) {

            const randomFigureIndex = f.randomInteger(0, figures.length - 1);
            const figure = figures[randomFigureIndex];
            const index = getElementIndex(figure);

            if (!figure.transitionMode && !figure.timeout) {
                figuresToMove.add({index: index, element: figure})
            }
        }

        figuresToMove.forEach((figure) => {

            figure.element.timeout = true;

            // random time to start movement - less than movement frequency
            let startMovementInTime = MOVEMENT_FREQUENCY * (f.randomInteger(0, 100) / 100);

            setTimeout(() => {

                makeTransitionedChange(
                    figure.element,
                    `main__figure${figure.index}--changed`,
                    f.randomInteger(...MOVEMENT_DURATION_RANGE),
                    'transform'
                );

                // prevent this element from movement until next iteration
                setTimeout(() => {
                    figure.element.timeout = false;
                }, MOVEMENT_FREQUENCY - startMovementInTime)

            }, startMovementInTime);
        })
    }, MOVEMENT_FREQUENCY);


    const colorableFigures = document.querySelectorAll('.main__figure:not(.not-colorable)');

    setInterval(() => {
        const randomFigure = colorableFigures[f.randomInteger(0, colorableFigures.length - 1)];
        const isFree = !randomFigure.transitionMode && !randomFigure.timeout;

        if (isFree) {
            const randomColor = filterColorsStock()[f.randomInteger(0, filterColorsStock().length - 1)];

            if (!randomFigure.transitionMode) {
                changeStyle(randomFigure, 'filter', randomColor, RECOLORING_DURATION);
            }
        }
    }, RECOLORING_FREQUENCY);
}


function changeStyle(element, CSSprop, value, durationTime) {
    f.setTransitionTemperory(element, durationTime / 1000, CSSprop);
    element.style[CSSprop] = value;
}

function makeTransitionedChange(element, className, durationTime, transitionProperty) {
    f.setTransitionTemperory(element, durationTime / 1000, transitionProperty);
    element.classList.toggle(className);
}

function getElementIndex(element) {

    for (let className of element.classList) {

        let num = getNumberFromString(className);

        if (num) {
            num = stringifyNumber(num);
            return num;
        }
        
    }
    return null;


    function getNumberFromString(str) {
        const matches = str.match(/\d+/g); // Match one or more digits
      
        if (matches) {
          // Extract the first matched number
          const number = parseInt(matches[0], 10);
          return number;
        }
      
        return null; // No number found
    }
    
    function stringifyNumber(n) {
        return (n < 10) ? `0${n}` :`${n}`;
    }
}

// some colors for css-filter-property format
function filterColorsStock() {
    return [
        'invert(14%) sepia(90%) saturate(1155%) hue-rotate(186deg) brightness(104%) contrast(95%);',
        'invert(79%) sepia(18%) saturate(1938%) hue-rotate(336deg) brightness(93%) contrast(89%)',
        'invert(9%) sepia(24%) saturate(7453%) hue-rotate(340deg) brightness(95%) contrast(103%)',
        'invert(45%) sepia(100%) saturate(343%) hue-rotate(123deg) brightness(94%) contrast(78%)',
        'invert(37%) sepia(51%) saturate(368%) hue-rotate(33deg) brightness(93%) contrast(90%)',
        'invert(68%) sepia(36%) saturate(292%) hue-rotate(246deg) brightness(89%) contrast(89%)',
        'invert(82%) sepia(55%) saturate(1594%) hue-rotate(295deg) brightness(110%) contrast(109%)',
        'invert(70%) sepia(13%) saturate(491%) hue-rotate(353deg) brightness(87%) contrast(87%)',
        'invert(36%) sepia(78%) saturate(6701%) hue-rotate(343deg) brightness(90%) contrast(93%)',
        'invert(88%) sepia(56%) saturate(426%) hue-rotate(326deg) brightness(96%) contrast(86%)',
    ]
}

function createFiguresInParent(parent) {
    const figuresHTML = `
        <img src="img/figures/figure-01.svg" id="figure01" class="main__figure main__figure01">
        <img src="img/figures/figure-02.svg" id="figure02" class="main__figure main__figure02 not-colorable">
        <img src="img/figures/figure-03.svg" id="figure03" class="main__figure main__figure03">
        <img src="img/figures/figure-04.svg" id="figure04" class="main__figure main__figure04">
        <img src="img/figures/figure-05.svg" id="figure05" class="main__figure main__figure05">
        <img src="img/figures/figure-06.svg" id="figure06" class="main__figure main__figure06 not-colorable">
        <img src="img/figures/figure-07.svg" id="figure07" class="main__figure main__figure07 not-colorable">
        <img src="img/figures/figure-08.svg" id="figure08" class="main__figure main__figure08 not-colorable">
        <img src="img/figures/figure-09.svg" id="figure09" class="main__figure main__figure09">
        <img src="img/figures/figure-10.svg" id="figure10" class="main__figure main__figure10">
        <img src="img/figures/figure-11.svg" id="figure11" class="main__figure main__figure11">
    `;

    const figures = document.createElement('section');
    figures.innerHTML = figuresHTML;
    figures.className = 'main__graphics';

    const photo = document.createElement('img');
    photo.src = 'img/laptop-men.png';
    photo.className = 'main__photo';
    photo.alt = 'Men with laptop photography'

    figures.appendChild(photo);
    parent.appendChild(figures);
}