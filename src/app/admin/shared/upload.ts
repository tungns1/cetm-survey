import { SetUploadURL, FilePickerModule, MultiFilePickerModule } from '../../x/ng/upload/';
const UploadFolder = "http://mqserver:3000";

SetUploadURL(UploadFolder);

export {
    FilePickerModule,
    MultiFilePickerModule
}