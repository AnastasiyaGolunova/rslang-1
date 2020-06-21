'use strict';

const mediaData = 'https://raw.githubusercontent.com/anastasiyagolunova/rslang-data/master/files/';
const backData = 'https://afternoon-falls-25894.herokuapp.com/words?';


const pageValue  = document.querySelector('.page').value;
const groupValue = document.querySelector('.group').value;
const cardsWrap = document.querySelector('.cards');

// async function getWords (){
//     const url = `${backData}page=${pageValue}&group=${groupValue}`;
//     const res = await fetch(url);
//     const json = await res.json();
//     json.length = 10;
//     const data = await fetch(app);
//     return json;
// }
// //getWords();
//  console.log(getWords());

// async function createData() {
//     const http = `https://afternoon-falls-25894.herokuapp.com/words?`;
//     const url = `${http}group=${groupValue-1}&page=${pageValue-1}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     data.length = 10;
//     return data;
// }
// console.log(createData());

function getData() {
    const url = `${backData}page=${pageValue}&group=${groupValue}`;
    fetch(url)
        .then((res) => {
            const json = res.json();
            json.length = 10;
            return json;
        })
        .then(app)
        .catch((err) => console.log(err))
}
getData();
function app (cards){
    cards.map((item) => {
        const card = document.createElement('div');
        card.classList = 'card';
        let word = item.word;
        const wordTitle = document.createElement('p');
        wordTitle.classList = 'wordTitle';
        wordTitle.innerHTML = word;
        let transcription = item.transcription;
        const transcriptionTitle = document.createElement('p');
        transcriptionTitle.classList = 'transcriptionTitle';
        transcriptionTitle.innerHTML = transcription;
        cardsWrap.appendChild(card);
        card.appendChild(wordTitle);
        card.appendChild(transcriptionTitle);
    });
}
