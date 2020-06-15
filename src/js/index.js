import '../css/style.css';
import '../css/dictionary.css';
import '../css/fonts.css';
import '../css/game.css';
import '../css/login.css';

import './login.js';
import '../css/index.css';

const getWords = async (page, group) => {
    try {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (e) {
        console.log(e);
        return false;
    }
};


let count = 0;
let curentWord = '';
let deleteWords = [];

const renderCard = async () => {

    const data = await getWords(2,0);

    let {textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate} = data[count];
    curentWord = word;
    console.log(textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate);
    const card = `<span class="text-example">${textExample}</span>
    <span class="text-example_translate">${textExampleTranslate}</span>
    <input class="input input-word" style="width:${word.length * 6}px" ></input>
    <span class="word-translate">${wordTranslate}</span>
    <span class="word-transcript">${transcription}</span>
    <img class="word-image"></img>
    <span class="text-meaning">${textMeaning}</span>
    <span class="text-meaning_translate">${textMeaningTranslate}</span>`

    const CARD = document.querySelector('.card');

    CARD.innerHTML = card;

}

const checkWord = () => {
    const INPUT_WORD = document.querySelector('.input-word');
    const wordCheck = INPUT_WORD.value.toLowerCase();
    console.log(wordCheck, curentWord)
    if (wordCheck === curentWord) {
        console.log('good')
    } else {
        console.log('bad')
    }
}

renderCard();

const BTN_CHECK = document.querySelector('.btn-check');

BTN_CHECK.addEventListener('click', () => {
    checkWord();
});
