const getCookie = (name: string) => {
  function escape(s: string) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
};

const deleteCookie = (name: string) => {
  document.cookie = name +'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export { getCookie, deleteCookie };