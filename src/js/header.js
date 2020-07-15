

export default class Header {
    render() {
        console.log('header');
        const header = `
              <div class="rs-menu">
              <ul class="rs-ul">
                  <li data-action="logo" class="logo">RS Lang</li>
                  <div class="navigation">
                      <li class="rs-li menu-dictionary"><a href="#" data-action="dictionary" class="pointer">Словарь</a>
                      </li>
                      <li class="rs-li"><a href="#" class="pointer">Мини-игры</a><img class="sort" src="./icons/sort.png"
                              alt="sort">
                          <ul class="ul-dropdown games">
                              <li class="li-dropdown"><img class="microphone" src="./icons/microphone.png"
                                      alt="microphone"><a href="#" data-action="speak" class="pointer">SpeakIt</a></li>
                              <li class="li-dropdown"><img class="puzzle" src="./icons/puzzle.png" alt="puzzle"><a href="#" 
                                data-action="puzzle" class="pointer">English Puzzle</a></li>
                              <li class="li-dropdown"><img class="tree" src="./icons/tree.png" alt="tree"><a href="#" 
                                data-action="savannah" class="pointer">Саванна</a></li>
                              <li class="li-dropdown"><img class="headphones" src="./icons/headphones.png" alt="headphones"><a href="#"
                                data-action="audiocall" class="pointer">Аудиовызов</a></li>
                              <li class="li-dropdown"><img class="track" src="./icons/track.png" alt="track"><a href="#"
                                data-action="sprint" class="pointer">Спринт</a></li>
                              <li class="li-dropdown"><img class="dice" src="./icons/dice.png" alt="dice"><a href="#"
                                      class="pointer">Своя игра</a></li>
                          </ul>
                      </li>
                      <li class="rs-li"><a data-action="progress" href="#" class="pointer">Мой прогресс</a></li>
                      <li class="rs-li"><a href="#" class="pointer">О приложении</a></li>
                      <li class="rs-li"><a href="#" data-action="about" class="pointer about-team">О команде</a></li>
                      <li class="rs-li"><a href="#" class="pointer"><img class="services" src="./icons/services.png"
                                  alt="services"></a>
                          <ul class="ul-dropdown settings" id="settings">
                              <li class="li-dropdown words"><img class="update" src="./icons/update.png" alt="update">
                                  <a href="#" class="pointer">Слова в день</a>
                                  <input type="number" onkeydown="return false" class="input-number quantity-words" name="quantity" min="0"
                                      max="100" value="10">
                              </li>
                              <li class="li-dropdown cards"><img class="ticket" src="./icons/ticket.png" alt="ticket">
                                  <a href="#" class="pointer">Карточки в день</a>
                                  <input type="number" onkeydown="return false" class="input-number quantity-cards" id="quantity-cards"
                                      name="quantity" min="0" max="100" value="10">
                              </li>
                              <li class="li-dropdown"><img class="document" src="./icons/document.png" alt="document"><a
                                      href="#" class="pointer">Пример</a>
                                  <div class="switcher">
                                      <input data-action="example" type="checkbox" class="checkbox checkbox-example" id="switch-5" />
                                      <label for="switch-5"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="translation" src="./icons/translation.png"
                                      alt="translation"><a href="#" class="pointer">Перевод слова</a>
                                  <div class="switcher">
                                      <input data-action="translate" type="checkbox" class="checkbox checkbox-word-translation" id="switch-1" checked/>
                                      <label for="switch-1"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="hangouts" src="./icons/hangouts.png" alt="hangouts"><a
                                      href="#" class="pointer">Транскрипция</a>
                                  <div class="switcher">
                                      <input data-action="transcript" type="checkbox" class="checkbox checkbox-word-transcription" id="switch-3" />
                                      <label for="switch-3"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="image" src="./icons/picture.png" alt="picture"><a
                                      href="#" class="pointer">Ассоциация</a>
                                  <div class="switcher">
                                      <input data-action="association" type="checkbox" class="checkbox checkbox-association" id="switch-4" />
                                      <label for="switch-4"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="about" src="./icons/about.png" alt="about"><a href="#"
                                      class="pointer">Значение слова</a>
                                  <div class="switcher">
                                      <input data-action="meaning" type="checkbox" class="checkbox checkbox-mean" id="switch-2" />
                                      <label for="switch-2"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="solve" src="./icons/solve.png" alt="solve"><a href="#"
                                      class="pointer">Показать ответ</a>
                                  <div class="switcher">
                                      <input data-action="answerCheckbox" type="checkbox" class="checkbox checkbox-answer" id="switch-6" checked/>
                                      <label for="switch-6"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="answers" src="./icons/answers.png" alt="answers"><a
                                      href="#" class="pointer">Сложные слова</a>
                                  <div class="switcher">
                                      <input data-action="difficultCheckbox" type="checkbox" id="switch-7" checked/>
                                      <label for="switch-7"></label>
                                  </div>
                              </li>
                              <li class="li-dropdown"><img class="trash" src="./icons/trash.png" alt="trash"><a href="#"
                                      class="pointer">Удаление слова</a>
                                  <div class="switcher">
                                      <input data-action="trashCheckbox" class="checkbox checkbox-trash" type="checkbox" id="switch-8" checked/>
                                      <label for="switch-8"></label>
                                  </div>
                              </li>
                          </ul>
                      </li>
                      <li class="rs-li"><a href="#" class="pointer"><img data-action="exit" class="exit" src="./icons/exit.png"
                                  alt="exit"></a>
                      </li>
                  </div>
              </ul>
              <div class="burger" data-action="burger">
                  <div class="line1"></div>
                  <div class="line2"></div>
                  <div class="line3"></div>
              </div>
              <div>
      `
      
        const HEADER_NAVIGATION = document.querySelector('.header-navigation');
        HEADER_NAVIGATION.innerHTML = header;
      }
      
      set() {
        const HEADER_NAVIGATION = document.querySelector('.header-navigation');

        console.log(HEADER_NAVIGATION.innerHTML)
      
        localStorage.setItem('header', HEADER_NAVIGATION.outerHTML);
      
        // HEADER_NAVIGATION.innerHTML = header;
      }
      
      get() {
        const HEADER_NAVIGATION = document.querySelector('.header-navigation');
      
        const header = localStorage.getItem('header', HEADER_NAVIGATION);
      
        HEADER_NAVIGATION.innerHTML = header;

        const div = document.createElement('div');
        console.log(div)

        console.log(header);

        //HEADER_NAVIGATION.append(header.strin;
      }
}
