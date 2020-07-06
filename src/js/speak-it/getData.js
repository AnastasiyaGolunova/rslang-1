'use strict';

const backData = 'https://afternoon-falls-25894.herokuapp.com/words?';
const mediaData = 'https://raw.githubusercontent.com/anastasiyagolunova/rslang-data/master/';

let pageValue  = document.querySelector('.page').value;
let groupValue = document.querySelector('.group').value;
const cardsWrap = document.querySelector('.cards');

const imgTrain = document.querySelector('.default_img');
const wdTranslate = document.querySelector('.word-translate');
let i = 0;
let words = [];

function change(element) {
    if (element.class === 'group'){
        groupValue = element.value;
    }else if (element.class === 'page'){
        pageValue = element.value;
    }
}
// function formHandler(){
//     document.location=this.options[this.selectedIndex].value;
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