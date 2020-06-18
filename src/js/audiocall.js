const urlApi = 'https://afternoon-falls-25894.herokuapp.com/words';
const dataUrl = 'https://raw.githubusercontent.com/natalypoida/rslang-data/master/';
const main = document.querySelector('#main');
const startButton = document.querySelector('#start-button');
const answerButtons = document.querySelector('#answer-buttons');
const dontKnowButton = document.querySelector('#dont-know-button');
const audioCall = document.querySelector('#audio');
const leoImage = document.querySelector('#leo');
const description = document.querySelector('#description');
const correctWord = document.querySelector('#correct');
const select = document.querySelector('#select');
const soundImage = document.querySelector('#sound');
//let audio = {
  //  correct: new Audio(''),
    //errors: new Audio(''),
    //success: new Audio(''),
    //failure: new Audio(''),
//};

function startGame() {
    startButton.classList.add('hide');
    leoImage.classList.add('hide');
    description.classList.add('hide');
    answerButtons.classList.remove('hide');
    audioCall.classList.remove('hide');
    dontKnowButton.classList.remove('hide');
    soundImage.classList.remove('hide');
    getData();
}

startButton.addEventListener('click', startGame);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
function getData(){
    let group = select.options[select.selectedIndex].value;
    let url = `${urlApi}?page=${getRandomInt(31)}&group=${group}`;
    fetch(url)
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then((data) => {
        console.log(data);
        let i = getRandomInt(20);
        console.log(i);
        let soundSrc = data[i].audio;
        let imageSrc = data[i].image;
        let pageSoundUrl = `${dataUrl}${soundSrc}`;
        let pageImageUrl = `${dataUrl}${imageSrc}`;
        console.log(pageImageUrl);
        console.log(pageSoundUrl);
        audioCall.setAttribute('src', `${pageSoundUrl}`);
        audio.play();
        
    })
    ; 
};



