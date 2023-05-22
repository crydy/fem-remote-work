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