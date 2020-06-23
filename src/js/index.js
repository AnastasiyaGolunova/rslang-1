import '../css/style.css';
import '../css/dictionary.css';
import '../css/fonts.css';
import '../css/game.css';
import '../css/login.css';

import './login.js';
import '../css/index.css';
import '../css/style.css';
import '../css/game.css';

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
let curentWord = "";
const deleteWords = [];
const page = 0;
const group = 0;
const receivedWords = [];
const URL_DATA =
  "https://raw.githubusercontent.com/omirbeck/rslang-data/master/";
const QUANTITY_WORDS = document.querySelector(".quantity-words");
const QUANTITY_CARDS = document.querySelector(".quantity-cards");
const MAX_PAGE = 29;
const MAX_GROUP = 5;
let allCards = [];
const arrayNewWords = [];
const arrayOldWords = [];
const arrayId = [
  "5e9f5ee35eb9e72bc21af4a1",
  "5e9f5ee35eb9e72bc21af4a2",
  "5e9f5ee35eb9e72bc21af4a3",
  "5e9f5ee35eb9e72bc21af4a4",
];

const getQuantityWords = async (countPage, countGroup) => {
  const arrayWords = [];
  console.log(`countGroup=${  countGroup}`);

  for (let j = 0; j < countGroup; j += 1) {
    console.log(j);
    for (let i = 0; i < countPage; i += 1) {
      const data = await getWords(i, group);
      data.forEach((word) => {
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
  arrayNewWords.length = 0;
  arrayOldWords.length = 0;
  const quantityNewWords = QUANTITY_WORDS.value;
  let countPage = Math.ceil(Number(quantityNewWords) / 20);
  let countGroup = Math.ceil(Number(countPage / 600));

  const findNewWords = async () => {
    const quantityWords = await getQuantityWords(countPage, countGroup);

    quantityWords.forEach((word) => {
      if (arrayId.indexOf(word.id) === -1) {
        arrayNewWords.push(word);
      } else {
        arrayOldWords.push(word);
      }
    });

    if (arrayNewWords.length < quantityNewWords) {
      if (countPage < MAX_PAGE) {
        countPage += 1;
      } else {
        countPage = 0;
        countGroup += 1;
      }
      console.log("if <");
      findNewWords();
    } else {
      console.log("else");
      while (arrayNewWords.length > quantityNewWords) {
        console.log("while");
        arrayNewWords.pop();
      }
    }
    console.log(arrayNewWords, arrayOldWords);
  };

  return findNewWords();
};

const quantityCards = () => {
  const countCards = QUANTITY_CARDS.value;
  const quantityNewWords = QUANTITY_WORDS.value;

  if (quantityNewWords > countCards) {
    console.log(quantityNewWords, countCards);
    const arrayCards = arrayNewWords.concat(arrayOldWords);
    allCards = arrayCards.filter((word, item) => item < countCards);
  } else {
    console.log(`Минимально можно выбрать ${quantityNewWords} карточек`);
  }
};

const findWordInText = (word, text) => {
  const re = new RegExp(word, "mi");
  const wordReplace = text.replace(re, "[...]");
  console.log(wordReplace);
  return wordReplace;
};

const findRenderChecked = () => {};

const CHECKBOX = document.querySelectorAll(".checkbox");

let wordsData = [];

findWordInText("feeling", "How long, must this feeling go on?");

const renderCard = () => {
  // console.log(allCards)

  const {
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    transcription,
    word,
    wordTranslate,
    audio,
    image,
  } = wordsData[count];
  curentWord = word;
  console.log(
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    transcription,
    word,
    wordTranslate
  );

  const replaceExample = findWordInText(word, textExample);
  const replaceMeaning = findWordInText(word, textMeaning);

  const card = `<div class="word-example example">${replaceExample}</div>
                  <div class="word-example example-translation none">${textExampleTranslate}</div>
                  <div class="word-input">
                      <input type="text" class="answer-input input-word" style="width:${
                        word.length * 12
                      }px" autofocus>
                  </div>
                  <div class="word-example word-translation">${wordTranslate}</div>
                  <div class="word-example word-transcription">${transcription}</div>
                  <div class="word-example association" id="picture">
                      <img src="${URL_DATA}${image}" alt="${word}">
                  </div>
                  <div class="meaning">
                      <div class="meaning-text">
                        <div class="word-example meaning-eng mean">${replaceMeaning}</div>
                        <div class="word-example meaning-ru mean-translation none">${textMeaningTranslate}</div>
                      </div>
                  </div>
    `;

  const aaa = `<span class="text-example">${textExample}</span>
    <span class="text-example_translate">${textExampleTranslate}</span>
    <input class="input input-word" style="width:${word.length * 6}px" ></input>
    <span class="word-translate">${wordTranslate}</span>
    <span class="word-transcript">${transcription}</span>
    <img class="word-image"></img>
    <span class="text-meaning">${textMeaning}</span>
    <span class="text-meaning_translate">${textMeaningTranslate}</span>`;

  const CARD = document.querySelector(".game-content");

  CARD.innerHTML = card;

  const audioPath = `${URL_DATA}${audio}`;

  // audioPlay(audioPath);
};

const checkWord = () => {
  const INPUT_WORD = document.querySelector(".input-word");
  const wordCheck = INPUT_WORD.value.toLowerCase();
  console.log(wordCheck, curentWord);
  if (wordCheck === curentWord) {
    console.log("good");
  } else {
    console.log("bad");
  }
};

const audioPlay = (src) => {
  const audio = new Audio();
  audio.src = `${src}`;
  audio.play();
};


const audioPlayTurn = () => {
  const CHECKBOX_AUTOPLAY = document.querySelector('.autoplay')  

  if (CHECKBOX_AUTOPLAY.checked) {
    const {audio, audioExample, audioMeaning } = wordsData[count];
    const audioArray = [audio];
    const EXAMPLE = document.querySelector('.checkbox-example');
    const MEAN = document.querySelector('.checkbox-mean');

    if (EXAMPLE.checked) {
        audioArray.push(audioExample);
    }

    if (MEAN.checked) {
        audioArray.push(audioMeaning);
    }

    let firstAudio = 0;
  
    const loadAudio = () => {
      const audioPath = `${URL_DATA}${audioArray[firstAudio]}`;
      firstAudio += 1;
  
      if (firstAudio > audioArray.length) {
        return
      }
  
      const audioText = new Audio() 
      audioText.src = audioPath;
      audioText.autoplay = true;
      audioText.addEventListener('ended', () => {
          loadAudio();
      });
    };
  
    loadAudio();
  }

};

const BTN_CHECK = document.querySelector(".about-team");
const BTN_NEXT = document.querySelector(".btn-next");
const BTN_ANSWER = document.querySelector(".btn-answer");
const BTN_ENTER = document.querySelector(".btn-enter");
const CHECKBOX_EXAMPLE = document.querySelector(".checkbox-example");
const CHECKBOX_TRANSLATE = document.querySelector(".checkbox-word-translation");
const CHECKBOX_TRANSCRIPT = document.querySelector(
  ".checkbox-word-transcription"
);
const CHECKBOX_ASSOCIATION = document.querySelector(".checkbox-association");
const CHECKBOX_MEANING = document.querySelector(".checkbox-mean");
const CHECKBOX_ANSWER = document.querySelector('.checkbox-answer');

const checked = (event) => {
  const WORD_EXAMPLE = document.querySelectorAll(".word-example");
  let eventClass = event.target.classList[1];
  eventClass = eventClass.replace(/checkbox-/im, "");
  console.log(eventClass);

  if (event.target.checked) {
    WORD_EXAMPLE.forEach((element) => {
      console.log(element);
      if (element.classList.contains(`${eventClass}`)) {
        element.classList.remove("none");
      }
    });
  } else {
    WORD_EXAMPLE.forEach((element) => {
      if (element.classList.contains(`${eventClass}`)) {
        element.classList.add("none");
      }
    });
  }
};

const findCheckbox = () => {
  const WORD_EXAMPLE = document.querySelectorAll(".word-example");
  const CHECKBOX_ALL = document.querySelectorAll(".checkbox");

  console.log(CHECKBOX_ALL[0].checked);

  CHECKBOX_ALL.forEach((checkbox) => {
    let checkboxClass = checkbox.classList[1];
    checkboxClass = checkboxClass.replace(/checkbox-/im, "");
    console.log(checkboxClass);
    if (checkbox.checked) {
      WORD_EXAMPLE.forEach((element) => {
        if (element.classList.contains(`${checkboxClass}`)) {
          element.classList.remove("none");
        }
      });
    } else {
      WORD_EXAMPLE.forEach((element) => {
        if (element.classList.contains(`${checkboxClass}`)) {
          element.classList.add("none");
        }
      });
    }
  });
  // let checkboxClass = event.target.classList[1];
  // eventClass = eventClass.replace(/checkbox-/mi, '')
  // console.log(eventClass)

  // if(event.target.checked) {
  //     WORD_EXAMPLE.forEach((element, index) => {
  //         if (element.classList.contains(`${eventClass}`)) {
  //             element.classList.remove('none');
  //         }
  //     });
  // } else {
  //     WORD_EXAMPLE.forEach((element) => {
  //         if (element.classList.contains(`${eventClass}`)) {
  //             element.classList.add('none');
  //         }
  //     });;
  // }
};

CHECKBOX_EXAMPLE.addEventListener("change", (event) => {
  checked(event);
});

CHECKBOX_TRANSLATE.addEventListener("change", (event) => {
  checked(event);
});

CHECKBOX_TRANSCRIPT.addEventListener("change", (event) => {
  const div = document.querySelector(".word-transcription");
  checked(event);
});

CHECKBOX_ASSOCIATION.addEventListener("change", (event) => {
  checked(event);
});

CHECKBOX_MEANING.addEventListener("change", (event) => {
  const div = document.querySelector(".meaning-eng");
  checked(event);
});

CHECKBOX_ANSWER.addEventListener('change', () => {
    const btnAnswer = document.querySelector('.btn-answer')
    if (CHECKBOX_ANSWER.checked) {
        btnAnswer.classList.remove('none');
    } else {
        btnAnswer.classList.add('none');
    }
});

BTN_CHECK.addEventListener("click", async () => {
  receivedWords.length = 0;
  wordsData = await getWords(page, group);
  // await getNewWords();
  // quantityCards();
  renderCard();
  findCheckbox();
  // checkWord();
});

BTN_NEXT.addEventListener("click", () => {
  count += 1;
  renderCard();
  findCheckbox();
  audioPlayTurn();
  console.log("next");
});

BTN_ANSWER.addEventListener("click", () => {
  console.log("answer");
  console.log(CHECKBOX);
  CHECKBOX.forEach((element) => {
    if (element.checked) {
      console.log(element);
    }
  });
});

