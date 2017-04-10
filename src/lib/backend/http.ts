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
    xhr.onload = e => {
      if (xhr.status !== 200) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    }
    xhr.onerror = reject;
    xhr.send(body);
  });
}
