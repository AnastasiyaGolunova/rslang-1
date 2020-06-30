import '../css/style.css';
import '../js/components/start_page'
import '../js/components/timer'
import '../js/components/game_page'
import './data/get_data'
import './helpers/show_card'

import { createTimer } from './components/timer'

import { gamePageInit } from './components/game_page'

document.querySelector('.start-btn').addEventListener('click', ()=>{
  document.querySelector('.wrapper').removeChild(document.querySelector('.start-page'));
  gamePageInit()
  createTimer(document.querySelector('.game-page__header'));
})


//createTimer(document.querySelector('.game-page'))