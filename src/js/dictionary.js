import '../css/dictionary.css';
import '../css/style.css';
import Header from './header';
import Trash from './basic/trash';
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
}

renderDictionary();
// 

// console.log(trash.remove())



