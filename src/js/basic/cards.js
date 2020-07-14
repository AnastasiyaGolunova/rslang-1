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
    console.log(words);
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
                        <form action="#" id="senddata">
                          <input data-action="answerInput" type='text' class='answer-input input-word' maxlength="50" 
                          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" autofocus>
                        </form>
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
                <button type="submit" data-action="send" form="senddata" class="btn btn-enter">Далее &#8594</button>
            </div>
        </div>
        `

        const GAME_WRAP = document.querySelector('.game-wrap');

        GAME_WRAP.innerHTML = gameContent;
  }

  renderStartPage() {
    const startPage = `
    <div class="start-wrap">
        <div class="start-description">
          <h2>Правила изучения слов</h2>
            <ul>
              <li>Новые слова - слова которые вы не изучали</li>
              <li>Слова для повтора - слова в которых вы допустили ошибки при изучений новых слов</li>
              <li>Выученные слова - слова в которых вы не допустили ошибок</li>
            </ul>
          <p>Перед тем как нажать кнопку <b>"Начать обучение"</b>, выберите необходимые настроики в меню.</p>
          <p>Что бы изучить новые слова вам необходимо в настроиках выбрать количество новых слов и количество карточек, 
          чем больше новых слов будет выбрано тем меньше слов для повтора.</p>
          <p>Что бы изучить больше слов для повтора необходимо в настроиках выбрать меньше новых слов, а количество карточек больше.</p>
          <p>Если вы уже изучали слова сегодня, намжите кнопку "Начать обучение".</p>
          <p>Количество новых слов и количество карточек можно выбрать один раз в день</p>
          <a href="https://github.com/omirbeck/rslang">Репозиторий проекта</a>
        </div>
        <div class="description_btn">
          <button data-action="start" class="btn start-btn">Начать обучение</button>
        </div>
    </div>
        `
    const GAME_WRAP = document.querySelector('.game-wrap');

    GAME_WRAP.innerHTML = startPage;
  }

  renderCardCount(number, allCount) {
    const cardCount = `
                <span>${number}/${allCount}</span>
                `
    const CARD_NUMBER = document.querySelector('.card-number');

    CARD_NUMBER.innerHTML = cardCount;
  }
}
