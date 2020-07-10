<<<<<<< HEAD
import "../css/style.css";
import "../css/savannah.css";
import "./gameSavannah.js";
=======
import "../css/savannah.css";
// import "../css/style.css";
import "../audio/correct.mp3";
import "../audio/error.mp3";
import "./gameSavannah.js";

//import "./savannah_index.js";

//import "../css/style.css"; //correct

//import "../audio/correct.mp3";
//import "../audio/error.mp3";

//import "../img/";
//import "../js/components/_startPage";
//import "../js/components/_gameSavannah";ss

// const success = new Audio(correct);
// const fail = new Audio(wrong);

//test backend
///////////////////////////
const user = {
  email: "tatyana.korshun@gmail.com",
  password: "Qwerty123!@#",
};
//userLogin = loginUser(user);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmMzNGQ5YWFlNDcyMDAxNzk4YzE2ZiIsImlhdCI6MTU5NDMyMDcwNSwiZXhwIjoxNTk0MzM1MTA1fQ.EvsHVPFZeiGawCNyNzcPrtKpgseKjSoeJV0pRZD6qTQ";
const userId = "5efc34d9aae472001798c16f";
localStorage.setItem("token", token);
localStorage.setItem("userId", userId);

//sign_in
// const loginUser = async (user) => {
//   const rawResponse = await fetch(
//     "https://afternoon-falls-25894.herokuapp.com/signin",
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     }
//   );
//   const content = await rawResponse.json();

//   console.log(content);
// };

// loginUser({ email: "tatyana.korshun@gmail.com", password: "Qwerty123!@#" });
//////////////////////////////

// //start page creation

// const startPage = document.createElement("div");

// startPage.classList.add("page-wrapper");

// startPage.innerHTML = `<div class="start-page">
//   <h2 class="header-block">САВАННА</h2>
//   <div class="levelSettings">
//               <p class="level__text">Выбери свой уровень </p>
//               <select class="level radio-toolbar" id="level">
//                   <option value="0">A1</option>
//                   <option value="1">A2</option>
//                   <option value="2">B1</option>
//                   <option value="3">B2</option>
//                   <option value="4">C1</option>
//                   <option value="5">C2</option>
//               </select>
//           </div>
//   <div class="body-block"><p>Тренировка Саванна развивает словарный запас. <br> Чем больше слов ты знаешь, тем больше очков опыта получишь.</p></div>

//   <img class="game-icon" src="img/savannah-icon.svg"></img>
//   <div class="button-wrapper">
//   <button class="start-btn">Начать</button>
//   </div>
//   </div>`;
// document.body.prepend(startPage);

// //Start button click

// const startBtn = document.querySelector(".start-btn");
// startBtn.addEventListener("click", () => {
//   document.querySelector(".body-block").classList.toggle("hidden");

//   //timer
//   function timer(from, to) {
//     let current = from;

//     startPage.innerHTML = `
//       <div class="game-page">

//       <div class="timer">
//       <div class="circle-timer">
//           <div class="timer-slot">
//               <div class="timer-lt"></div>
//           </div>
//           <div class="timer-slot">
//               <div class="timer-rt"></div>
//           </div>
//           <div class="count"></div>
//       </div>
//     </div>
//     </div>`;

//     const timerId = setInterval(function () {
//       document.querySelector(".count").innerHTML = current;
//       if (current == to) {
//         clearInterval(timerId);
//         startGame();
//       }
//       current--;
//     }, 1000);
//   }
//   timer(3, 0);
// });

// //game page creation
// let stat = 0;
// let error = 0;
// let countWordId = [];
// let countGameWords = 0;
// const wordsLimit = 11;

// let hardWords = [];
// let hardWordsTranslate = [];
// let weakWords = [];

// function startGame() {
//   document.querySelector(".timer").classList.toggle("hidden");

