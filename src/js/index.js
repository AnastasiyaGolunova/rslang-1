import '../css/style.css';
import '../js/components/start_page'
import '../js/components/timer'
import '../js/components/game_page'


import { createTimer } from './components/timer'

import { gamePageInit } from './components/game_page'

document.querySelector('.start-btn').addEventListener('click', ()=>{
  console.log(document.querySelector('.start-page'))
  document.querySelector('.wrapper').removeChild(document.querySelector('.start-page'));
  gamePageInit()
  createTimer(document.querySelector('.game-page__header'));
})


//createTimer(document.querySelector('.game-page'))