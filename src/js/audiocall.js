import '../css/audiocall.css';
const urlApi = "https://afternoon-falls-25894.herokuapp.com/words";
const dataUrl =
  "https://raw.githubusercontent.com/natalypoida/rslang-data/master/";
const startButton = document.querySelector("#start-button");
const answerButtons = document.querySelector("#answer-buttons");
const dontKnowButton = document.querySelector("#dont-know-button");
const audioCall = document.querySelector("#audio");
const leoImage = document.querySelector("#leo");
const description = document.querySelector("#description");
const select = document.querySelector("#select");
const soundImage = document.querySelector("#sound");
const correctWordImage = document.querySelector("#correct-image");
const nextButton = document.querySelector("#next-button");
const answerText = document.querySelector("#correct-answer");
const statisticsPage = document.querySelector("#statistics");
const userLevel = document.querySelector("#great");
const userScore = document.querySelector("#score");
const statisticsAudio = document.createElement("div");
const playAgain = [];
const restartButton = document.querySelector("#restart");
const studyButton = document.querySelector("#study");
const correctSound = document.createElement("audio");
const wrongSound = document.createElement("audio");
wrongSound.setAttribute("src", "audio/wrong.mp3");
correctSound.setAttribute("src", "audio/correct.mp3");
let roundNumber = 0;
let errorCount = 0;
let correctAnswersCount = 0;
let changeBackgroundColor = 70;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function changeColor() {
  document.body.style.backgroundColor = `hsl(201, 45%, ${changeBackgroundColor}%)`;
  changeBackgroundColor -=5;
}
nextButton.addEventListener('click', changeColor);
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
studyButton.onclick = () => {
  window.location.href = './html/main.html';
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
    answerText.classList.remove("hide");
    correctWordImage.classList.remove("hide");
    soundImage.classList.add("hide");
  }
}

function selectAnswer(element) {
  const selectedButton = element.target;
  const { correct } = selectedButton.dataset;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  dontKnowButton.classList.add("hide");
  nextButton.classList.remove("hide");
  if (correct) {
    correctSound.play();
    correctAnswersCount += 1;
  } else {
    wrongSound.play();
    errorCount += 1;
  }
}

function getData() {
  const group = select.options[select.selectedIndex].value;
  const url = `${urlApi}?page=${getRandomInt(30)}&group=${group}`;
  fetch(url)
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      const i = getRandomInt(20);
      const soundSrc = data[i].audio;
      const imageSrc = data[i].image;
      const correctAnswer = data[i].wordTranslate;
      const answerTranscription = data[i].transcription;
      const answer = data[i].word;
      playAgain.push({ srcWord: `${soundSrc}`, word: `${correctAnswer}` });
      const pageSoundUrl = `${dataUrl}${soundSrc}`;
      const pageImageUrl = `${dataUrl}${imageSrc}`;
      data.splice(i, 1);
      const newData = data;
      const j = getRandomInt(16);
      const firstWord = newData[j].wordTranslate;
      const secondWord = newData[j + 1].wordTranslate;
      const thirdWord = newData[j + 2].wordTranslate;
      const forthWord = newData[j + 3].wordTranslate;
      const answers = [
        { text: `${correctAnswer}`, correct: true },
        { text: `${firstWord}`, correct: false },
        { text: `${secondWord}`, correct: false },
        { text: `${thirdWord}`, correct: false },
        { text: `${forthWord}`, correct: false },
      ];
      shuffle(answers);
      answers.forEach((element) => {
        const button = document.createElement("button");
        button.innerText = element.text;
        button.setAttribute("id", "engbtn");
        button.classList.add("button");
        if (element.correct) {
          button.dataset.correct = element.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
      });
      audioCall.setAttribute("src", `${pageSoundUrl}`);
      audioCall.play();
      correctWordImage.setAttribute("src", `${pageImageUrl}`);
      answerText.innerText = `${answer} - ${answerTranscription} - ${correctAnswer}`;
    });
}

function startGame() {
  startButton.classList.add("hide");
  leoImage.classList.add("hide");
  description.classList.add("hide");
  answerButtons.classList.remove("hide");
  audioCall.classList.remove("hide");
  dontKnowButton.classList.remove("hide");
  soundImage.classList.remove("hide");
  getData();
}
startButton.addEventListener("click", startGame);
restartButton.onclick = () => {
  window.location.reload();
};

function setCorrectAnswer() {
  correctWordImage.classList.remove("hide");
  nextButton.classList.remove("hide");
  soundImage.classList.add("hide");
  dontKnowButton.classList.add("hide");
  answerText.classList.remove("hide");
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  errorCount += 1;
  wrongSound.play();
}

function showStatistics() {
  switch (errorCount) {
    case 0:
      userLevel.innerText = `Отличный результат!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, 0 на изучении. `;
      break;
    case 1:
    case 2:
      userLevel.innerText = `Хороший результат!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
      break;
    case 3:
    case 4:
      userLevel.innerText = `Неплохо!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
      break;
    case 5:
    case 6:
      userLevel.innerText = `Старайся!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
      break;
    case 7:
    case 8:
    case 9:
      userLevel.innerText = `Ты можешь лучше!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
      break;
    default:
      userLevel.innerText = `Не сдавайся!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
  }
  playAgain.forEach((element) => {
    const audioItem = document.createElement("audio");
    audioItem.setAttribute("src", `${dataUrl}${element.srcWord}`);
    audioItem.setAttribute("controls", "controls");
    const audioFigure = document.createElement("figure");
    audioFigure.setAttribute("class", "audio-figure");
    const audioFigcaption = document.createElement("figcaption");
    audioFigcaption.innerText = `${element.word}`;
    statisticsAudio.setAttribute("class", "audio-div");
    audioFigure.appendChild(audioFigcaption);
    audioFigure.appendChild(audioItem);
    statisticsAudio.appendChild(audioFigure);
    statisticsPage.appendChild(statisticsAudio);
    restartButton.classList.remove("hide");
    studyButton.classList.remove("hide");
  });
}
dontKnowButton.addEventListener("click", setCorrectAnswer);
nextButton.onclick = () => {
  for (let i = 0; i < 5; i += 1) {
    const elem = document.getElementById("engbtn");
    elem.parentNode.removeChild(elem);
  }
  dontKnowButton.classList.remove("hide");
  nextButton.classList.add("hide");
  soundImage.classList.remove("hide");
  correctWordImage.classList.add("hide");
  answerText.classList.add("hide");
  roundNumber += 1;
  if (roundNumber === 10) {
    statisticsPage.classList.remove("hide");
    nextButton.classList.add("hide");
    soundImage.classList.add("hide");
    dontKnowButton.classList.add("hide");
    showStatistics();
  } else {
    getData();
  }
};
