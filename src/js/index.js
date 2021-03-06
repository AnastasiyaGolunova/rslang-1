import '../css/index.css';
import '../css/style.css';
import '../css/game.css';
import '../css/start.css';
import '../css/fonts.css';
import '../css/message.css';
import Header from './header'
import { getStudy } from './basic/study';
import Cards from './basic/cards';
import Menu from './basic/menu';
import { getTrash } from './basic/trash';
import {refreshLogin} from './basic/refresh';
import User from './basic/user';
const study = getStudy();
const card = new Cards();
const header = new Header();
const trash = getTrash();
const user = new User();


(async () => {
  const isOk = await refreshLogin();
    if (isOk) {
      header.render();
      const body = document.querySelector('body');
      new Menu(body);
      card.renderStartPage();  
    }
})();

export {study, card, header, trash, user}