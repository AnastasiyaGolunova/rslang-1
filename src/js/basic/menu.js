import {study, card} from '../index';

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
    const {word} = study.wordsData[study.count];
    ANSWER_INPUT.value = word;
    study.showAnswer();
  }

  send() {
    const INPUT_WORD = document.querySelector('.answer-input');
    const {word} = study.wordsData[study.count];
    if (INPUT_WORD.value === word) {
      study.count += 1;
      card.render();
      study.findCheckbox();
      study.audioPlayTurn();
    }
  }

  next() {
    study.count += 1;
    card.render();
    study.findCheckbox();
    study.audioPlayTurn();
    console.log('next');
  }

  trash() {
    console.log('trash');
  }

  difficult() {
    console.log('difficult');
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