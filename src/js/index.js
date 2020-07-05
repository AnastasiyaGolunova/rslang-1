import '../css/style.css';
import '../css/dictionary.css';
import '../css/fonts.css';
import '../css/game.css';
import '../css/login.css';

import './login.js';
import '../css/index.css';
import '../css/style.css';
import '../css/game.css';
import Header from './header'
import { getStudy } from './basic/study';
import Cards from './basic/cards';
import Menu from './basic/menu';
import { getTrash } from './basic/trash';
import {refreshLogin} from './basic//refresh';
const study = getStudy();
const card = new Cards();
const header = new Header();
const trash = getTrash;


async function init() {
  await refreshLogin();
  header.render();
  const body = document.querySelector('body');
  new Menu(body);

  const BTN_CHECK = document.querySelector('.about-team');


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
}

init();


// const settings = document.querySelector('#settings');

// const gameWrap = document.querySelector('.game-wrap');
//new Menu(body);
// new Menu(gameWrap);

let count = 0;
let curentWord = '';
const deleteWords = [];

// const receivedWords = [];

// let allCards = [];



export {study, card, header, trash}
