import Cookies from 'js-cookie';
import cookie from 'cookie';

export const TOKEN_KEY = 'jwt_token';

export function getToken(req?: any): string {
  if (req) {
    const parsedCookies = cookie.parse(req.headers.cookie || '');
    // console.log(parsedCookies);
    
    return parsedCookies[TOKEN_KEY] || '';
  }

  return Cookies.get(TOKEN_KEY) || '';
}

export function saveToken(token: string): void {
  // console.log("Active saveToken utils/auth.ts");
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'strict' 
  });
}

export function removeToken(): void {
  // console.log("Active removeToken utils/auth.ts");
  Cookies.remove(TOKEN_KEY);
}

export function saveCookie(value:string): void {
  // console.log("Active saveCookie utils/auth.ts");
  Cookies.set('user', value, {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'strict' 
  });
}

export function logoutCookies(): void {
  // console.log("Active logoutCookies utils/auth.ts");
  const cookieNames = ['user', TOKEN_KEY];
  for (let index = 0; index < cookieNames.length; index++) {
    Cookies.remove(cookieNames[index])
  }  
}
