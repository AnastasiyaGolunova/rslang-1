'use strict';

const backData = 'https://afternoon-falls-25894.herokuapp.com/words?';


const pageValue  = document.querySelector('.page').value;
const groupValue = document.querySelector('.group').value;
const cardsWrap = document.querySelector('.cards');

const mediaData = 'https://raw.githubusercontent.com/anastasiyagolunova/rslang-data/master/';
const imgTrain = document.querySelector('.default_img');

const btnListen = document.querySelector('.cards');

let i = 0;

async function getData (){
    const url = `${backData}page=${pageValue}&group=${groupValue}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
    // const json = await res.json();
    // json.length = 10;
    //const data = await fetch(app);
    //return json;
}
//getWords();
  //console.log(getWords());

// async function createData() {
//     const http = `https://afternoon-falls-25894.herokuapp.com/words?`;
//     const url = `${http}group=${groupValue-1}&page=${pageValue-1}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     data.length = 10;
//     return data;
// }
// console.log(createData());
const btn = document.querySelector('.start');



// function getData() {
//     const url = `${backData}page=${pageValue}&group=${groupValue}`;
//     fetch(url)
//         .then((res) => {
//             //const json = res.json();
//             // json.length = 10;
//             return res.json();
//         })
//         .then((data) => {
//             console.log(data);
//             return data;
//         })
//         // .then(app)
//         .catch((err) => console.log(err))
// }


//getData();
//console.log(getData());
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
        const button = document.createElement('button');
        button.classList = 'fa fa-bullhorn';
        button.setAttribute('data-active', i++);
        // let soundSrc = item[i].audio;
        // let sound = `${mediaData}${soundSrc}`;
        cardsWrap.appendChild(card);
        card.appendChild(wordTitle);
        card.appendChild(transcriptionTitle);
        card.appendChild(button);
    });

}

function listen (desc) {
    desc.map((item) => {
        const audio = document.createElement('audio');
        audio.src = `${mediaData}${item.audio}`;
        audio.play();
        const pic = `${mediaData}${item.image}`;
        imgTrain.innerHTML = pic;

    })
}

btnListen.addEventListener('click', function (event) {

    const check = event.target;

    // console.log(id);
    console.log(check);

    if(check.matches('.fa')){
        const atr = event.target.getAttribute('data-active');
        console.log(atr);
        const {audio, image} = arr[atr];
        // let id = document.querySelectorAll("[data-active]");

            const sound = document.createElement('audio');
            sound.src = `${mediaData}${audio}`;
            sound.play();
            const pic = `${mediaData}${image}`;
            imgTrain.src = pic;

            console.log(check);





    }
    //console.log(event.target);
});
let arr = [];
btn.addEventListener('click', async () => {
    arr = await getData();
    app(arr);
    console.log(arr);
    document.querySelector('.wrap').classList.add('block');
    document.querySelector('.wrap_game').classList.remove('wrap_game');

})
console.log(arr);