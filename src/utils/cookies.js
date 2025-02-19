export const setCookie = (name, value, minutes) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };
  
  export const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };