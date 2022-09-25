function getCookie(key) {
    var cookie = document.cookie.trim().split('; ');
    var cookieObj = {}
    for (var i = 0; i < cookie.length; i++) {
        var arr = cookie[i].split('=');
        cookieObj[arr[0]] = arr[1];
    }
    return cookieObj[key]
}

function setCookie(key, value, time) {
    var expires = new Date(new Date().getTime() + time)
    document.cookie = key + '=' + value + '; expires=' + expires.toGMTString();
    console.log(document.cookie)
}
function removeCookie(key) {
    setCookie(key, '', -1)
}

export default {
    getCookie,
    setCookie,
    removeCookie,
}