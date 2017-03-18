import { HttpHost } from '../../shared/config';

const UploadFolder = `${HttpHost()}`;

import { SetUploadURL, FilePickerModule, MultiFilePickerModule } from '../../x/ng/upload/';

SetUploadURL(UploadFolder);

export {
    FilePickerModule,
    MultiFilePickerModule
}