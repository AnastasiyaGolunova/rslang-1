const startPage = document.createElement('div');
startPage.classList.add('wrapper')

startPage.innerHTML = `<div class="about-page">
    <h2 class="page-title">Наша команда</h2>    
    <div class="slider">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="status">team lead</p>
            <p class="name">Тулепов Омирбек</p>
            <a class="link" href="https://github.com/omirbeck" target="_blank"><i class="fab fa-github"></i>omirbeck</a>
          </div>
        </div>
        <div class="deserts">
          <p>Тим лид команды. В качестве тим лида координировал деятельность команды, занимался распределением задач, планированием,  помогал и консультировал в сложных ситуациях при написаний кода
          Проводил еженедельные митинги с командой для уточнения требований, поставленных задач перед командой.</p>
          <p>Реализована авторизация и регистрация нового пользователя.</p>
          <p>Реализовал базовые функции приложения</p>
        </div>
      </div>

      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="name">Голунова Анастасия</p>
            <a class="link" href="https://github.com/anastasiyagolunova" target="_blank"><i class="fab fa-github"></i>Anastasiya Golunova</a>
          </div>
        </div>
        <div class="deserts">
          <p>Pазработка игры <span>speakIt</span>.</p>
        </div>
      </div>
      
      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="name">Черкас Евгений</p>
            <a class="link" href="https://github.com/yauheniche" target="_blank"><i class="fab fa-github"></i>yauheniche</a>
          </div>
        </div>
        <div class="deserts">
          <p>Pазработка игры <span>Sprint</span>.</p>
          <p>Страница "О команде.</p>
        </div>
      </div>
      
      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="name">Шапкарин Сергей</p>
            <a class="link" href="https://github.com/SergeyShapkarin" target="_blank"><i class="fab fa-github"></i>Sergey Shapkarin</a>
          </div>
        </div>
        <div class="deserts">
          <p>Pазработка игры <span>English puzzle</span>.</p>
        </div>
      </div>
      
      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="name">Наталья Пойда</p>
            <a class="link" href="https://github.com/natalypoida" target="_blank"><i class="fab fa-github"></i>natalypoida</a>
          </div>
        </div>
        <div class="deserts">
          <p>Pазработка игры <span>Аудиовызов</span>.</p>
        </div>
      </div>
      
      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="name">Татьяна Пашинцева</p>
            <a class="link" href="https://github.com/lisenokfoxy" target="_blank"><i class="fab fa-github"></i>lisenokFoxy</a>
          </div>
        </div>
        <div class="deserts">
          <p>Pазработка игры <span>Savannah</span>.</p>
        </div>
      </div>
      
      <div class="swiper-slide">
        <div class="slide-header">
          <div class="image"></div>
          <div class="info">
            <p class="name">Зарина Панфилова</p>
            <a class="link" href="https://github.com/zarinapanf" target="_blank"><i class="fab fa-github"></i>zarinaPanf</a>
          </div>
        </div>
        <div class="deserts">
          <p>Вёрстка приложения.</p>
          <p>Разработка метода интервальных повторений.</p>
          <p>Разработка статистики <span>Мой прогресс</span>.</p>
        </div>
      </div>

    </div>
    <div class="swiper-pagination"></div>
  </div>
  </div>`

document.body.append(startPage);

// const rulesButton = document.querySelector('.rules-btn')

// rulesButton.addEventListener('click', ()=>{
//   document.querySelector('.game-rules').classList.toggle('hidden')
// })