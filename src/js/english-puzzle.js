// import '../css/style.css';
import {
    startButton,
    logoWrap,
    gameWrap,
    levelGame,
    pageGame,
} from './constants.js';
import images from './images.js';
import createCanvasElements from './createCanvasElements.js';


function showPuzzle() {
    logoWrap.className = 'hidden';
    gameWrap.className = 'game-wrapper';
};

function getRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return index;
};

async function getSentense() {
    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${levelGame.value - 1}&page=${pageGame.value - 1}`)
    const data = await response.json();
    for (let i = 0; i < 10; i += 1) {
        data.splice(getRandomElement(data), 1);
    }
    return data;
};

startButton.onclick = () => {
    const image = getRandomElement(images);
    document.querySelector('.img-puzzle').style.backgroundImage = `url('${images[image]}')`;

    const listSentense = getSentense();
    listSentense.then(data => {
        console.log(data);
        console.log(data.map(item => item.textExample),)
        createCanvasElements({
            src: `${images[image]}`,
            wordsList: data.map(item => item.textExample),
          }).then(res => {
            const imageContainer = document.querySelector('.img-puzzle');
            imageContainer.style.backgroundColor = '#020c97';
            imageContainer.style.border = '2px solid black';
            imageContainer.style.backgroundImage = 'none';
            imageContainer.append(...res);
            // document.querySelector(".img-puzzle");
          })
    })

    

    showPuzzle();
}

levelGame.onchange = () => {
    const listSentense = getSentense();
}

pageGame.onchange = () => {
    const listSentense = getSentense();
}