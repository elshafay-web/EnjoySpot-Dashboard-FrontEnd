export function setCookie(cname: string, cvalue?: string, clear?: boolean) {
  const d = new Date();
  let expires: string;
  d.setTime(d.getTime() + 7 * 60 * 60 * 1000);
  if (clear) {
    expires = "expires= Thu, 01 Jan 1970 00:00:00 GMT";
  } else {
    expires = `expires=${d.toUTCString()}`;
  }
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname: string) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkTokenCookie() {
  const token = getCookie("token");
  if (token !== "") {
    return true;
  }
  return false;
}
