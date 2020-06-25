//game page creation
let stat = 0;
let error = 0;

let learnedWords = [];
let newWords = [];

function startGame() {
  document.querySelector(".timer").classList.toggle("hidden");

  //Q&A block, heart block creation
  const gamePage = document.createElement("div");
  gamePage.classList.add("page-wrapper");
  gamePage.innerHTML = ` <div class="game-page">
  <div class="wrap-game" id="wrap-game">
  <div class="rating">
  <div class="star-success"></div>
    <div class="star-success"></div>
    <div class="star-success"></div>
    <div class="star-success"></div>
    <div class="star-success"></div></div>
</div>
  <div class="words">
  <div class="question">
      <p class="word"></p>
  </div>
  <div class="item">
      <button class="translation" id='answerBtn'></button>
      <button class="translation2" id='answerBtn'></button>
      <button class="translation3" id='answerBtn'></button>
      <button class="translation4" id='answerBtn'></button>
  </div>
  </div>
  <div class="translations">
  <div class="answers"></div>
  </div>
  
  </div>`;
  document.body.append(gamePage);
  loadGame();
  animateGame();
}

let right_translation = document.querySelector(".translation");
//change answers order
function changeAnswersOrder() {
  let time = Math.floor(Math.random() * Math.floor(4));
  let time2 = Math.floor(Math.random() * Math.floor(4));
  let time3 = Math.floor(Math.random() * Math.floor(4));
  let time4 = Math.floor(Math.random() * Math.floor(4));

  const answerOrder = document.querySelector(".translation");
  answerOrder.style.setProperty("order", time);

  const answerOrder2 = document.querySelector(".translation2");
  answerOrder2.style.setProperty("order", time2);

  const answerOrder3 = document.querySelector(".translation3");
  answerOrder3.style.setProperty("order", time3);

  const answerOrder4 = document.querySelector(".translation4");
  answerOrder4.style.setProperty("order", time4);
}

let group = level.addEventListener("change", function () {
  localStorage.setItem("level", this.value);
});

//load word & answer options
function loadGame() {
  const wordToTranslate = document.querySelector(".word");
  let right_translation = document.querySelector(".translation");
  const getWords = async (page, group) => {
    try {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  let count = Math.floor(Math.random() * Math.floor(20));

  const loadWord = async () => {
    const getRandomNum = Math.floor(Math.random() * Math.floor(30));
    const group = localStorage.getItem("level") || 0;
    const data = await getWords(getRandomNum, group);
    let { word, wordTranslate } = data[count];
    console.log(word, wordTranslate, group);
    wordToTranslate.innerHTML = word;
    right_translation.innerHTML = wordTranslate;
  };
  changeAnswersOrder();
  loadWord();

  //load wrong answer options
  const loadWrongTranslations = async () => {
    const getRandomNum = Math.floor(Math.random() * Math.floor(30));
    const group = localStorage.getItem("level") || 0;
    const data = await getWords(getRandomNum, group);
    const translation2 = document.querySelector(".translation2");
    const translation3 = document.querySelector(".translation3");
    const translation4 = document.querySelector(".translation4");
    translation2.innerHTML =
      data[Math.floor(Math.random() * Math.floor(20))].wordTranslate;
    translation3.innerHTML =
      data[Math.floor(Math.random() * Math.floor(20))].wordTranslate;
    translation4.innerHTML =
      data[Math.floor(Math.random() * Math.floor(20))].wordTranslate;
  };
  loadWrongTranslations();
}

//animation & buttons click logic
function animateGame() {
  let pos = 0;
  let id = setInterval(frame, 13);
  let elem = document.querySelector(".star-success");
  let target = document.querySelector(".word");

  function frame() {
    if (pos == 550) {
      clearInterval(id);
      getIncorrectChoice();
      animateGame();
      //console.log(pos);
    } else {
      if (elem) {
        pos++;
        //console.log(pos);
        target.style.top = pos + "px";
      }
    }
  }

  //right&wrong answers counter, buttons click logic

  function getCorrectChoice() {
    let right_translation = document.querySelector(".translation");

    right_translation.onclick = function (event) {
      // play audio of correct click
      let audio = new Audio();
      audio.src = "/src/audio/correct.mp3";
      audio.autoplay = true;
      clearInterval(id);
      pos = 0;
      id = setInterval(frame, 13);
      loadGame(event);
      stat++;
    };
  }

  //incorrect choice
  function getIncorrectChoice() {
    // play audio & change picture of wrong click
    const rating = document.querySelector(".rating");
    let elem = document.querySelector(".star-success");

    let audio = new Audio();
    audio.src = "/src/audio/error.mp3";
    audio.autoplay = true;

    if (elem) {
      elem.remove();
      rating.innerHTML += `<div class="star-error"></div>`;
      loadGame();

      console.log(error);
    } else {
      clearInterval(id);
      //alert("GAME OVER" + " Correct answers: " + stat);
      getStatistics();
    }
  }

  function selectWrong2() {
    document.querySelector(".translation2").onclick = function (event) {
      clearInterval(id);
      pos = 0;
      id = setInterval(frame, 13);
      getIncorrectChoice();
      error++;
    };
  }

  function selectWrong3() {
    document.querySelector(".translation3").onclick = function (event) {
      clearInterval(id);
      pos = 0;
      id = setInterval(frame, 13);
      getIncorrectChoice();
      error++;
      right_translation;
    };
  }

  function selectWrong4() {
    document.querySelector(".translation4").onclick = function (event) {
      clearInterval(id);
      pos = 0;
      id = setInterval(frame, 13);
      getIncorrectChoice();
      error++;
    };
  }

  function res() {
    let elem = document.querySelector(".star-success");
    if (elem) {
      getCorrectChoice();
      selectWrong2();
      selectWrong3();
      selectWrong4();
    } else {
      //clearInterval(id);
      console.log(error);
      console.log(stat);
      getStatistics();
      //alert("GAME OVER" + " Correct answers: " + stat);
    }
  }
  res();
}

//Statistic page
function getStatistics() {
  const statictics = document.createElement("div");
  statictics.classList.add("page-wrapper");
  statictics.innerHTML = `
    <div class="statistics-page">
    <h2 class="header-block">изучено слов: ${stat}</h2>
    <div class="body-block"></div>
    <div class="button-wrapper">
<button class="continue-btn">продолжить тренировку</button>
</div>
</div>`;

  document.body.append(statictics);

  //Continue button click
  const continueBtn = document.querySelector(".continue-btn");
  continueBtn.addEventListener("click", () => {
    function timer(from, to) {
      let current = from;

      document.body.innerHTML = `
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
}
