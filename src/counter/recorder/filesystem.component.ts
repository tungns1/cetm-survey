
export class CacheFileSystem {
    fileName: string;
    type: number;
    requestedBytes: number;
    fileSystem: FileSystem;

    constructor(filename?: string, type?: number, requestedBytes?: number) {
        var that = this;
        this.fileName = filename || '';
        this.type = type || window.PERSISTENT;
        this.requestedBytes = requestedBytes || 100 * 1024 * 1024;

        if (this.type === window.PERSISTENT) {
            this._requestPersistentStorage();
        } else if(this.type === window.TEMPORARY) {
            this._requestTemporaryStorage();
        }
    }

    _requestPersistentStorage() {
        navigator['webkitTemporaryStorage'].queryUsageAndQuota(
            (usage, quota) => {
                
                var availableSpace = quota - usage;
                console.log(availableSpace)
                if (availableSpace >= this.requestedBytes) {
                    // We're fine; just continue to set up offline mode.
                    navigator['webkitPersistentStorage'].requestQuota(
                    availableSpace,
                    (grantedQuota) => {
                        console.log(availableSpace)
                        window.requestFileSystem(window.PERSISTENT, grantedQuota, (fs) => { this.fileSystem = fs; }, errorHandler);
                    }, errorHandler);
                    return;
                }
                var requestingQuota = this.requestedBytes + usage;
                navigator['webkitPersistentStorage'].requestQuota(
                    requestingQuota,
                    (grantedQuota) => {
                        console.log('Warning: System can just grand ' + (grantedQuota - usage) + 'for your task!')
                        window.requestFileSystem(window.PERSISTENT, grantedQuota - usage, (fs) => { this.fileSystem = fs; }, errorHandler);
                    }, errorHandler);
            }, errorHandler);
    }
    
    _requestTemporaryStorage() {
        window.requestFileSystem(window.TEMPORARY, this.requestedBytes, (fs) => { this.fileSystem = fs; }, errorHandler);
    }

    readAsText(callback: (e) => void) {
        this.fileSystem.root.getFile(this.fileName, {}, (fileEntry) => {
            fileEntry.file((file) => {
                var reader = new FileReader();
                reader.onloadend = callback;
                reader.readAsText(file);
            }, errorHandler);
        }, errorHandler);
    }

    write(writeData: any, datatype: string) {
        this.fileSystem.root.getFile(this.fileName, { create: true }, (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
                fileWriter.onwriteend = (e) => {
                    console.log('Write completed.');
                };

                fileWriter.onerror = (e) => {
                    console.log('Write failed: ' + e.toString());
                };
                var blob = new Blob([writeData], { type: datatype });
                fileWriter.write(blob);
            }, errorHandler);
        }, errorHandler);
    }

    remove() {
        this.fileSystem.root.getFile(this.fileName, { create: false }, (fileEntry) => {
            fileEntry.remove(() => {
                console.log('File ' + this.fileName + 'is removed.');
            }, errorHandler);
        }, errorHandler);
    }

    append(appendData: any, datatype: string) {
        this.fileSystem.root.getFile(this.fileName, { create: false }, (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
                fileWriter.seek(fileWriter.length); // Start write position at EOF.
                var blob = new Blob([appendData], { type: datatype });
                fileWriter.write(blob);
            }, errorHandler);
        }, errorHandler);
    }

    getURL() {
        var fsurl: string;
        this.fileSystem.root.getFile(this.fileName, {}, (fileEntry) => {
            fsurl = fileEntry.toURL();
        }, errorHandler);
        return fsurl;
    }

    setFileName(filename: string) {
        this.fileName = filename;
    }

}

function errorHandler(e) {
    console.log('Error: ' + e);
}