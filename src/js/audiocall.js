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

wrongSound.setAttribute("src", "mp3/wrong.mp3");
correctSound.setAttribute("src", "mp3/correct.mp3");
let roundNumber = 0;
let errorCount = 0;
let correctAnswersCount = 0;
function startGame() {
  startButton.classList.add("hide");
  leoImage.classList.add("hide");
  description.classList.add("hide");
  answerButtons.classList.remove("hide");
  audioCall.classList.remove("hide");
  dontKnowButton.classList.remove("hide");
  soundImage.classList.remove("hide");
  getData();
};
startButton.addEventListener("click", startGame);
restartButton.onclick = () => {
  window.location.reload();
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
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
};
function selectAnswer(element) {
  const selectedButton = element.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  dontKnowButton.classList.add("hide");
  nextButton.classList.remove("hide");
  if (correct) {
    correctSound.play();
    console.log(correctSound);
    correctAnswersCount++;
    console.log("corrects = ", correctAnswersCount);
  } else {
    wrongSound.play();
    errorCount++;
    console.log("errors = ", errorCount);
  }
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
  errorCount++;
  wrongSound.play();
  console.log("errors = ", errorCount);
};
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
};
function getData() {
  let group = select.options[select.selectedIndex].value;
  let url = `${urlApi}?page=${getRandomInt(30)}&group=${group}`;
  fetch(url)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      let i = getRandomInt(20);
      console.log(i);
      let soundSrc = data[i].audio;
      let imageSrc = data[i].image;
      let correctAnswer = data[i].wordTranslate;
      let answerTranscription = data[i].transcription;
      let answer = data[i].word;
      playAgain.push({ srcWord: `${soundSrc}`, word: `${correctAnswer}` });
      let pageSoundUrl = `${dataUrl}${soundSrc}`;
      let pageImageUrl = `${dataUrl}${imageSrc}`;
      console.log(pageImageUrl);
      data.splice(i, 1);
      let newData = data;
      console.log(newData);
      let j = getRandomInt(16);
      console.log(j);
      let firstWord = newData[j].wordTranslate;
      let secondWord = newData[j + 1].wordTranslate;
      let thirdWord = newData[j + 2].wordTranslate;
      let forthWord = newData[j + 3].wordTranslate;
      let answers = [
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
      console.log(answers);
      console.log(firstWord, secondWord, thirdWord, forthWord);
      console.log(pageImageUrl);
      console.log(pageSoundUrl);
      console.log(correctAnswer);
      audioCall.setAttribute("src", `${pageSoundUrl}`);
      audio.play();
      correctWordImage.setAttribute("src", `${pageImageUrl}`);
      answerText.innerText = `${answer} - ${answerTranscription} - ${correctAnswer}`;
    });
};
function showStatistics() {
  switch (errorCount) {
    case 0:
      userLevel.innerText = `Отличная работа!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, 0 на изучении. `;
      break;
    case 1:
    case 2:
      userLevel.innerText = `Хорошо!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
      break;
    case 3:
    case 4:
      userLevel.innerText = `Неплохо!`;
      userScore.innerText = `${correctAnswersCount} слов изучено, ${errorCount} на изучении. `;
      break;
    case 5:
    case 6:
      userLevel.innerText = `Еще немного и ты справишься!`;
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
    console.log(playAgain);
  });
};
dontKnowButton.addEventListener("click", setCorrectAnswer);
nextButton.onclick = () => {
  for (let i = 0; i < 5; i++) {
    let elem = document.getElementById("engbtn");
    elem.parentNode.removeChild(elem);
  }
  dontKnowButton.classList.remove("hide");
  nextButton.classList.add("hide");
  soundImage.classList.remove("hide");
  correctWordImage.classList.add("hide");
  answerText.classList.add("hide");
  roundNumber++;
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
