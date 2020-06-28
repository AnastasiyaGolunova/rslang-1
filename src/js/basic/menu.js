import {study, card, trash} from '../index';

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
    const {word} = study.arrayStudy[study.count];
    if (INPUT_WORD.value === word) {
      study.count += 1;
      card.render(study.arrayStudy[study.count]);
      study.findCheckbox();
      study.audioPlayTurn();
    }
  }

  next() {
    study.count += 1;
    card.render(study.arrayStudy[study.count]);
    study.findCheckbox();
    study.audioPlayTurn();
    console.log('next');
  }

  trash() {
    trash.remove(true);
    console.log('trash');
  }

  difficult() {
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