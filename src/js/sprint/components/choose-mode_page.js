function modePageInit() {
  const modePage = document.createElement('DIV')
  modePage.classList.add('mode-page')
  modePage.innerHTML = `
  <h2 class="game-name page-header">Выберите режим игры</h2>    
    <div class="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide mode-page-wrapper">
          <div class="info">
            <p class="mode-name">Стандартный</p>
          </div>
          <div class="mode-description">
            <p>Здесь вы повстречаете только выученные ранее слова. Повторение - мать учения!</p>
          </div>
          <button class="choose-mode-btn btn" id="standard-mode-btn">Начать игру</button>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>`

  document.querySelector('.wrapper').append(modePage)
}

export{ modePageInit }