//   //Q&A block, heart block creation
//   const gamePage = document.createElement("div");
//   gamePage.classList.add("page-wrapper");
//   gamePage.innerHTML = ` <div class="game-page">
//     <div class="wrap-game" id="wrap-game">
//     <div class="rating">
//     <div class="star-success"></div>
//       <div class="star-success"></div>
//       <div class="star-success"></div>
//       <div class="star-success"></div>
//       <div class="star-success"></div></div>
//   </div>
//     <div class="words">
//     <div class="question">
//         <p class="word"></p>
//     </div>
//     <div class="item">
//         <button class="translation" id='answerBtn'></button>
//         <button class="translation2" id='answerBtn'></button>
//         <button class="translation3" id='answerBtn'></button>
//         <button class="translation4" id='answerBtn'></button>
//     </div>
//     </div>
//     <div class="translations">
//     <div class="answers"></div>
//     </div>

//     </div>`;
//   document.body.append(gamePage);
//   stat = 0;
//   error = 0;
//   countWordId = [];
//   countGameWords = 0;
//   hardWords = [];
//   hardWordsTranslate = [];
//   weakWords = [];
//   loadGame();
//   //countGameWords < wordsLimit ? animateGame() : getStatistics();
//   animateGame();
// }

// let right_translation = document.querySelector(".translation");
// //change answers order
// function changeAnswersOrder() {
//   let time = Math.floor(Math.random() * Math.floor(4));
//   let time2 = Math.floor(Math.random() * Math.floor(4));
//   let time3 = Math.floor(Math.random() * Math.floor(4));
//   let time4 = Math.floor(Math.random() * Math.floor(4));

//   const answerOrder = document.querySelector(".translation");
//   answerOrder.style.setProperty("order", time);

//   const answerOrder2 = document.querySelector(".translation2");
//   answerOrder2.style.setProperty("order", time2);

//   const answerOrder3 = document.querySelector(".translation3");
//   answerOrder3.style.setProperty("order", time3);

//   const answerOrder4 = document.querySelector(".translation4");
//   answerOrder4.style.setProperty("order", time4);
// }

// let group = level.addEventListener("change", function () {
//   localStorage.setItem("level", this.value);
// });

// //load word & answer options

// function loadGame() {
//   const wordToTranslate = document.querySelector(".word");
//   let right_translation = document.querySelector(".translation");

//   //let arrayHard = [];
//   //Выгрузить hard слова юзера
//   async function getUserHardWord() {
//     const token = localStorage.getItem("token");
//     const userID = localStorage.getItem("userId");
//     console.log(token);
//     const rawResponse = await fetch(
//       `https://afternoon-falls-25894.herokuapp.com/users/${userID}/aggregatedWords?filter=%7B%22userWord.difficulty%22%3A%22hard%22%7D`,
//       {
//         method: "GET",
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }
//     );

//     const content = await rawResponse.json();
//     let results = content[0].paginatedResults;
//     console.log("Content:", content);
//     console.log("Results:", results); //есть word, wordTranslate, group [{},{},{}]

//     //Загрузить hard слово и корректный перевод

//     async function getWordToTranslate() {
//       let wordsRandom = Math.floor(Math.random() * Math.floor(results.length));
//       if (!countWordId.includes(results[wordsRandom]._id)) {
//         wordToTranslate.innerHTML = results[wordsRandom].word;
//         right_translation.innerHTML = results[wordsRandom].wordTranslate;
//         let hardWord = results[wordsRandom].word;
//         let hardWordTranslate = results[wordsRandom].wordTranslate;
//         hardWords.push(hardWord);
//         hardWordsTranslate.push(hardWordTranslate);

//         countWordId.push(results[wordsRandom]._id);
//       } else if (countWordId.length < results.length) {
//         getWordToTranslate();
//       } else if (countWordId.length === results.length) {
//         //getStatistics();
//         if (results.length < wordsLimit) {
//           if (countGameWords < wordsLimit) {
//             loadWord();
//           } else getStatistics();
//           //   else {getStatistics();
//           //   console.log(countGameWords);}
//         } else getStatistics();
//       }
//     }

