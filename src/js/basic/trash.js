import Study from './study';
// import Study from '../basic/study.js';
const study = new Study();

export default class Trash {
    constructor() {
        this.allWords = [],
        this.removeWords = [],
        this.difficultWords = [],
        this.audioArray = []
    }

    init() {
        const BTN_REMOVE = document.querySelector('.filter-remove_words');
        const BTN_DIFFICULT = document.querySelector('.filter-difficult_words');
        const BTN_ALL = document.querySelector('.filter-all_words');
        const WORD_LIST = document.querySelector('.word-list');

        const toggleClassMenu = (event) => {
            document.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
        }

        BTN_REMOVE.addEventListener('click', (event) => {
            toggleClassMenu(event);
            this.forEachCard(this.removeWords);
        });

        BTN_DIFFICULT.addEventListener('click', (event) => {
            toggleClassMenu(event);
            this.forEachCard(this.difficultWords);
        });

        BTN_ALL.addEventListener('click', (event) => {
            toggleClassMenu(event);
            this.forEachCard(this.allWords);
        });

        WORD_LIST.addEventListener('click', (event) => {
            const eventContains = (event, elementClass) => {
                const contains = event.target.classList.contains(`${elementClass}`);
                return contains;
            }
            
            if (eventContains(event, 'dictionary_trash')) {
                const id = event.target.dataset.id;
                this.recoveryWord(id);
                const elementWord = event.target.closest('.word');
                elementWord.remove();
                console.log()
            }

            if (eventContains(event, 'dictionary_voice')) {
                const pathAudio = event.target.dataset.audio;
                const path = `${study.urlData}${pathAudio}`
                study.audioPlay(path);
            }

        });

    }

    async setRemoveWord(value) {
        const {_id} = study.arrayStudy[study.count];
        console.log(study.arrayStudy[study.count])
        console.log(_id);
        const userId = localStorage.getItem('userId');
        const dataRemove = {
            "userId": `${userId}`,
            "wordId": `${_id}`,
            "word": {
                "optional": {
                    "delete": value
                }
              }
        }
  
        let result = await study.createUserWord(dataRemove);
        if (result === null) {
            result = await study.updateUserWord(dataRemove);
        }
        
        console.log(result);
    }

    async getRemoveWord() {
        const userId = localStorage.getItem('userId');
        const agregateWords = {
          "userId": `${userId}`,
          // "group": "",
          // "wordsPerPage": `${value}`,
          "filter": `{"userWord.optional.delete":true}`,
        }
      
        const removeWords = await study.getAgregateWords(agregateWords);
        if (removeWords !== null) {
            const result = removeWords[0].paginatedResults;
            return result;
        }
    }

    async getDifficultWord() {
        const userId = localStorage.getItem('userId');
        const agregateWords = {
          "userId": `${userId}`,
          "filter": `{"userWord.difficulty":"difficult"}`,
        }
      
        const words = await study.getAgregateWords(agregateWords);
        if (words !== null) {
            const result = words[0].paginatedResults;
            return result;
        }
    }

    renderCard(arr) {
        if (arr || arr !== null) {
            console.log
            const {_id,textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate,audio,image} = arr;
            this.audioArray.push(audio);
            const difficultCards = `
                        <div class="dictionary-list icon">
                            <img class="voice dictionary_voice" data-audio="${audio}" src="./icons/voice.png" alt="voice">
                        </div>
                        <div class="dictionary-list words">
                            <span class="dictionary-list eng-word">${word}</span>
                            <span class="dictionary-list ru-word">${wordTranslate}</span>
                        </div>
                        <div class="dictionary-list icon">
                            <img class="trash dictionary_trash" data-id="${_id}" src="./icons/trash.png" alt="trash">
                        </div>
                    `
        const div = document.createElement('div');
        div.classList = ['dictionary-list word'];
        div.innerHTML = difficultCards;
        const WORD_LIST = document.querySelector('.word-list');
        
        WORD_LIST.appendChild(div);
        } 
    }

    forEachCard(arrWords){
        const WORD_LIST = document.querySelector('.word-list');
        WORD_LIST.innerHTML = '';
        if (arrWords.length !== 0) {
            arrWords.forEach(element => {
                this.renderCard(element);
            });
        };
    }

    recoveryWord(id) {
        if (id) {
            const active = document.querySelector('.active');
            const text = active.textContent;

            if (text === 'Удалённые слова') {
                this.removeWords.forEach(({_id}, index) => {
                    if (_id === id) {
                        this.removeWords.splice(index, 1);
                        
                    }
                });


                
                console.log(this.removeWords)
            }

        }
    }


    
}