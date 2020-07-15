import "../css/style.css";
import "../css/savannah.css";
import {refreshLogin} from './basic/refresh';
import Header from './header'
import Menu from './basic/menu';
const header = new Header();

(async () => {
    const isOk = await refreshLogin();
    if (isOk) {
        header.render();
        const body = document.querySelector('body');
        new Menu(body); 
        await import("./savannah/gameSavannah"); 
    }
})();
