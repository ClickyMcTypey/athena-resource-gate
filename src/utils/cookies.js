export function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split('; ') : [];

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.split('=');

    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(valueParts.join('='));
    }
  }

  return null;
}

export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `expires=${date.toUTCString()}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ');
}