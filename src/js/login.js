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

console.log(SIGNIN_BTN);

const createUser = async (user) => {
  try {
    const rawResponse = await fetch(
      "https://afternoon-falls-25894.herokuapp.com/users",
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
      SIGNUP_ERROR.textContent = "Вы успешно зарегестрировались";
      return content;
    }

    if (rawResponse.status === 417) {
      SIGNUP_ERROR.textContent = "Пользователь с такой почтой уже существует";
    }
  } catch (error) {}

  // createUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
};

const loginUser = async (user) => {
  try {
    const rawResponse = await fetch(
      "https://afternoon-falls-25894.herokuapp.com/signin",
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
    }

    if (rawResponse.status === 417) {
      SIGNUP_ERROR.textContent = "Не верный логин или пароль";
    }

    // console.log(content);

    //loginUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });
  } catch (error) {}
};

const getUserWord = async ({ userId, wordId }) => {
    const token = localStorage.getItem('token');
    console.log(token);
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
        {
            method: "GET",
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

  const content = await rawResponse.json();

  console.log(content);
};

signUpRightButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInLeftButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

SIGNUP_BTN.addEventListener("click", async () => {
  console.log(SIGNUP_EMAIL.value);
  console.log(SIGNUP_PASSWORD.value);
  let regexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+-_@$!%*?&#.,;:[\]{}]{8,}/g;
  //console.log(regexp.test(SIGNIN_PASSWORD.value))
  if (regexp.test(SIGNUP_PASSWORD.value)) {
    console.log("djfkd");
    if (SIGNUP_EMAIL && SIGNUP_PASSWORD) {
      const user = {
        email: `${SIGNUP_EMAIL.value}`,
        password: `${SIGNUP_PASSWORD.value}`,
      };
      console.log(user);
      userContent = await createUser(user);
      console.log(userContent);
    }
  }
});

const wordId = '5e9f5ee35eb9e72bc21af716';

SIGNIN_BTN.addEventListener("click", async () => {
  console.log(SIGNIN_EMAIL.value);
  console.log(SIGNIN_PASSWORD.value);
  if (SIGNIN_EMAIL && SIGNIN_PASSWORD) {
    const user = {
      email: `${SIGNIN_EMAIL.value}`,
      password: `${SIGNIN_PASSWORD.value}`,
    };
    console.log(user);
    userLogin = await loginUser(user);
    console.log(userLogin);
    localStorage.setItem('token', userLogin.token);
    localStorage.setItem('userId', userLogin.userId);
    const userId = localStorage.getItem('userId');
    const userWord = {
        userId: `${userId}`,
        wordId: `${wordId}`
      }
    await getUserWord(userWord);
  }
});
