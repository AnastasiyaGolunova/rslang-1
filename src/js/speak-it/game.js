'use strict';

const strGame = document.querySelector('.speak');

// arr.forEach(function(index) {
//  console.log(index['word'])});

let recognizer = new window.webkitSpeechRecognition || window.SpeechRecognition;
recognizer.continuous = true;
//recognizer.interimResults = true;
recognizer.lang = 'en-En';
recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];

    let elem = result[0].transcript;
    console.log(elem);
    console.log(words);
    if (result.isFinal) {
        if(words.includes(elem)){
            console.log('right');
        } else {console.log('wrong');}
        console.log('Вы сказали: ' + result[0].transcript);
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
    }
};

strGame.addEventListener('click', function () {
    cardsWrap.removeEventListener('click', learn);
    recognizer.start();
    console.log('game');
});
console.log(words);