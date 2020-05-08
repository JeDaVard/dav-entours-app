export function setCookie(cname, cvalue, exp) {
    let d = new Date();
    d.setTime(d.getTime() + exp);
    let expires = d.toUTCString();
    document.cookie = `${cname}=${cvalue};Path=/;Expires=${expires}`
}

export function getCookie(cname) {
    let name = cname + "=";
    let cookieArr = document.cookie.split(';');
    for(let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

export function removeCookie() {
    for (let arg of arguments) {
        document.cookie = `${arg}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}