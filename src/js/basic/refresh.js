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
    
      if (rawResponse.ok) {
        const content = await rawResponse.json();
        
        return content;
      } else {
        window.location.href = "./login.html";
      }
}


const refreshLogin = async () => {
    const id = localStorage.getItem('userId');
    
    const data = await getRefreshToken(id);
    if (data) {
       
        const {refreshToken, token} = data;
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('token', token);
        return true;
    }
    
}

export {getRefreshToken, refreshLogin}