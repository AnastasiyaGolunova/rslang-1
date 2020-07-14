import { easy, medium, hard} from '../data/get_data'
import { renderTranslate} from './game_process'

let num = 0

function showWord(obj) {
  let word = obj.words[num]
  // cardInfo.word = word
  return word
}

function showTranslate(obj) {
  let translate = obj.translate[num]
  // cardInfo.correctTranslate = translate;
  num += 1;
  return translate
}




document.addEventListener('click', (e)=>{
  if (e.target.parentNode == document.getElementById('game-controls')) {
    let word = document.querySelector('.word')
    word.innerHTML = word.dataset.word = showWord(easy);
    document.querySelector('.translate').innerHTML = renderTranslate(easy);
  }
})

export { showWord, showTranslate }
