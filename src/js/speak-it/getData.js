'use strict';

const backData = 'https://afternoon-falls-25894.herokuapp.com/words?';
const mediaData = 'https://raw.githubusercontent.com/anastasiyagolunova/rslang-data/master/';
let pageValue  = document.querySelector('.page');
let groupValue = document.querySelector('.group');
const cardsWrap = document.querySelector('.cards-game');
const imgTrain = document.querySelector('.default_img');
const wdTranslate = document.querySelector('.word-translate');
let i = 0;
let words = [];

async function change(){
    cardsWrap.innerHTML = '';
    const arr = await getData();
    app(arr);
}

async function getData (){
    try {
        const url = `${backData}page=${pageValue.value}&group=${groupValue.value}`;
        const res = await fetch(url);
        const data = await res.json();
        data.length = 10;
        return data;
    } catch (er) {
        console.log(er);
        return false;
    }
}

function app(cards){
    cards.map((item) => {
        const card = document.createElement('div');
        card.classList = 'card-game';
        let word = item.word;
        const wordTitle = document.createElement('p');
        wordTitle.classList = 'wordTitle';
        wordTitle.innerHTML = word;
        words.push(word);
        let transcription = item.transcription;
        const transcriptionTitle = document.createElement('p');
        transcriptionTitle.classList = 'transcriptionTitle';
        transcriptionTitle.innerHTML = transcription;
        let textWrap = document.createElement('div');
        textWrap.classList = 'text';
        const button = document.createElement('img');
        button.classList = 'fa';
        button.src = "https://img.icons8.com/ios/28/000000/medium-volume.png";
        button.setAttribute('data-active', i++);
        textWrap.appendChild(wordTitle);
        textWrap.appendChild(transcriptionTitle);
        card.appendChild(textWrap);
        card.appendChild(button);
        cardsWrap.appendChild(card);
    });
}

export {words, getData, cardsWrap, mediaData, imgTrain, wdTranslate, app}