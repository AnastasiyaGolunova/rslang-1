const startPage = document.createElement('div');
startPage.classList.add('wrapper')

startPage.innerHTML =  `<div class="start-page">
    <h2 class="game-name">Sprint</h2>
    <img class="game-icon" src="img/sprint-icon.svg"></img>
    <p class="game-rules hidden"> Перед Вами слово на английском языке и перевод. Ваша задача определить принадлежит ли перевод этому слову. И помните, что у Вас в распоряжении всего 60 секунд. Наслаждайтесь...</p>
    <div class="button-wrapper">
      <button class="rules-btn btn">Правила</button>
      <button class="start-btn btn">Выбор режима</button>
    </div>
  </div>`

document.body.append(startPage);

const rulesButton = document.querySelector('.rules-btn')

rulesButton.addEventListener('click', ()=>{
  document.querySelector('.game-rules').classList.toggle('hidden')
})