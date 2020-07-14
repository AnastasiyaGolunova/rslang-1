import '../css/style.css';
import '../css/sprint.css';
import {refreshLogin} from './basic/refresh';
import Header from './header'
import Menu from './basic/menu';
const header = new Header();
import './sprint/components/start_page'
import './sprint/components/timer'
import './sprint/components/game_page'
import './sprint/data/get_data'
import './sprint/helpers/show_word'


import { createTimer } from './sprint/components/timer'

import { gamePageInit } from './sprint/components/game_page'
import { statisticsPageInit } from './sprint/components/statistics_page'

(async () => {
    await refreshLogin();
      header.render();
      const body = document.querySelector('body');
      new Menu(body);  
})();

document.querySelector('.start-btn').addEventListener('click', ()=>{
  document.querySelector('.start-page').classList.add('hidden');
  gamePageInit()
  createTimer(document.querySelector('.game-page__header'));
  statisticsPageInit()
  console.log("HELLO")
})

document.addEventListener('click', (e)=> {
  let startPage = document.querySelector('.start-page')
  let gamePage = document.querySelector('.game-page')
  let statisticsPage = document.querySelector('.statistics-page');


  if(e.target === document.querySelector('.return-btn')) {
    console.log('refresh')
    gamePage.remove()
    statisticsPage.remove()
    startPage.classList.remove('hidden')
  }
})
