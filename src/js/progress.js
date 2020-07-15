import '../css/style.css';
import { refreshLogin } from './basic/refresh';
import Header from './header'
import Menu from './basic/menu';
const header = new Header();

// (async () => {
//     const isOk = await refreshLogin();
//     if (isOk) {
//         header.render();
//         const body = document.querySelector('body');
//         new Menu(body); 
//     }
// })();

const dayProgress = document.querySelector('.dayProgress');
const difficultProgress = document.querySelector('.difficultProgress');
const wordCount = document.querySelector('.word-count');
const difficultWords = document.querySelector('.difficultWords');
const dayWords = document.querySelector('.dayWords');
const userID = localStorage.getItem('userId');
const token = localStorage.getItem('token');
const URL = `https://afternoon-falls-25894.herokuapp.com/users/${userID}/words`;
const settingsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userID}/settings`;

export default function getStatistic() {

    async function getWordsStatisctic() {

        const rawResponse = await fetch(URL,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
        const content = await rawResponse.json();
        let statisticTotal = Object.keys(content).length;
        wordCount.innerHTML = `<span>${statisticTotal}/600</span>`;
    };

    async function getDayWordsStatisctic() {

        const rawResponse = await fetch(settingsURL,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
        const content = await rawResponse.json();
        dayWords.innerHTML = `<span class="balance">Осталось: ${content.optional.countNew}</span>`;
        let progressValue = Number((`${content.optional.countNew}` / `${content.wordsPerDay}`) * 100);
        dayProgress.setAttribute("value", progressValue);
    };

    async function getDifficultWordsStatisctic() {

        const rawResponse = await fetch(URL,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
        const content = await rawResponse.json();
        let statisticDifficultTotal = Object.keys(content).length;
        let statisticDifficult = 0;
        for (let word in content) {
            if (content[word].difficulty === "difficult") {
                statisticDifficult++;
            }
        }
        difficultWords.innerHTML = `<span class="balance">Осталось: ${statisticDifficult}</span>`;
        let progressValue = Number((`${statisticDifficult}` / `${statisticDifficultTotal}`) * 100);
        difficultProgress.setAttribute("value", progressValue);
    };

    getWordsStatisctic();
    getDayWordsStatisctic();
    getDifficultWordsStatisctic();

}

getStatistic();

