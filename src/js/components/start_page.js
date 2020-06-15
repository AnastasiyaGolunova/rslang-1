const startPage = document.createElement('div');
startPage.classList.add('wrapper')

startPage.innerHTML =  `<div class="start-page">
    <h2 class="game-name">Sprint</h2>
    <img class="game-icon" src="img/sprint-icon.svg"></img>
    <p class="game-rules hidden"> You see English word and the translation, your task is to guess does this translation belong to the word. Remember you have only 60 seconds. Enjoy it...</p>
    <div class="button-wrapper">
      <button class="rules-btn">rules</button>
      <button class="start-btn">start</button>
    </div>
  </div>`

document.body.prepend(startPage);

const rulesButton = document.querySelector('.rules-btn')

rulesButton.addEventListener('click', ()=>{
  document.querySelector('.game-rules').classList.toggle('hidden')
})