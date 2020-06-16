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
let page = 0;
let group = 0;
let receivedWords = [];
const URL_DATA = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
const QUANTITY_WORDS = document.querySelector('.quantity-words');
const QUANTITY_CARDS = document.querySelector('.quantity-cards');
const MAX_PAGE = 29;
const MAX_GROUP = 5;


const getQuantityWords = async (countPage, countGroup) => {
    const arrayWords = [];
    console.log('countGroup=' + countGroup);

    for (let j = 0; j < countGroup; j+=1) {
        console.log(j)
        for (let i = 0; i < countPage; i+=1) {
            const data = await getWords(i, group);
            data.forEach(word => {
                arrayWords.push(word);
            });
        }
    }

    console.log(countPage);

    console.log(arrayWords);

    return arrayWords;
       
    // const data = await getWords(page, group);
};


const getNewWords = async () => {
    const arrayId = ["5e9f5ee35eb9e72bc21af4a1","5e9f5ee35eb9e72bc21af4a2","5e9f5ee35eb9e72bc21af4a3","5e9f5ee35eb9e72bc21af4a4"];
    const arrayNewWords = [];
    const quantityNewWords = QUANTITY_WORDS.value;
    let countPage =  Math.ceil(Number(quantityNewWords)/20);
    let countGroup = Math.ceil(Number(countPage/600));

    const quantityWords = await getQuantityWords(countPage, countGroup);

    quantityWords.forEach((word, item) => {
        if (quantityNewWords < item) {
            arrayNewWords.push(word)
        }
    });
}

const renderCard = async () => {

    const data = await getWords(page, group);

    let {textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate,audio} = data[count];
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

    let audioPath = `${URL_DATA}${audio}`;
    
    // audioPlay(audioPath);
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


const audioPlay = (src) => {
    const audio = new Audio();
        audio.src = `${src}`;
        audio.play();
}

renderCard();

const BTN_CHECK = document.querySelector('.btn-check');

BTN_CHECK.addEventListener('click', () => {
    receivedWords.length = 0;
    getQuantityWords();
    checkWord();
});