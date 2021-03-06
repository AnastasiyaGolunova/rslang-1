import {words, mediaData, imgTrain, wdTranslate, cardsWrap, learn} from "./getData";
import {arr} from "./startPage";

const strGame = document.querySelector('.speak');
const wrongAnswer = document.querySelector('.wrong');
const rightAnswer = document.querySelector('.correct');
let right = [];

let MySpeechRecognition = window.nSpeechRecognition || webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
let recognizer = new MySpeechRecognition;
let speechRecognitionList = new SpeechGrammarList();
recognizer.grammars = speechRecognitionList;
let grammar = '#JSGF V1.0;'
speechRecognitionList.addFromString(grammar, 1);
recognizer.continuous = true;
recognizer.interimResults = false;
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
            let mark = document.querySelector(".cards-game").children;
            mark[answer].style.backgroundColor = 'red';
            right.push(elem);
            if (!words) {
                const win = new Audio('./audio/success.mp3');
                win.play();
                recognizer.stop();
            }
        }
    }
};
strGame.addEventListener('click', function () {
    cardsWrap.removeEventListener('click', learn);
    recognizer.start();
    wdTranslate.classList.add('line');
});
