import {easy, medium, hard} from '../data/get_data'

let num = 0

function showWord(obj) {
  let word = obj.words[num]
  // num += 1;
  // console.log(word)
  return word
}

function showTranslate(obj) {
  let translate = obj.translate[num]
  num += 1;
  return translate
}


document.addEventListener('click', (e)=>{
  console.log()
  if (e.target.parentNode == document.getElementById('game-controls')) {
    document.querySelector('.word').innerHTML = showWord(easy)
    document.querySelector('.translate').innerHTML = showTranslate(easy) 
  }
})

export {showWord, showTranslate}
