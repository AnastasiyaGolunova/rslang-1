import { easy, medium, hard} from '../data/get_data'
import { renderTranslate } from './choose_answer'

let num = 0

function showWord(obj) {
  let word = obj.words[num]
  return word
}

function showTranslate(obj) {
  let translate = obj.translate[num]
  num += 1;
  return translate
}




document.addEventListener('click', (e)=>{
  if (e.target.parentNode == document.getElementById('game-controls')) {
    document.querySelector('.word').innerHTML = showWord(easy)
    document.querySelector('.translate').innerHTML = renderTranslate(easy);
  }
})

export { showWord, showTranslate }
