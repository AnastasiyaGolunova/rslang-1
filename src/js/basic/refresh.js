const getRefreshToken = async (id) => {
    const urlHeroku = `https://afternoon-falls-25894.herokuapp.com`;
    const refreshToken = localStorage.getItem('refreshToken');
    const rawResponse = await fetch(`${urlHeroku}/users/${id}/tokens`,
    {
        method: "GET",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            Accept: "application/json",
        },
    });
    console.log(rawResponse);
      if (rawResponse.ok) {
        const content = await rawResponse.json();
        console.log(content);
        return content;
      } else {
        window.location.href = "./login.html";
        console.log(3)
      }
}


const refreshLogin = async () => {
    const id = localStorage.getItem('userId');
    console.log(id);
    const data = await getRefreshToken(id);
    if (data) {
        const {refreshToken, token} = data;
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('token', token);
    }
    console.log(1)
    // console.log(window.atob(token));
}

export {getRefreshToken, refreshLogin}