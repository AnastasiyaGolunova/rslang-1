let studyInstance = null;

export const getStudy = () => {
  if (!studyInstance) {
    studyInstance = new Study();
  }
  return studyInstance;
}

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
    this.arrayNewWords = [];
    this.arrayLearnWords = [];
    this.arrayStudy = [];
    this.allCards = [];
    this.wordsData = [];
    this.receivedWords = [];
    this.currentWord = '';
  }

  init() {

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
    const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/aggregatedWords?
    wordsPerPage=${wordsPerPage}&filter=${filterUrl}`,
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
      "wordsPerPage": `${value}`,
      "filter": `{"$and":[{"userWord.optional.repeat":{"$ne":true}}]}`,
    }
  
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
      "wordsPerPage": `${value}`,
      "filter": `{"userWord.optional.repeat":true}`,
    }
  
    const newWords = await this.getAgregateWords(agregateWords);
    console.log('getLearnWords' + newWords);
    return newWords;
  }

  async getCompareWords() {
    const quantityWords = document.querySelector('.quantity-words');
    const quantityCards = document.querySelector('.quantity-cards');
    let countNew = quantityWords.value;
    let countCards = quantityCards.value;
    let dataWords = null;
    let dataRepeat = null;
    let arrayWords = [];
    let arrayRepeat = [];
    let arrayStudy = [];
    let countRepeat = 0;

    const getRepeatWords = async (count) => {
      dataRepeat = await this.getLearnWords(count);
      arrayRepeat = dataRepeat[0].paginatedResults;
      repeatLength = arrayRepeat.length;
    }

    const getNewWords = async () => {
      dataWords = await this.getNewWords(countNew);
      arrayWords = dataWords[0].paginatedResults;
    }

    if (quantityWords > this.maxWordsCards || quantityWords < this.minWordsCards) {
      return
    }

    if (quantityCards > this.maxWordsCards || quantityCards < this.minWordsCards) {
      return
    }

    if (countNew > countCards) {
      console.log('Выберете больше карточек или меньше новых слов');
      return 
    }

    const countMinRepeat = Math.round(countNew / 2);
    countRepeat = countCards - countNew;
    let repeatLength = 0;

    if (countCards < (countNew + countMinRepeat)) {
      console.log('Нужно добавить количество карточек');
      return
    }

    if (countNew < countCards && countRepeat >= countMinRepeat) {
      await getRepeatWords(countRepeat);
      console.log(arrayRepeat, repeatLength)
      if (repeatLength !== 0) {
        console.log('if 1 = not 0')
        await getNewWords();
        arrayStudy = arrayWords.concat(arrayRepeat);
        console.log(arrayWords)
      } else {
        await getNewWords();
        arrayStudy = arrayWords;
      }
    } 
    
    if (countNew < countCards && countRepeat < countMinRepeat) {
      await getRepeatWords(countMinRepeat);
      if (repeatLength !== 0) {
        await getNewWords();
        arrayStudy = arrayWords.concat(arrayRepeat);
      } else {
        await getNewWords();
        arrayStudy = arrayWords;
      }
    }

    //const countRepeat = Math.round(quantityWords.value / 3);
    //const countNew = quantityCards.value - countRepeat;
    
    
    // const newWords = study.arrayNewWords[0].paginatedResults;
    // const learnWords = study.arrayLearnWords[0].paginatedResults;

    // this.arrayStudy = newWords.concat(learnWords);
    // console.log(this.arrayStudy);
    // console.log(study.arrayNewWords[0].paginatedResults);
    // console.log(study.arrayLearnWords[0].paginatedResults.length);
    // card.render(result[study.count]);
    console.log(arrayStudy)
    return arrayStudy
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


  async getWordssssss(page, group) {
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

  async getQuantityWordssssss(countPage, countGroup) {
    const arrayWords = [];
    console.log(`countGroup=${countGroup}`);
  
    for (let j = 0; j < countGroup; j += 1) {
      console.log(j);
      for (let i = 0; i < countPage; i += 1) {
        const data = await this.getWords(i, this.group);
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

  async getNewWordssss() {
    const QUANTITY_WORDS = document.querySelector('.quantity-words');
    this.arrayNewWords.length = 0;
    this.arrayLearnWords.length = 0;
    const quantityNewWords = QUANTITY_WORDS.value;

    if (quantityNewWords > this.maxWordsCards || quantityNewWords < this.minWordsCards) {
      console.log('MAX 100 and MIN 0');
      return
    }

    let countPage = Math.ceil(Number(quantityNewWords) / 20);
    let countGroup = Math.ceil(Number(countPage / 600));
  
    const findNewWords = async () => {
      const quantityWords = await this.getQuantityWords(countPage, countGroup);
  
      quantityWords.forEach((word) => {
        if (this.arrayId.indexOf(word.id) === -1) {
          this.arrayNewWords.push(word);
        } else {
          this.arrayLearnWords.push(word);
        }
      });
  
      if (this.arrayNewWords.length < quantityNewWords) {
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
        while (this.arrayNewWords.length > quantityNewWords) {
          console.log('while');
          this.arrayNewWords.pop();
        }
      }
      console.log(this.arrayNewWords, this.arrayLearnWords);
    };
  
    return findNewWords();
  };
} 