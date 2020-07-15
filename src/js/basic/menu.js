import {getStudy} from './study'
import {getTrash} from './trash'
import {getCard} from './cards';
import User from './user';
const study = getStudy();
const trash = getTrash();
const card = getCard();
const user = new User();


export default class Menu {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
  }
  
  async start() {
    const data = await user.getSettings();
    if (data !== null) {
      if (data.optional !== undefined) {
        if (data.optional.date !== undefined) {
          console.log(data);
          study.receivedWords.length = 0;
          study.arrayStudy = await study.getCompareWords(data);
        }
      } else {
        study.receivedWords.length = 0;
        study.arrayStudy = await study.getCompareWords();
      }
    } else {
      study.receivedWords.length = 0;
      study.arrayStudy = await study.getCompareWords();
    }

    console.log(study.arrayStudy);
    if (study.arrayStudy !== undefined) {
      if (study.arrayStudy.length !== 0) {
          card.renderGameWrapper();
          card.render(study.arrayStudy[study.count]);
          card.renderCardCount(1, study.arrayStudy.length)
          study.findCheckbox();
      }

    }
  }

  burger() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('navigation-active');
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

  async sendUserSettings() {
    const DATA_WORD = study.arrayStudy[study.count];
    const {word, _id} = DATA_WORD;
    const dataSetings = await user.getSettings();
    console.log(dataSetings);
    console.log(dataSetings.wordsPerDay)

    console.log(study.arrayNewWords, study.arrayRepeat)
    study.arrayNewWords.forEach(element => {
      if (element._id === _id) {
        dataSetings.optional.countNew -= 1;
      }
    });

    console.log(dataSetings.optional.countNew)

    study.arrayRepeat.forEach(element => {
      if (element._id === _id) {
        dataSetings.optional.countRepeat -= 1;
      }
    });

    console.log(dataSetings.optional.countRepeat)
    console.log(dataSetings);
    const {wordsPerDay, optional} = dataSetings;
    console.log(wordsPerDay, optional)
    await user.setSettingsData({wordsPerDay, optional}) 
  }

  async answer() { 
    const DATA_WORD = study.arrayStudy[study.count];
    study.findCheckbox();
    const ANSWER_INPUT = document.querySelector('.answer-input');
    const {word} = study.arrayStudy[study.count];
    ANSWER_INPUT.value = word;
    ANSWER_INPUT.select();
    await trash.setOptionalWord({ "optional":{ "repeat": true } }, DATA_WORD);
    await this.sendUserSettings();
    study.showAnswer();
    study.audioPlayTurn();
    study.count += 1;
    if (study.arrayStudy.length > study.count) {
      setTimeout(async () => {
        card.renderCardCount(study.count + 1, study.arrayStudy.length)
        const curentWord = study.arrayStudy[study.count];
        card.render(curentWord);
        study.findCheckbox();
      }, 1000)
    } else {
        card.renderWarning();
        card.renderStartPage();
        study.removeClass('frame','none');
    }
  }

  async send(event) {
    event.preventDefault();
    const INPUT_WORD = document.querySelector('.answer-input');
    const wordContainer = document.querySelector('.word-container');
    const DATA_WORD = study.arrayStudy[study.count];
    const {word, _id} = DATA_WORD;

    if (INPUT_WORD.value === word) {
      INPUT_WORD.select();
      if (study.arrayStudy.length >= study.count) {
        study.audioPlayTurn();
          setTimeout(async () => {
            if (study.right === 'right') {
              console.log('hard');
              await trash.setOptionalWord({ "difficulty": "hard", "optional":{} }, DATA_WORD);
            }
            study.right = 'right';
            await this.sendUserSettings();
            study.count += 1;
            if (study.arrayStudy.length > study.count) {
              console.log(study.count, study.arrayStudy.length)
              const curentWord = study.arrayStudy[study.count];
              card.render(curentWord);
              card.renderCardCount(study.count + 1, study.arrayStudy.length)
              study.findCheckbox();
              console.log(study.arrayStudy);
            } else {
              card.renderWarning();
              study.removeClass('frame','none');
              card.renderStartPage();
              return
            }
          }, 1000);
        } 
    } else {
      if (study.right !== 'error') {
        await trash.setOptionalWord({ "optional":{ "repeat": true } }, DATA_WORD); 
      }
      study.right = 'error';
      let result = '';
      console.log(wordContainer);
      const letters = word.split('');
      const inputLetters = INPUT_WORD.value.split(''); 
      letters.forEach((letter, i) => {
        if (letter === inputLetters[i]) {
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
      wordContainer.style.opacity = 0.5;
      study.audioPlayTurn();
    }
  }

  answerInput() {
    console.log('input');
    const container = document.querySelector('.word-container');
    container.style.opacity = 0;
    setTimeout(() => {
      container.classList.add('hidden');
      container.style.opacity = 1;
    }, 2000);
  }


  trash() {
    const arrDataWords = study.arrayStudy[study.count];
    trash.setOptionalWord({ "difficulty": "delete", "optional":{} }, arrDataWords);
    console.log('trash');
    study.count += 1;
    if (study.arrayStudy.length >= study.count) {
      card.render(study.arrayStudy[study.count]);
      card.renderCardCount(study.count + 1, study.arrayStudy.length);
      this.sendUserSettings().then(response => response) 
      study.findCheckbox(); 
    } else {
      card.renderWarning();
      card.renderStartPage();
      study.removeClass('frame','none');
    }
  }

  difficult() {
    const arrDataWords = study.arrayStudy[study.count];
    trash.setOptionalWord({ "difficulty": "difficult", "optional":{} }, arrDataWords);
    this.sendUserSettings().then(response => response)
    console.log(study.arrayStudy.length, study.count)
    study.count += 1;
    if (study.arrayStudy.length >= study.count) {
      card.render(study.arrayStudy[study.count]);
      card.renderCardCount(study.count + 1, study.arrayStudy.length);
      study.findCheckbox();
      console.log('difficult');
    } else {
      card.renderWarning();
      card.renderStartPage();
      study.removeClass('frame','none');
    }
     
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

  logo() {
    console.log('logo');
    window.location.href = 'index.html'
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

  popupClose() {
    study.addClass('frame','none');
  }

  speak() {
    window.location.href = "speakit.html";
  }

  puzzle() {
    window.location.href = "english-puzzle.html";
  }

  savannah() {
    window.location.href = "savannah.html";
  }

  audiocall() {
    window.location.href = "audiocall.html";
  }

  sprint() {
    window.location.href = "sprint.html";
  }

  about() {
    window.location.href = "about.html";
  }

  progress() {
    window.location.href = "progress.html"
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  };

  onFocus(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  };

  onInput(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  };

  onSubmit(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action](event);
    }
  };
}