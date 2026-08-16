// Парсит Set-Cookie заголовки корректно:
// getSetCookie() - чтобы избежать разбивки по запятым в expires-датах
// indexOf('=') - чтобы не обрезать base64/JWT значения содержащие '='
export function parseSetCookies(resHeaders: Headers): Array<{ name: string; value: string }> {
  const setCookies = resHeaders.getSetCookie();
  const result: Array<{ name: string; value: string }> = [];
  for (const cookieStr of setCookies) {
    const [nameValue] = cookieStr.split(";");
    const eqIdx = nameValue.indexOf("=");
    if (eqIdx === -1) continue;
    const name = nameValue.slice(0, eqIdx).trim();
    const value = nameValue.slice(eqIdx + 1).trim();
    if (name && value) result.push({ name, value });
  }
  return result;
}
