// fast console log functions
export function fastLog() {
    // log(subject)
    window.log = (value) => console.log(value);
    // subject.log()
    Object.prototype.log = function() {
        console.log(this);
    };
}


export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


export function setTransitionTemperory(element, time, transitionProperty) { // time in sec

    if (transitionProperty) {
        element.style.transition = `${transitionProperty} ${time}s`;
    } else {
        element.style.transition = `${time}s`;
    }

    element.transitionMode = transitionProperty;
    
    setTimeout(() => {
        element.transitionMode = null;
        element.style.transition = '';
    }, time * 1000);
}


export function getBreakpoints() {
    const dummyElement = document.createElement('div');
    dummyElement.style.display = 'none';

    document.body.appendChild(dummyElement);

    const computedStyles = window.getComputedStyle(dummyElement);

    const breakpoints = {
        medium: computedStyles.getPropertyValue('--breakpoint-medium'),
        large: computedStyles.getPropertyValue('--breakpoint-large'),
        xlarge: computedStyles.getPropertyValue('--breakpoint-xlarge'),
    };

    document.body.removeChild(dummyElement);

    return breakpoints;
}

// some colors for css-filter-property format
export function getColorInFilterFormat() {
    const colors =  [
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
    ];
    return colors[randomInteger(0, colors.length - 1)];
}