let studyInstance = null;

export const getCard = () => {
  if (!studyInstance) {
    studyInstance = new Cards();
  }
  return studyInstance;
}

import { getStudy } from './study';
const study = getStudy();

export default class Cards {
  
  render(words) {
    // console.log(allCards)
    const {textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate,image} = words;
    study.currentWord = word;
    console.log(transcription,word,wordTranslate)
    console.log(`${study.urlData}`);
  
    const replaceExample = study.findWordInText(word, textExample);
    const replaceMeaning = study.findWordInText(word, textMeaning);

    let spanLetter = '';

    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        const span = `<span index="${i}">${letter}</span>`;
        spanLetter += span;
    }

    console.log(spanLetter);
  
    const card = `<div class='word-example example'>${replaceExample}</div>
                    <div class='word-example example-translation none'>${textExampleTranslate}</div>
                    <div class='word-input'>
                        <span class="word-background hidden">${spanLetter}</span>
                        <span class="word-container hidden">${spanLetter}</span>
                        <input data-action="answerInput" type='text' class='answer-input input-word' maxlength="50" 
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" autofocus>
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
    const width = document.querySelector('.word-container');

    const wordInput = document.querySelector('.word-input');
    wordInput.style.width = `${width.offsetWidth}px`;
    console.log(width.offsetWidth)
  };

  renderGameWrapper(){
        const gameContent = `
        <div class="game-close">
            <img class="delete" src="./icons/delete.png" alt="delete">
        </div>
         <div class="game-header">
            <div class="game-icon">
                <img class="voice" src="./icons/voice.png" alt="voice">
            </div>
            <div class="game-spelling">
                <input data-action="autoPlay" type="checkbox" class="autoplay" id="switch" />
                <label for="switch" class="spelling-check"></label>
                <span class="spelling-text">Автопроизношение</span>
            </div>
            <div class="card-number">
                <span>1/10</span>
            </div>
        </div>
        <div class="game-content">
        </div>
        <div class="word-example game-footer">
            <div class="delete-icon" data-title="Удалить слово">
                <img data-action="trash" class="trash" src="./icons/trash.png" alt="trash">
            </div>
            <div class="difficult-icon" data-title="Добавить в сложные слова">
                <img data-action="difficult" class="answers" src="./icons/answers.png" alt="answers">
            </div>
            <div class="buttons card-button">
                <button data-action="answer" class="btn btn-answer">Ответ</button>
                <button data-action="send" class="btn btn-enter">Enter</button>
                <button data-action="next" class="btn btn-next">Далее &#8594</button>
            </div>
        </div>
        `
      
        const GAME_WRAP = document.querySelector('.game-wrap');
      
        GAME_WRAP.innerHTML = gameContent;
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
                        <div class='word-input word-container'>
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