

let uploadURL = "http://localhost:3000/upload";

export function SetUploadURL(url: string) {
  uploadURL = url;
}

export function GetUploadURL(uri: string) {
    return uploadURL + uri;
}