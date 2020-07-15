let studyInstance = null;

export const getStudy = () => {
  if (!studyInstance) {
    studyInstance = new Study();
  }
  return studyInstance;
}

import User from './user';
const user = new User();

export default class Study {
  constructor() {
    this.urlData = 'https://raw.githubusercontent.com/omirbeck/rslang-data/master/';
    this.urlHeroku = 'https://afternoon-falls-25894.herokuapp.com';
    this.count = 0;
    this.maxPage = 29;
    this.maxGroup = 5;
    this.maxWordsCards = 100;
    this.minWordsCards = 0;
    this.page = 0;
    this.group = 0;
    // this.arrayNewWords = [];
    // this.arrayLearnWords = [];
    this.countNewWords = 0;
    this.countRepeat= 0;
    this.countCards = 0;
    this.arrayNewWords = [];
    this.arrayRepeat = [];
    this.arrayStudy = [];
    this.allCards = [];
    this.wordsData = [];
    this.receivedWords = [];
    this.currentWord = '';
    this.right = 'right';
  }

  async response(rawResponse) {
    if (!rawResponse.ok)  {
      // if (rawResponse.status === 401) {
      //   console.log()
      // }
      const data = await rawResponse.text();
      console.log(data);
      return null;
    } else {
      const content = await rawResponse.json();
      return content;
    }
  }

  async getAgregateWords({ userId, group, wordsPerPage, filter }){
    const filterUrl = `${encodeURIComponent(filter)}`;
    const token = localStorage.getItem('token');
    const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filterUrl}`,
        {
            method: "GET",
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    return await this.response(rawResponse);
  };

  async getUserWord({ userId, wordId }){
    const token = localStorage.getItem('token');
    console.log(token);
    const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/words/${wordId}`,
        {
            method: "GET",
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    await this.response(rawResponse);

  };

