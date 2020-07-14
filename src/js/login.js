import '../css/login.css'
const signUpRightButton = document.getElementById("signUp");
const signInLeftButton = document.getElementById("signIn");
const container = document.getElementById("container");
const SIGNUP_BTN = document.querySelector(".signup-button");
const SIGNIN_BTN = document.querySelector(".signin-button");
const SIGNUP_NAME = document.querySelector(".signup-name");
const SIGNUP_EMAIL = document.querySelector(".signup-email");
const SIGNUP_PASSWORD = document.querySelector(".signup-password");
const SIGNIN_EMAIL = document.querySelector(".signin-email");
const SIGNIN_PASSWORD = document.querySelector(".signin-password");
const SIGNIN_ERROR = document.querySelector(".signin-error");
const SIGNUP_ERROR = document.querySelector(".signup-error");
let userContent = null;
let userLogin = null;
const urlHeroku = `https://afternoon-falls-25894.herokuapp.com`


const createUser = async (user) => {
  try {
    const rawResponse = await fetch(
      `${urlHeroku}/users`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (rawResponse.ok) {
      const content = await rawResponse.json();
      SIGNUP_ERROR.textContent = "Вы успешно зарегестрировались";
      return content;
    }

    if (rawResponse.status === 417) {
      SIGNUP_ERROR.textContent = "Пользователь с такой почтой уже существует";
    }
  } catch (error) {}

};

const loginUser = async (user) => {
  try {
    const rawResponse = await fetch(
      `${urlHeroku}/signin`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    
    console.log(rawResponse);
    
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      SIGNIN_ERROR.textContent = "Вы успешно вошли";
      return content;
    } else {
      if (rawResponse.status === 417) {
        SIGNIN_ERROR.textContent = "Не верный логин или пароль";
        return null
      }
      
      if (rawResponse.status === 404) {
        SIGNIN_ERROR.textContent = "Пользователь не найден";
        return null
      }

      SIGNIN_ERROR.textContent = "Не верный логин или пароль";
      return null
    }
  } catch (error) {}
};

signUpRightButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInLeftButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

SIGNUP_BTN.addEventListener("click", async (event) => {
  event.preventDefault();
  let regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+-_@$!%*?&#.,;:[\]{}]{8,}/g;
  if (regexp.test(SIGNUP_PASSWORD.value)) {
    if (SIGNUP_EMAIL && SIGNUP_PASSWORD) {
      const user = {
        email: `${SIGNUP_EMAIL.value}`,
        password: `${SIGNUP_PASSWORD.value}`,
      };
      userContent = await createUser(user);
      SIGNUP_EMAIL.value = '';
      SIGNUP_PASSWORD.value = '';
    }
  } else {
    SIGNUP_ERROR.textContent = 'Нужен пароль сложнее';
  }
});

const wordId = '5e9f5ee35eb9e72bc21af716';

SIGNIN_BTN.addEventListener("click", async (event) => {
  event.preventDefault();

  if (SIGNIN_EMAIL && SIGNIN_PASSWORD) {
    const user = {
      email: `${SIGNIN_EMAIL.value}`,
      password: `${SIGNIN_PASSWORD.value}`,
    };
    
    userLogin = await loginUser(user);
    console.log(userLogin)
    if (userLogin !== null) {
      localStorage.setItem('token', userLogin.token);
      localStorage.setItem('refreshToken', userLogin.refreshToken)
      localStorage.setItem('userId', userLogin.userId);
      const userId = localStorage.getItem('userId');
      window.location.href = 'index.html';
    } else {
      SIGNIN_EMAIL.value = '';
      SIGNIN_PASSWORD.value = '';
    }
  }
});
