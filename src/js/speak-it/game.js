'use strict';

const strGame = document.querySelector('.speak');
let right = [];

const MySpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
let recognizer = new MySpeechRecognition;
recognizer.continuous = true;
recognizer.interimResults = true;
recognizer.lang = 'en-En';

recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];
    let elem = result[0].transcript;
    if (result.isFinal) {
        function contains(words, elem) {
            const res = words.indexOf(elem.trim()) !== -1;
            const wTranscript = elem;
            wdTranslate.textContent = wTranscript;
            return res;
        }
        if (contains(words, elem)) {
            const anw = new Audio('./audio/right.wav');
            anw.play();
            let answer = words.indexOf(elem.trim());
            const {image} = arr[answer];
            const pic = `${mediaData}${image}`;
            imgTrain.src = pic;
            let mark = document.querySelector(".cards").children;
            mark[answer].style.backgroundColor = 'hsl(201, 45%, 75%)';
            right.push(elem);
            let del = words.slice(answer, 1);
            console.log('right ' + right);
            console.log(del);
            console.log(words, words.length);
            console.log(answer);
        } else {
            console.log('wrong');
        }
        console.log('Вы сказали: ' + result[0].transcript);
        } else {
            console.log('Промежуточный результат: ', result[0].transcript);
        }
};
strGame.addEventListener('click', function () {
    cardsWrap.removeEventListener('click', learn);
    recognizer.start();
    wdTranslate.classList.add('line');
    //wdTranslate.classList.add('mic');
    // const mic = document.createElement('img');
    // mic.classList = 'mic';
    // mic.src = "https://img.icons8.com/wired/28/000000/microphone.png";
    // wdTranslate.appendChild(mic);
    console.log('game');
});
