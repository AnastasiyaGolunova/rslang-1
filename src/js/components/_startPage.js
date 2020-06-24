//start page creation

const startPage = document.createElement("div");

startPage.classList.add("page-wrapper");

startPage.innerHTML = `<div class="start-page">
<h2 class="header-block">САВАННА</h2>
<div class="levelSettings">
            <p class="level__text">Выбери свой уровень </p>
            <select class="level radio-toolbar" id="level">
                <option value="0">A1</option>
                <option value="1">A2</option>
                <option value="2">B1</option>
                <option value="3">B2</option>
                <option value="4">C1</option>
                <option value="5">C2</option>
            </select>
        </div>
<div class="body-block"><p>Тренировка Саванна развивает словарный запас. <br> Чем больше слов ты знаешь, тем больше очков опыта получишь.</p></div>

<img class="game-icon" src="img/savannah-icon.svg"></img>
<div class="button-wrapper">
<button class="start-btn">Начать</button>
</div>
</div>`;
document.body.prepend(startPage);

//Start button click
const startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", () => {
  document.querySelector(".body-block").classList.toggle("hidden");

  //timer
  function timer(from, to) {
    let current = from;

    startPage.innerHTML = `
    <div class="game-page">

    <div class="timer">
    <div class="circle-timer">
        <div class="timer-slot">
            <div class="timer-lt"></div>
        </div>
        <div class="timer-slot">
            <div class="timer-rt"></div>
        </div>
        <div class="count"></div>
    </div>
  </div>
  </div>`;

    const timerId = setInterval(function () {
      document.querySelector(".count").innerHTML = current;
      if (current == to) {
        clearInterval(timerId);
        startGame();
      }
      current--;
    }, 1000);
  }
  timer(3, 0);
});
