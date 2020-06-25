/* eslint-disable no-console */
export default class Study {
  constructor() {
    this.urlData = 'https://raw.githubusercontent.com/omirbeck/rslang-data/master/';
    this.count = 0;
    this.maxPage = 29;
    this.maxGroup = 5;
    this.page = 0;
    this.group = 0;
    this.arrayNewWords = [];
    this.arrayOldWords = [];
    this.wordsData = [];
    this.currentWord = '';
  }


  async getWords(page, group) {
    try {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      return data;
    } catch (e) {
      // console.log(e);
      return false;
    }
  };

  async getQuantityWords(countPage, countGroup) {
    const arrayWords = [];
    console.log(`countGroup=${countGroup}`);
  
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

  async getNewWords() {
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
        console.log('if <');
        findNewWords();
      } else {
        console.log('else');
        while (arrayNewWords.length > quantityNewWords) {
          console.log('while');
          arrayNewWords.pop();
        }
      }
      console.log(arrayNewWords, arrayOldWords);
    };
  
    return findNewWords();
  };

  quantityCards() {
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

  findWordInText(word, text) {
    const re = new RegExp(word, 'mi');
    const wordReplace = text.replace(re, '[...]');
    console.log(wordReplace);
    return wordReplace;
  };


  checkWord() {
    const INPUT_WORD = document.querySelector('.input-word');
    const wordCheck = INPUT_WORD.value.toLowerCase();
    console.log(wordCheck, this.currentWord);
    if (wordCheck === this.currentWord) {
      console.log('good');
    } else {
      console.log('bad');
    }
  };
  
  audioPlay(src) {
    const audio = new Audio();
    audio.src = `${src}`;
    audio.play();
  };
  
  audioPlayTurn() {
    const CHECKBOX_AUTOPLAY = document.querySelector('.autoplay')
  
    if (CHECKBOX_AUTOPLAY.checked) {
      const {audio, audioExample, audioMeaning} = this.wordsData[this.count];
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

  checked(event) {
    const WORD_EXAMPLE = document.querySelectorAll('.word-example');
    let eventClass = event.target.classList[1];
    eventClass = eventClass.replace(/checkbox-/im, '');
    console.log(eventClass);
  
    if (event.target.checked) {
      WORD_EXAMPLE.forEach((element) => {
        console.log(element);
        if (element.classList.contains(`${eventClass}`)) {
          element.classList.remove('none');
        }
      });
    } else {
      WORD_EXAMPLE.forEach((element) => {
        if (element.classList.contains(`${eventClass}`)) {
          element.classList.add('none');
        }
      });
    }
  };
  
  findCheckbox() {
    const WORD_EXAMPLE = document.querySelectorAll('.word-example');
    const CHECKBOX_ALL = document.querySelectorAll('.checkbox');
  
    console.log(CHECKBOX_ALL[0].checked);
  
    CHECKBOX_ALL.forEach((checkbox) => {
      let checkboxClass = checkbox.classList[1];
      checkboxClass = checkboxClass.replace(/checkbox-/im, '');
      console.log(checkboxClass);
      if (checkbox.checked) {
        WORD_EXAMPLE.forEach((element) => {
          if (element.classList.contains(`${checkboxClass}`)) {
            element.classList.remove('none');
          }
        });
      } else {
        WORD_EXAMPLE.forEach((element) => {
          if (element.classList.contains(`${checkboxClass}`)) {
            element.classList.add('none');
          }
        });
      }
    });
  };

  
  removeClass(elementClass, removeClass) {
    if (elementClass && removeClass) {
      if ((typeof elementClass === 'string') && (typeof removeClass === 'string')) {
        const div = document.querySelector(`.${elementClass}`);
        div.classList.remove(`${removeClass}`);
      }
    }
  }
  
  addClass(elementClass, addClass) {
    if (elementClass && addClass) {
      if ((typeof elementClass === 'string') && (typeof addClass === 'string')) {
        const div = document.querySelector(`.${elementClass}`);
        div.classList.add(`${addClass}`);
      }
    }
  }
  
  
  showAnswer() {
    const EXAMPLE = document.querySelector('.example');
    const MEAN = document.querySelector('.mean');
    const CHECKBOX_EXAMPLE = document.querySelector('.checkbox-example');
    const CHECKBOX_MEANING = document.querySelector('.checkbox-mean');
    const {textExample, textMeaning} = this.wordsData[this.count];

    if (CHECKBOX_EXAMPLE.checked) {
      EXAMPLE.innerHTML = textExample;
        this.removeClass('example-translation', 'none');
    };
  
    if (CHECKBOX_MEANING.checked) {
      MEAN.innerHTML = textMeaning;
      this.removeClass('mean-translation', 'none');
    };
  }
} 