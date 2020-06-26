'use strict';

function learn (event) {
    const check = event.target;
    if (check.matches('.fa')) {
        const atr = event.target.getAttribute('data-active');
        const {audio, image, wordTranslate} = arr[atr];
        const sound = document.createElement('audio');
        sound.src = `${mediaData}${audio}`;
        sound.play();
        const pic = `${mediaData}${image}`;
        imgTrain.src = pic;
        const wTranslate = wordTranslate;
        wdTranslate.textContent = wTranslate;
        console.log(wordTranslate);
    }
}
cardsWrap.addEventListener('click', learn);

