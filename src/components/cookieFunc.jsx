function getCookieValue(cookieString,cookieName) {
    const cookie = cookieString.split('; ')
      .find((c) => c.startsWith(`${cookieName}=`));
    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      return cookieValue;
    }
    return null;
}

module.exports = {getCookieValue}