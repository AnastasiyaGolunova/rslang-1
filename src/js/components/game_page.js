import { showWord, showTranslate } from '../helpers/show_card'
import {easy, medium, hard} from '../data/get_data'

function gamePageInit() {
  const gamePage = document.createElement('DIV')
  gamePage.classList.add('game-page')
  gamePage.innerHTML = `
      <div class="game-page__header">
        <div class="game-page__points">
          <div class="rate"> 
            <span class="description">Очков за слово:</span> <span class="points">+10</span>
          </div>
          <div class="score"> 
            <span>1000</span>
          </div>
        </div>    
      </div>
      <div class="word-section">
        <div class="word">${showWord(easy)}</div>
        <div class="translate">${showTranslate(easy)}</div>
      </div>
      <div class="button-wrapper" id="game-controls">
        <button class="wrong-btn btn"><i class="far fa-arrow-alt-circle-left"></i> Верно</button>
        <button class="wright-btn btn">Неверно <i class="far fa-arrow-alt-circle-right"></i></button>
      </div>`
  document.querySelector('.wrapper').append(gamePage)
}


export{ gamePageInit }
