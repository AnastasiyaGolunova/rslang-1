'use strict';

const backData = 'https://afternoon-falls-25894.herokuapp.com/words?';
const mediaData = 'https://raw.githubusercontent.com/anastasiyagolunova/rslang-data/master/';

const pageValue  = document.querySelector('.page').value;
const groupValue = document.querySelector('.group').value;
const cardsWrap = document.querySelector('.cards');

const imgTrain = document.querySelector('.default_img');
const wdTranslate = document.querySelector('.word-translate');
let i = 0;
let words = [];

// groupValue.onchange = function (event) {
//     const listSentense = getData(event);
// };
//
// pageValue.onchange = function (event) {
//     const listSentense = getData(event);
// };
// function formHandler(form){
//     var URL = document.form.site.options[document.form.site.selectedIndex].value;
//     window.location.href = URL;
// }

async function getData (){
    const url = `${backData}page=${pageValue}&group=${groupValue}`;
    const res = await fetch(url);
    const data = await res.json();
    data.length = 10;
    return data;
}

function app(cards){
    cards.map((item) => {
        const card = document.createElement('div');
        card.classList = 'card';
        let word = item.word;
        const wordTitle = document.createElement('p');
        wordTitle.classList = 'wordTitle';
        wordTitle.innerHTML = word;
        words.push(word);
        let transcription = item.transcription;
        const transcriptionTitle = document.createElement('p');
        transcriptionTitle.classList = 'transcriptionTitle';
        transcriptionTitle.innerHTML = transcription;
        const button = document.createElement('button');
        button.classList = 'fa fa-bullhorn';
        button.setAttribute('data-active', i++);
        cardsWrap.appendChild(card);
        card.appendChild(wordTitle);
        card.appendChild(transcriptionTitle);
        card.appendChild(button);
    });
}