//     countGameWords++;
//     getWordToTranslate();
//     console.log(countWordId);
//   }

//   getUserHardWord();

//   //getUserWords();

//   //Выгрузка блока любых слов
//   const getWords = async (page, group) => {
//     try {
//       const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       return data;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   };

//   //let count = Math.floor(Math.random() * Math.floor(20));
//   let count = Math.floor(Math.random() * Math.floor(3));

//   let countWord = 0;

//   //Выгрузка отдельного слова с переводом из слока любых слов
//   const loadWord = async () => {
//     if (countGameWords < 30) {
//       const getRandomNum = Math.floor(Math.random() * Math.floor(30));
//       const group = localStorage.getItem("level") || 0;
//       const data = await getWords(getRandomNum, group);
//       let { word, wordTranslate } = data[count];
//       console.log(word, wordTranslate, group);
//       wordToTranslate.innerHTML = word;
//       right_translation.innerHTML = wordTranslate;
//       hardWords.push(word);
//       hardWordsTranslate.push(wordTranslate);
//     }
//   };
//   changeAnswersOrder();

//   //   if (getUserWords.length < 30) {
//   //     console.log(getUserWords.length);
//   //     console.log(getUserWords.word);
//   //     loadWord();
//   //   }

//   //load wrong answer options
//   const loadWrongTranslations = async () => {
//     const getRandomNum = Math.floor(Math.random() * Math.floor(30));
//     const group = localStorage.getItem("level") || 0;
//     const data = await getWords(getRandomNum, group);
//     const translation2 = document.querySelector(".translation2");
//     const translation3 = document.querySelector(".translation3");
//     const translation4 = document.querySelector(".translation4");
//     translation2.innerHTML =
//       data[Math.floor(Math.random() * Math.floor(20))].wordTranslate;
//     translation3.innerHTML =
//       data[Math.floor(Math.random() * Math.floor(20))].wordTranslate;
//     translation4.innerHTML =
//       data[Math.floor(Math.random() * Math.floor(20))].wordTranslate;
//   };
//   loadWrongTranslations();
// }

// //animation & buttons click logic
// async function animateGame() {
//   let pos = 0;
//   let id = setInterval(frame, 13);
//   let elem = document.querySelector(".star-success");
//   let target = document.querySelector(".word");

//   function frame() {
//     if (pos == 550) {
//       clearInterval(id);
//       if (countGameWords < wordsLimit && error < 5) {
//         getIncorrectChoice();
//         animateGame();
//       }

//       //console.log(pos);
//     } else {
//       if (elem) {
//         pos++;
//         //console.log(pos);
//         target.style.top = pos + "px";
//       }
//     }
//   }

//   //right&wrong answers counter, buttons click logic

//   function getCorrectChoice() {
//     let right_translation = document.querySelector(".translation");

//     right_translation.onclick = function (event) {
//       // play audio of correct click
//       let audio = new Audio();
//       audio.src = "src/audio/correct.mp3";
//       audio.autoplay = true;
//       //   success.play();
//       clearInterval(id);
//       pos = 0;
//       id = setInterval(frame, 13);

//       loadGame(event);
//       stat++;
//     };
//   }

//   //incorrect choice
//   async function getIncorrectChoice() {
//     // play audio & change picture of wrong click
//     const rating = document.querySelector(".rating");
//     let elem = document.querySelector(".star-success");
//     error++;

//     let audio = new Audio();
//     audio.src = "src/audio/error.mp3";
//     audio.autoplay = true;
//     //fail.play();

//     if (elem && error < 5) {
//       elem.remove();
//       rating.innerHTML += `<div class="star-error"></div>`;
//       weakWords.push(hardWords.pop());
//       loadGame();

//       console.log(error);
//     } else if (error === 5) {
//       clearInterval(id);
//       weakWords.push(hardWords.pop());
//       //alert("GAME OVER" + " Correct answers: " + stat);
//       getStatistics();
//     }
//   }

