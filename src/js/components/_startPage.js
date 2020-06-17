//start page creation

const startPage = document.createElement("div");

startPage.classList.add("page-wrapper");

startPage.innerHTML = `<div class="start-page">
<h2 class="header-block">Savannah</h2>
<div class="body-block"><p>The Savannah training helps you build your vocabulary. <br> The more words you know, the more experience
points
you'll get.</p></div>
<img class="game-icon" src="img/savannah-icon.svg"></img>
<div class="button-wrapper">
<button class="start-btn">start</button>
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
        document.querySelector(".circle-timer").classList.toggle("hidden");
        //loadGame();
      }
      current--;
    }, 1000);
  }
  timer(3, 0);
});
