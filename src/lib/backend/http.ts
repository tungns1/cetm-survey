function serialize(query?: Object) {
  if (!query) {
    return '';
  }
  var str = [];
  Object.keys(query).forEach(k => {
    if (query.hasOwnProperty(k)) {
      str.push(encodeURIComponent(k) + "=" + encodeURIComponent(query[k]));
    }
  })
  return str.join("&");
}

export function RawHttp(method: string, url: string, body?: any) {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = e => resolve(xhr.response);
    xhr.onerror = reject;
    xhr.send(body);
  });
}
