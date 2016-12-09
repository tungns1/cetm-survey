
export function sendRecordPage(filename: string, Data: Uint8Array[]) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/room/counter/record?fname='+ filename, true);
    xhr.send(Data);
}