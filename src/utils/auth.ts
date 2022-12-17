import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken(): any {
  return Cookies.get(TokenKey);
}

export function setToken(token: any): any {
  return Cookies.set(TokenKey, token);
}

export function removeToken(): void {
  return Cookies.remove(TokenKey);
}
