import { SharedConfig } from './shared';
const UploadFolder = `${SharedConfig.HttpHost()}`;

import { SetUploadURL, FilePickerModule, MultiFilePickerModule } from '../../x/ng/upload/';

SetUploadURL(UploadFolder);

export {
    FilePickerModule,
    MultiFilePickerModule
}