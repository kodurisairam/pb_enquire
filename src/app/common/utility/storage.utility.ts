const PREFIX = 'RSB#.';
export function setValueToStorage(key: string, value: any, type: string = 'string', memory?: string): void {
    key = PREFIX + key;
    let storageValue: string = value.toString();
    if (type.toLowerCase().indexOf('bool') > -1) {
        storageValue = (+value).toString();
    } else if (type.toLowerCase().indexOf('json') > -1) {
        storageValue = JSON.stringify(value);
    }
    if (memory && memory === 'session' && window && 'sessionStorage' in window) {
        window.sessionStorage.setItem(key, storageValue);
    }
    else if (window && 'localStorage' in window) {
        window.localStorage.setItem(key, storageValue);
    }
}

export function getValueFromStorage(key: string, type: string = 'string', memory?: string): any {
    key = PREFIX + key;
    type = type.toUpperCase().substring(0, 1);
    let storageValue = '';
    if (memory && memory === 'session' && window && 'sessionStorage' in window) {
        storageValue = window.sessionStorage.getItem(key);
    }
    else if (window && 'localStorage' in window) {
        storageValue = window.localStorage.getItem(key) || storageValue;
    }
    if (type === 'N') {
        return storageValue === '' ? 0 : Number(storageValue);
    }
    else if (type === 'B') {
        return storageValue === '' ? false : !!Number(storageValue);
    }
    else if (type === 'J') {
        let tmp: any = null;
        if (storageValue !== '') {
            try { tmp = JSON.parse(storageValue); }
            catch (e) { tmp = null; }
        }
        return tmp;
    }
    else {
        return storageValue;
    }
}

export function removeItemFromStorage(key: string, memory?: string): void {
    key = PREFIX + key;
    if (memory && memory === 'session' && window && 'sessionStorage' in window) {
        window.sessionStorage.removeItem(key);
    }
    else if (window && 'localStorage' in window) {
        window.localStorage.removeItem(key);
    }
}

export function createCookie(name: string, value: string, days?: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + ";domain=.pillarblocks.com; path=/";
}

export function readCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}