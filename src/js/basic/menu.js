import {getStudy} from './study'
import {getTrash} from './trash'
import {getCard} from './cards';
const study = getStudy();
const trash = getTrash();
const card = getCard();


export default class Menu {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
  }

  example(event) {
    study.checked(event);
  }

  translate(event) {
    study.checked(event);
  }

  transcript(event) {
    study.checked(event);
  }

  association(event) {
    study.checked(event);
  }

  meaning(event) {
    study.checked(event);
  }

  answer() {
    study.findCheckbox();
    const ANSWER_INPUT = document.querySelector('.answer-input');
    const {word} = study.arrayStudy[study.count];
    ANSWER_INPUT.value = word;
    study.showAnswer();
  }

  send() {
    const INPUT_WORD = document.querySelector('.answer-input');
    const DATA_WORD = study.arrayStudy[study.count];
    const {word} = DATA_WORD;
    if (INPUT_WORD.value === word) {
      study.count += 1;
      if (study.arrayStudy.length >= study.count) {
        card.render(DATA_WORD);
        study.findCheckbox();
        study.audioPlayTurn();
      } else {
        console.log('все слова изучены')
      }
    } else {
      const wordContainer = document.querySelector('.word-container');
      let result = '';
      console.log(wordContainer);
      const letters = word.split('');
      const inputLetters = INPUT_WORD.value.split(''); 
      letters.forEach((letter, index) => {
        if (inputLetters.indexOf(letter) !== -1) {
          const span = `<span>${letter}</span>`;
          result += span;
        } else {
          const span = `<span class="red">${letter}</span>`;
          result += span;
        };
      });
      wordContainer.innerHTML = result;
      INPUT_WORD.value = '';
      wordContainer.classList.remove('hidden');
    }
  }

  next() {

    const DATA_WORD = study.arrayStudy[study.count];
    study.count += 1;
    console.log(study.count, study.arrayStudy.length)
    if (study.arrayStudy.length >= study.count) {
      card.render(DATA_WORD);
      study.findCheckbox();
      study.audioPlayTurn();
    } else {
      console.log('все слова изучены')
    }
    console.log('next');
  }

  trash() {
    const arrDataWords = study.arrayStudy[study.count];
    trash.setRemoveWord('delete', arrDataWords);
    // window.location.href = 'login.html';
    console.log('trash');
  }

  difficult() {
    const arrDataWords = study.arrayStudy[study.count];
    trash.setRemoveWord('difficult', arrDataWords);
    console.log('difficult');
  }

  answerCheckbox(event) {
    if (event.target.checked) {
      study.removeClass('btn-answer', 'none');
    } else {
      study.addClass('btn-answer', 'none');
    }
  }

  trashCheckbox(event) {
    if (event.target.checked) {
      study.removeClass('delete-icon', 'none');
    } else {
      study.addClass('delete-icon', 'none');
    }
  }

  dictionary() {
    console.log('dictionary');
    window.location.href = 'dictionary.html';
  }

  exit(){
    console.log('exit');
    localStorage.clear();
    window.location.href = "login.html";
  }

  difficultCheckbox(event) {
    if (event.target.checked) {
      study.removeClass('difficult-icon', 'none');
    } else {
      study.addClass('difficult-icon', 'none');
    }
    console.log('difficultCheckbox');
  }

  autoPlay() {
    console.log('play');
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  };
}