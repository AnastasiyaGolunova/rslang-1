'use strict';

cardsWrap.addEventListener('click', function (event) {
    const check = event.target;
    if(check.matches('.fa')){
        const atr = event.target.getAttribute('data-active');
        console.log(atr);
        const {audio, image, transcription, word} = arr[atr];
        const sound = document.createElement('audio');
        sound.src = `${mediaData}${audio}`;
        sound.play();
        const pic = `${mediaData}${image}`;
        imgTrain.src = pic;
        // const wTranscript = transcription;
        // wordTranscript.innerHTML = wTranscript;
        async function tr () {
            const wTranslate = await getTranslation(word);
            wordTranslate.textContent = wTranslate;
            console.log(wTranslate);
        }
        tr();
    }
});