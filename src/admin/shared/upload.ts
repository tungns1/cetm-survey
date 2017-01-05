import {HttpHost} from '../../config/';

const UploadFolder = `${HttpHost()}`;

import { SetUploadURL, FilePickerModule, MultiFilePickerModule } from '../../x/ui/upload/';
SetUploadURL(UploadFolder);

export {
    FilePickerModule,
    MultiFilePickerModule
}