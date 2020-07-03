import '../css/index.css';
import '../css/style.css';
import '../css/game.css';
import Header from './header'
import { getStudy } from './basic/study';
import Cards from './basic/cards';
import Menu from './basic/menu';
import { getTrash } from './basic/trash';
const study = getStudy();
const card = new Cards();
const header = new Header();
const trash = getTrash;

header.render();

const settings = document.querySelector('#settings');
const gameWrap = document.querySelector('.game-wrap');
new Menu(settings);
new Menu(gameWrap);

let count = 0;
let curentWord = '';
const deleteWords = [];

// const receivedWords = [];

// let allCards = [];


study.findWordInText('feeling', 'How long, must this feeling go on?');

const CHECKBOX = document.querySelectorAll('.checkbox');
const BTN_CHECK = document.querySelector('.about-team');
const BTN_NEXT = document.querySelector('.btn-next');
const BTN_ANSWER = document.querySelector('.btn-answer');
const BTN_ENTER = document.querySelector('.btn-enter');
const CHECKBOX_EXAMPLE = document.querySelector('.checkbox-example');
const CHECKBOX_TRANSLATE = document.querySelector('.checkbox-word-translation');
const CHECKBOX_TRANSCRIPT = document.querySelector('.checkbox-word-transcription');
const CHECKBOX_ASSOCIATION = document.querySelector('.checkbox-association');
const CHECKBOX_MEANING = document.querySelector('.checkbox-mean');
const CHECKBOX_ANSWER = document.querySelector('.checkbox-answer');
const BTN_TRASH = document.querySelector('.delete-icon');
const BTN_DIFFICULT = document.querySelector('.difficult-icon');

const MENU_DICTIONARY = document.querySelector('.menu-dictionary');

MENU_DICTIONARY.addEventListener('click', () => {
  window.location.href = 'dictionary.html';
});

// CHECKBOX_EXAMPLE.addEventListener('change', (event) => {
//    study.checked(event);
// });

// CHECKBOX_TRANSLATE.addEventListener('change', (event) => {
//   study.checked(event);
// });

// CHECKBOX_TRANSCRIPT.addEventListener('change', (event) => {
//   study.checked(event);
// });

// CHECKBOX_ASSOCIATION.addEventListener('change', (event) => {
//   study.checked(event);
// });

// CHECKBOX_MEANING.addEventListener('change', (event) => {
//   study.checked(event);
// });

// CHECKBOX_ANSWER.addEventListener('change', () => {
//   const btnAnswer = document.querySelector('.btn-answer')
//   if (CHECKBOX_ANSWER.checked) {
//     btnAnswer.classList.remove('none');
//   } else {
//     btnAnswer.classList.add('none');
//   }
// });

BTN_CHECK.addEventListener('click', async () => {
  study.receivedWords.length = 0;
  study.arrayStudy = await study.getCompareWords();
  // const result = study.arrayStudy[0].paginatedResults;
  console.log(study.arrayStudy);
  if (study.arrayStudy.length !== 0) {
    card.render(study.arrayStudy[study.count]);
  }

  // study.wordsData = await study.getWords(0, 0);
  //await study.get();
  //study.quantityCards();
  // card.render();
  //study.findCheckbox();
  // checkWord();
});

document.querySelector('.dictionary-trash').addEventListener('click', async () => {
  console.log('dictionary-trash')
  window.location.href = "http://www.example.com";
  //const data = await study.getRemoveWord();
  console.log(data);
});


export {study, card, header, trash}
