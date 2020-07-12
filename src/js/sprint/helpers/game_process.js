import { showTranslate } from './show_word'

let cardInfo = {
  correctCost: 10,
  correctChain: 0,
}

function renderTranslate(obj) {
  let correctTranslate = showTranslate(obj);

  let translatesArr = obj.translate;
  let translatesCount = translatesArr.length;

  let randomElemNumber = Math.round(Math.random() * translatesCount);
  let randomTranslate = translatesArr[randomElemNumber];
  let rendered = [correctTranslate, randomTranslate][Math.round(Math.random())]
  
  cardInfo.isTrue = (rendered == correctTranslate);
  cardInfo.correctTranslate = correctTranslate;

  cardInfo.correctTranslate = correctTranslate
  return rendered
}

function addCorrectAnswer(points) {
  let score = +document.querySelector('.score span').innerHTML
  document.querySelectorAll('.score span').forEach(el => el.innerHTML = +score + points)
  document.querySelector('.score span').classList.add('answered')
  
  cardInfo.correctChain +=1;

  document.querySelector('.game-page').classList.add('correct')
  setTimeout(() => {
    document.querySelector('.game-page').classList.remove('correct');
    document.querySelector('.score span').classList.remove('answered')
  }, 150);



  if(cardInfo.correctChain % 4 === 0) {
    document.querySelector('.points').classList.add('up')
    setTimeout(()=> {
      let el = document.querySelector('.points')
      el.remove()

      cardInfo.correctCost *= 2;

      let newEl = document.createElement('SPAN');
      newEl.classList.add('points');
      newEl.innerHTML = `+${cardInfo.correctCost}`;

      document.querySelector('.rate').append(newEl)
    }, 500)
  }
}

function addWrongAnswer() {
  cardInfo.correctCost = 10;
  cardInfo.correctChain = 0;

  document.querySelector('.points').innerHTML = `+${cardInfo.correctCost}`;

  document.querySelector('.game-page').classList.add('wrong')
  setTimeout(() => {
    document.querySelector('.game-page').classList.remove('wrong')
  }, 100)

  document.querySelector('.points').classList.add('reset')
  setTimeout(() => {
    document.querySelector('.points').classList.remove('reset')
  }, 500)
}


document.addEventListener('click', (e)=>{
  if ((e.target === document.querySelector('.wright-btn') && cardInfo.isTrue) ||
      (e.target === document.querySelector('.wrong-btn') && !cardInfo.isTrue)) {
    addCorrectAnswer(cardInfo.correctCost);
    addSuccessToStatistics()
  }
  if ((e.target === document.querySelector('.wright-btn') && !cardInfo.isTrue) ||
      (e.target === document.querySelector('.wrong-btn') && cardInfo.isTrue)) {
    addWrongAnswer()
    addFailureToStatistics()
  }

})

function addFailureToStatistics() {
  let word = document.querySelector('.word');
  let failSection = document.querySelector('.fail')

  let row = document.createElement('DIV');
  row.classList.add('row');
  row.innerHTML = `
    <div class="word">${word.dataset.word}</div>
    <div class="translate">${cardInfo.correctTranslate}</div>`

  failSection.append(row);
  failSection.querySelector('.title span').innerHTML = +failSection.querySelector('.title span').innerHTML + 1
}

function addSuccessToStatistics() {
  let word = document.querySelector('.word');
  let successSection = document.querySelector('.success')

  let row = document.createElement('DIV');
  row.classList.add('row');
  row.innerHTML = `
    <div class="word">${word.dataset.word}</div>
    <div class="translate">${cardInfo.correctTranslate}</div>`

  successSection.append(row);
  successSection.querySelector('.title span').innerHTML = +successSection.querySelector('.success .title span').innerHTML + 1
}



export { renderTranslate }