import '../css/style.css';

const dayProgress = document.querySelector('.dayProgress');
const difficultProgress = document.querySelector('.difficultProgress');
const wordCount = document.querySelector('.word-count');
const difficultWords = document.querySelector('.difficultWords');
const dayWords = document.querySelector('.dayWords');
const userID = localStorage.getItem('userId');
const URL = `https://afternoon-falls-25894.herokuapp.com/users/${userID}/words`;
const settingsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userID}/settings`;

export default function getStatistic() {

    function getWordsStatisctic() {
        fetch(URL)
            .then((result) => result.json())
            .then((statistic) => {
                let statisticTotal = Object.keys(statistic).length;
                wordCount.innerHTML = `<span>${statisticTotal}/600</span>`
            })
    }

    function getDayWordsStatisctic() {
        fetch(settingsURL)
            .then((result) => result.json())
            .then((statistic) => {
                dayWords.innerHTML = `<span class="balance">Осталось: ${statistic.optional.countNew}</span>`;
                let progressValue = Number((`${statistic.optional.countNew}` / `${statistic.wordsPerDay}`) * 100);
                dayProgress.setAttribute("value", progressValue);
            })
    }

    function getDifficultWordsStatisctic() {
        fetch(URL)
            .then((result) => result.json())
            .then((statistic) => {
                let statisticDifficultTotal = Object.keys(statistic).length;
                let statisticDifficult = 0;
                for (let word in statistic) {
                    if (statistic[word].difficulty === "difficult") {
                        statisticDifficult++;
                    }
                }
                difficultWords.innerHTML = `<span class="balance">Осталось: ${statisticDifficult}</span>`;
                let progressValue = Number((`${statisticDifficult}` / `${statisticDifficultTotal}`) * 100);
                difficultProgress.setAttribute("value", progressValue);
            })
    }

    getWordsStatisctic();
    getDayWordsStatisctic();
    getDifficultWordsStatisctic();

}

getStatistic();

