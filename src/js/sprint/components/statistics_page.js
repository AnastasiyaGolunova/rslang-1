function statisticsPageInit() {
  const gamePage = document.createElement('DIV')
  gamePage.classList.add('statistics-page');
  gamePage.classList.add('hidden');
  gamePage.innerHTML = `
      <div class="statistics-page__header">
        <div class="title">Результат: </div>
        <div class="score"> 
          <span>0</span>
        </div>
        </div>    
      </div>
      <div class="word-section">
        <div class="fail">
          <div class="title">Failure: <span> 0</span></div>
        </div>
        <div class="success">
          <div class="title">Success: <span> 0</span></div>
        </div>
      </div>
      <div class="button-wrapper">
        <button class="return-btn btn"><i class="fas fa-undo-alt"></i> Возврат</button>
      </div>`
  document.querySelector('.wrapper').append(gamePage)
}


export {statisticsPageInit}