import '../css/game.css';
import '../css/dictionary.css';
import '../css/style.css';
import Header from './header';
import Trash from './basic/trash';
import Menu from './basic/menu';
const header = new Header();
const trash = new Trash();


trash.init();

const renderDictionary = async() => {
    header.render();
    trash.removeWords = await trash.getDifficultWord('delete');
    trash.difficultWords = await trash.getDifficultWord('difficult');
    console.log(trash.removeWords)
    console.log(trash.difficultWords);
    trash.allWords = trash.removeWords.concat(trash.difficultWords);
    trash.allWords.forEach(element => {
        trash.renderCard(element);
    });
    const settings = document.querySelector('#settings');
    const gameWrap = document.querySelector('.game-wrap');
    new Menu(settings);
    new Menu(gameWrap);
}

renderDictionary();
// 

// console.log(trash.remove())



