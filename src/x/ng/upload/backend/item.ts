// Class File Item
export class FileItem {
  constructor(private file: File) {
    this.init();
  }

  get File() {
    return this.file;
  }

  get Size() {
    return this.size
  }

  get Name() {
    return this.name;
  }

  MakeObjectUrl() {
    return window.URL.createObjectURL(this.file)
  }

  RevokeObjectUrl() {
    if (this.objectUrl) {
      window.URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  private init() {
    this.name = this.file.name;
    this.size = ReadableFileSize(this.file.size);
  }


  private objectUrl: string;
  private size: string;
  private name: string;
}

function ReadableFileSize(size: number) {
  var aMultiples = ["bytes", "KiB", "MiB", "GiB"];
  var nMultiple = 0;
  var nBytes = size;
  while (nBytes > 1023) {
    nBytes /= 1024;
    nMultiple++;
  }
  return nBytes.toFixed(3) + " " + aMultiples[nMultiple];
}

