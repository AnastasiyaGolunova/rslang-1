'use strict';

cardsWrap.addEventListener('click', function learn (event) {
    const check = event.target;
    if(check.matches('.fa')){
        const atr = event.target.getAttribute('data-active');
        console.log(atr);
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
    strGame.addEventListener('click', function (event) {
        const start = event.target;
        cardsWrap.removeEventListener('click', learn);
        console.log('game');
    });
});