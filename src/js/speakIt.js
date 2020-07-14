import '../css/style.css';
import '../css/speakit.css';
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
      import('./speak-it/startPage');
      import ('./speak-it/getData');
      import ('./speak-it/learn');
      import ('./speak-it/game');
      import ('./speak-it/restart'); 
  }
})();


// (async () => {
//     await refreshLogin();
//       header.render();
//       const body = document.querySelector('body');
//       new Menu(body);  
// })();