//   function selectWrong2() {
//     document.querySelector(".translation2").onclick = function (event) {
//       clearInterval(id);

//       getIncorrectChoice();

//       pos = 0;
//       id = setInterval(frame, 13);
//     };
//   }

//   function selectWrong3() {
//     document.querySelector(".translation3").onclick = function (event) {
//       clearInterval(id);

//       getIncorrectChoice();

//       pos = 0;
//       id = setInterval(frame, 13);
//     };
//   }

//   function selectWrong4() {
//     document.querySelector(".translation4").onclick = function (event) {
//       clearInterval(id);

//       getIncorrectChoice();

//       pos = 0;
//       id = setInterval(frame, 13);
//     };
//   }

//   function res() {
//     let elem = document.querySelector(".star-success");
//     if (elem) {
//       getCorrectChoice();
//       selectWrong2();
//       selectWrong3();
//       selectWrong4();
//     } else {
//       console.log(error);
//       console.log(stat);
//       getStatistics();
//     }
//   }
//   res();
// }

// //Statistic page
// function getStatistics() {
//   document.querySelector(".game-page").classList.toggle(".hidden");
//   console.log(document.querySelector(".game-page"));
//   console.log(`Hardwords: ${hardWords}`);
//   console.log(`HardwordsTranslate: ${hardWordsTranslate}`);

//   let resultHardWord = `${hardWords.join(" ")}`;
//   let resultWeakWord = `${weakWords.join(" ")}`;

//   const statictics = document.createElement("div");
//   statictics.classList.add("page-wrapper");
//   statictics.innerHTML = `
//       <div class="statistics-page">
//           <h2 class="header-block">изучено слов: ${stat} на изучении: ${error}</h2>
//           <div class="body-statblock">${userScore}</div>
//           <div class="slider">
//               <input type="radio" name="switch" id="btn1" checked >
//               <input type="radio" name="switch" id="btn2" >

//               <div class="switch">
//                   <label for="btn1" id="s1"></label>
//                   <label for="btn2" id="s2"></label>
//               </div>

//               <div class="slider-inner">
//                   <div class="slides">
//                       <div class="one"><strong>Изученные слова:</strong> <br>${resultHardWord}</div>
//                       <div class="two"><strong>На изучении:</strong> <br>${resultWeakWord}</div>
//                   </div>
//               </div>
//           </div>

//           <div class="button-wrapper">
//               <button class="continue-btn">продолжить тренировку</button>
//           </div>

//       </div>

//   </div>`;

//   document.body.append(statictics);

//   //Change user text according to statictics
//   let userScore = document.querySelector(".body-statblock");
//   function analyzeUserScore() {
//     if (stat <= 5) {
//       userScore.innerText = `В этот раз не получилось, но продолжай тренироваться!`;
//     } else if (stat <= 15 && stat > 5) {
//       userScore.innerText = `Неплохо, но есть над чем поработать`;
//     } else {
//       userScore.innerText = `Поздравляем, отличный результат!`;
//     }
//   }
//   analyzeUserScore();

//   //Continue button click
//   const continueBtn = document.querySelector(".continue-btn");
//   continueBtn.addEventListener("click", () => {
//     //wordsLimit = 11;

//     function timer(from, to) {
//       let current = from;
//       document.body.innerHTML = `
//           <div class="game-page">

//           <div class="timer">
//           <div class="circle-timer">
//               <div class="timer-slot">
//                   <div class="timer-lt"></div>
//               </div>
//               <div class="timer-slot">
//                   <div class="timer-rt"></div>
//               </div>
//               <div class="count"></div>
//           </div>
//         </div>
//         </div>`;

//       const timerId = setInterval(function () {
//         document.querySelector(".count").innerHTML = current;
//         if (current == to) {
//           clearInterval(timerId);
//           startGame();
//         }
//         current--;
//       }, 1000);
//     }
//     timer(3, 0);
//   });
// }

//Change difficulty according to statistics
>>>>>>> 0f8eddc55d700194643463e074fbc251117c0880