  async createUserWord({userId, wordId, word}) {
    console.log(word)
    const token = localStorage.getItem('token');
    const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });

    return await this.response(rawResponse);
  };

  async updateUserWord({userId, wordId, word}) {
    console.log(word)
    const token = localStorage.getItem('token');
    const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });

    return await this.response(rawResponse);
  };


  async getCompareWords(data) {
    const quantityWords = document.querySelector('.quantity-words');
    const quantityCards = document.querySelector('.quantity-cards');
    this.countNewWords = quantityWords.value;
    this.countCards = quantityCards.value;
    let dataWords = null;
    let dataRepeat = null;
    // let arrayWords = [];
    // let arrayRepeat = [];
    let arrayStudy = [];
    let repeatLength = 0;
    const curentDate = new Date();
    this.countRepeat = this.countCards - this.countNewWords;

    const getRepeatWords = async (count) => {
      dataRepeat = await this.getLearnWords(count);
      this.arrayRepeat = dataRepeat[0].paginatedResults;
      repeatLength = this.arrayRepeat.length;
    }

    const getNewWords = async (count) => {
      dataWords = await this.getNewWords(count);
      console.log(dataWords[0])
      this.arrayNewWords = dataWords[0].paginatedResults;
    }

    const getNewUserData = async () => { 
      if (quantityWords > this.maxWordsCards || quantityWords < this.minWordsCards) {
        return
      }
  
      if (quantityCards > this.maxWordsCards || quantityCards < this.minWordsCards) {
        return
      }

      console.log(this.countNewWords, this.countCards);
      console.log('hello')
      if (this.countNewWords > this.countCards) {
        console.log('5555+++++')
        const text = document.querySelector('.mb-4');
        text.textContent = 'Выберите больше карточек или меньше новых слов';
        this.removeClass('frame', 'none');
        console.log('Выберите больше карточек или меньше новых слов');
        return 
      }

      if (this.countNewWords < this.countCards ) {
        await getRepeatWords(this.countRepeat);
        if (repeatLength !== 0) {
          console.log('if 1 = not 0')
          await getNewWords(this.countNewWords);
          arrayStudy = this.arrayNewWords.concat(this.arrayRepeat);
          console.log(arrayStudy)
        } else {
          await getNewWords(this.countNewWords );
          arrayStudy = this.arrayNewWords;
          console.log(arrayStudy)
        }
      }

      if (this.countNewWords === this.countCards) {
        this.countRepeat = Math.round(this.countNewWords / 3);
        await getRepeatWords(this.countRepeat);
        this.countNewWords = this.countNewWords - this.countRepeat;
        if (repeatLength !== 0) {
          await getNewWords(this.countNewWords);
          arrayStudy = this.arrayNewWords.concat(this.arrayRepeat);
        } else {
          await getNewWords(countNew);
          arrayStudy = this.arrayNewWords;
        } 
      }
    }


    if (data) {
      console.log(data);
      const {wordsPerDay, optional, id} = data;
      const {date, countNew, countRepeat} = optional;
      const saveDate = new Date(date);
      
      if (curentDate.getDate() ===  saveDate.getDate()) {
        const {optional} = data;
        const {countNew, countRepeat} = optional;
        if (countNew === 0 && countRepeat === 0) {
            this.removeClass('frame','none');
            console.log('game over')
            return
        }

        this.countNewWords = countNew;
        this.countCards = wordsPerDay;
        this.countRepeat = countRepeat
        if (countNew !== 0) {
          await getNewWords(countNew);
        }
        if (countRepeat !== 0) {
          await getRepeatWords(countRepeat);
        }
        arrayStudy = this.arrayNewWords.concat(this.arrayRepeat);
      } else {
        await getNewUserData();
        await user.setSettingsData({
          "wordsPerDay": this.countCards,
          "optional": { "date": `${curentDate.toJSON()}`,
                        "countNew": this.countNewWords,
                        "countRepeat": this.countRepeat,
                      }
        });
      }
    } else {
      await getNewUserData();
      await user.setSettingsData({
        "wordsPerDay": this.countCards,
        "optional": { "date": `${curentDate.toJSON()}`,
                      "countNew": this.countNewWords,
                      "countRepeat": this.countRepeat,
                    }
      });
    }


    console.log(this.arrayNewWords)
    console.log(this.arrayRepeat)

    console.log(arrayStudy)
    return arrayStudy
 
  }

  quantityCards() {
    const QUANTITY_WORDS = document.querySelector('.quantity-words');
    const QUANTITY_CARDS = document.querySelector('.quantity-cards');
    const countCards = QUANTITY_CARDS.value;
    const quantityNewWords = QUANTITY_WORDS.value;
  
    if (quantityNewWords > countCards) {
      console.log(quantityNewWords, countCards);
      const arrayCards = this.arrayNewWords.concat(this.arrayLearnWords);
      this.allCards = arrayCards.filter((word, item) => item < countCards);
    } else {
      console.log(`Минимально можно выбрать ${quantityNewWords} карточек`);
    }
  };

  async getNewWords(value) {
    const userId = localStorage.getItem('userId');
    const agregateWords = {
      "userId": `${userId}`,
      "group": "",
      "wordsPerPage": value,
      "filter": `{"$and":[{"userWord.optional.repeat":{"$ne":true}},{"userWord":null}]}`,
    }

    console.log(value);
  
    const newWords = await this.getAgregateWords(agregateWords);

    if (newWords === null) {
      return null;
    }
    console.log('getNewWords' + newWords);
    return newWords;
  }

  async getLearnWords(value) {
    const userId = localStorage.getItem('userId');
    const agregateWords = {
      "userId": `${userId}`,
      "group": "",
      "wordsPerPage": value,
      "filter": `{"userWord.optional.repeat":true}`,
    }
  
    const newWords = await this.getAgregateWords(agregateWords);
    console.log('getLearnWords' + newWords);
    return newWords;
  }

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
      const {audio, audioExample, audioMeaning} = this.arrayStudy[this.count];
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
        const audioPath = `${this.urlData}${audioArray[firstAudio]}`;
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
        if (div !== null) {
          div.classList.remove(`${removeClass}`);
        }
      }
    }
  }
  
  addClass(elementClass, addClass) {
    if (elementClass && addClass) {
      if ((typeof elementClass === 'string') && (typeof addClass === 'string')) {
        const div = document.querySelector(`.${elementClass}`);
        if (div !== null) {
          div.classList.add(`${addClass}`);
        }
      }
    }
  }
  
  
  showAnswer() {
    const EXAMPLE = document.querySelector('.example');
    const MEAN = document.querySelector('.mean');
    const CHECKBOX_EXAMPLE = document.querySelector('.checkbox-example');
    const CHECKBOX_MEANING = document.querySelector('.checkbox-mean');
    const {textExample, textMeaning} = this.arrayStudy[this.count];
    console.log(this.arrayStudy[this.count])

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