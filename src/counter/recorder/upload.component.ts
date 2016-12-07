
export function sendPage(filename: string, Data: Uint8Array) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/postpage?fname='+ filename, true);
    xhr.send(Data);
}