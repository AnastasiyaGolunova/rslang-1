import {study} from '../index';

export default class Cards {
  
  render(words) {
    // console.log(allCards)
    const {textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate,audio,image} = words;
    study.currentWord = word;
    console.log(`${study.urlData}`);
  
    const replaceExample = study.findWordInText(word, textExample);
    const replaceMeaning = study.findWordInText(word, textMeaning);
  
    const card = `<div class='word-example example'>${replaceExample}</div>
                    <div class='word-example example-translation none'>${textExampleTranslate}</div>
                    <div class='word-input'>
                        <input type='text' class='answer-input input-word' style='width:${word.length * 12}px' autofocus>
                    </div>
                    <div class='word-example word-translation'>${wordTranslate}</div>
                    <div class='word-example word-transcription'>${transcription}</div>
                    <div class='word-example association' id='picture'>
                        <img src='${study.urlData}${image}' alt='${word}'>
                    </div>
                    <div class='meaning'>
                        <div class='meaning-text'>
                          <div class='word-example meaning-eng mean'>${replaceMeaning}</div>
                          <div class='word-example meaning-ru mean-translation none'>${textMeaningTranslate}</div>
                        </div>
                    </div>
      `;
  
    const CARD = document.querySelector('.game-content');
  
    CARD.innerHTML = card;
  };

  renderVocabulary(){
        const vocabularyBlock = `
                      <div class="dictionary-list">
                          <div class="header">
                              <div class="dictionary-list name">
                                  <h2>Мой словарь</h2>
                              </div>
                              <div class="dictionary-list filter">
                                  <div class="filter-item"><span>Все</span></div>
                                  <div class="filter-item"><span>Сложные слова</span></div>
                                  <div class="filter-item"><span>Удалённые слова</span></div>
                              </div>
                          </div>
                          <div class="dictionary-list content">
                              <div class="dictionary-list word-list">

                              </div>
                          </div>
                          <div class="dictionary-list button">
                              <button class="start">Изучить слова</button>
                          </div>
                      </div>
        `
      
        const GAME_WRAP = document.querySelector('.game-wrap');
      
        GAME_WRAP.innerHTML = vocabularyBlock;

  }

  renderDictionary() {
        // console.log(allCards)
        const {textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate,audio,image} = words;
        study.currentWord = word;
        console.log(`${study.urlData}`);
      
        const replaceExample = study.findWordInText(word, textExample);
        const replaceMeaning = study.findWordInText(word, textMeaning);
      
        const card = `<div class='word-example example'>${replaceExample}</div>
                        <div class='word-example example-translation none'>${textExampleTranslate}</div>
                        <div class='word-input'>
                            <input type='text' class='answer-input input-word' style='width:${word.length * 12}px' autofocus>
                        </div>
                        <div class='word-example word-translation'>${wordTranslate}</div>
                        <div class='word-example word-transcription'>${transcription}</div>
                        <div class='word-example association' id='picture'>
                            <img src='${study.urlData}${image}' alt='${word}'>
                        </div>
                        <div class='meaning'>
                            <div class='meaning-text'>
                              <div class='word-example meaning-eng mean'>${replaceMeaning}</div>
                              <div class='word-example meaning-ru mean-translation none'>${textMeaningTranslate}</div>
                            </div>
                        </div>
          `;
      
        const CARD = document.querySelector('.game-content');
      
        CARD.innerHTML = card;
    `
    <div class="dictionary-list word">
                    <div class="dictionary-list icon">
                        <img class="voice" src="../icons/voice.png" alt="voice">
                    </div>
                    <div class="dictionary-list words">
                        <span class="dictionary-list eng-word">ability</span>
                        <span class="dictionary-list ru-word">физическая возможность</span>
                    </div>
                    <div class="dictionary-list icon">
                        <img class="trash" src="../icons/trash.png" alt="trash">
                    </div>
                </div>
    `
  }
}