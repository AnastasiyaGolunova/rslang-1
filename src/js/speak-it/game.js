'use strict';

const strGame = document.querySelector('.speak');

let recognizer = new window.webkitSpeechRecognition || window.SpeechRecognition;
recognizer.continuous = true;
recognizer.interimResults = true;
recognizer.lang = 'en-En';

recognizer.onresult = function (event) {
    let result = event.results[event.resultIndex];
    let elem = result[0].transcript;
    console.log(elem);

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
            let mark = document.querySelector(".cards").children;
            mark[answer].style.backgroundColor = 'yellow';
            //mark[answer].innerText = "✔";
            //mark.style.color = '#9acd32';

            // const star = document.createElement('i');
            // star.classList = 'fas fa-star';

            console.log('right');
        } else {
            console.log('wrong');
        }
        console.log('Вы сказали: ' + result[0].transcript);
        // } else {
        //     console.log('Промежуточный результат: ', result[0].transcript);
        // }
    };
}
strGame.addEventListener('click', function () {
    cardsWrap.removeEventListener('click', learn);
    recognizer.start();
    // wdTranslate.add.style = 'line';
    console.log('game');
});
