import * as TForm from './tform';
import * as Layout from './layout';
import * as Service from './service';

const CenterProvider = [
    Layout.LayoutApi,
    Service.ServiceApi,
    TForm.TFormApi
]

export {
    CenterProvider,
    TForm, Layout, Service,
}
