import {study} from '../index';

export default class Cards {
  
  render() {
    // console.log(allCards)
  
    const {textExample,textExampleTranslate,textMeaning,textMeaningTranslate,transcription,word,wordTranslate,audio,image} = study.wordsData[study.count];
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
}