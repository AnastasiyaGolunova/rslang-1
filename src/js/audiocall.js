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

let shuffleAnswers, currentAnswerIndex;
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
    let url = `${urlApi}?page=${getRandomInt(30)}&group=${group}`;
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
        let correctAnswer = data[i].word;
        let pageSoundUrl = `${dataUrl}${soundSrc}`;
        let pageImageUrl = `${dataUrl}${imageSrc}`;
        data.splice(i, 1);
        let newData = data;
        console.log(newData);
        let j = getRandomInt(14);
        let firstWord = newData[j].word;
        let secondWord = newData[j +=1].word;
        let thirdWord = newData[j +=2].word;
        let forthWord = newData[j +=3].word;
        let answers = [
            {text: `${correctAnswer}`, correct: true},
            {text: `${firstWord}`, correct: false},
            {text: `${secondWord}`, correct: false},
            {text: `${thirdWord}`, correct: false},
            {text: `${forthWord}`, correct: false},
        ];
        currentAnswerIndex = 0;
    answers.forEach(element => {
    const button = document.createElement('button');
    button.innerText = element.text;  
    button.classList.add('button')
    if (element.correct) {
        button.dataset.correct = element.correct;
    }
    //button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
    
    });
        console.log(answers);
        console.log(firstWord, secondWord, thirdWord, forthWord);
        console.log(j);
        console.log(pageImageUrl);
        console.log(pageSoundUrl);
        console.log(correctAnswer);
        audioCall.setAttribute('src', `${pageSoundUrl}`);
        audio.play();
        
        
    })
    
    ; 
};



