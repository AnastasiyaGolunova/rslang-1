import '../css/style.css';
import '../css/sprint.css';
import './components/start_page'
import './components/timer'
import './components/game_page'
import './data/get_data'
import './helpers/show_word'


import { createTimer } from './components/timer'

import { gamePageInit } from './components/game_page'
import { statisticsPageInit } from './components/statistics_page'

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


//createTimer(document.querySelector('.game-page'))