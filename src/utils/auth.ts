import Cookies from 'js-cookie';

export const TOKEN_KEY = 'jwt_token';

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function saveToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'strict' 
  });
}

export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
}

export function saveCookie(value:string): void {
  Cookies.set('user', value, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'strict' 
  });
}

export function logoutCookies(): void {
  const cookieNames = ['user', TOKEN_KEY];
  for (let index = 0; index < cookieNames.length; index++) {
    Cookies.remove(cookieNames[index])
  }  
}
