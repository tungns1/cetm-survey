import { L10nText, Localize } from './i18n'

export class TranslateService {
    constructor() {
    }

    translateData: { [index: string]: L10nText } = {
        'Khách hàng về trước': {
            vi: 'Khách hàng về trước',
            en: 'Khách hàng về trước',
            sp: 'Khách hàng về trước'
        },
        'Khách hàng không đồng ý phản hồi': {
            vi: 'Khách hàng không đồng ý phản hồi',
            en: 'Khách hàng không đồng ý phản hồi',
            sp: 'Khách hàng không đồng ý phản hồi'
        },
        'Lý do khác': {
            vi: 'Lý do khác',
            en: 'Lý do khác',
            sp: 'Lý do khác'
        },
        'Customer left': {
            vi: 'Khách hàng về trước',
            en: 'Customer left',
            sp: 'Customer left'
        },
        'Customer denied giving feedback': {
            vi: 'Khách hàng không đồng ý phản hồi',
            en: 'Customer denied giving feedback',
            sp: 'Customer denied giving feedback'
        },
        'Other reason': {
            vi: 'Lý do khác',
            en: 'Other reason',
            sp: 'Other reason'
        },
        'Code does not exist': {
            vi: 'Mã khách hàng không tồn tại',
            en: 'Code does not exist',
            sp: 'Códino no existe'
        },
        'The data was created successfully': {
            vi: 'Dữ liệu đã được tạo thành công',
            en: 'The data was created successfully',
            sp: 'La información se creó con éxito'
        },
        'The data was saved successfully': {
            vi: 'Dữ liệu đã được lưu thành công',
            en: 'The data was saved successfully',
            sp: 'La información se guardó con éxito'
        },
        'The data was deleted': {
            vi: 'Dữ liệu đã được xóa',
            en: 'The data was deleted',
            sp: 'Los datos se eliminaron'
        },
        'Cant filter': {
            vi: 'Không thể lọc!',
            en: 'Cant filter!',
            sp: 'No puede filtrar!'
        },
        'Update Successfully': {
            vi: 'Cập nhật thành công',
            en: 'Update Successfully',
            sp: 'Actualización exitosa'
        },
        'Update Error': {
            vi: 'Cập nhật lỗi',
            en: 'Update Error',
            sp: 'Actualización Error'
        },
        'Wrong Password': {
            vi: 'Sai mật khẩu',
            en: 'Wrong Password',
            sp: 'Contraseña incorrecta'
        },
        'Wrong retype password!': {
            vi: 'Mật khẩu gõ lại sai!',
            en: 'Wrong retype password!',
            sp: 'Contraseña incorrecta'
        },
        'Close': {
            vi: 'Đóng',
            en: 'Close',
            sp: 'Cerrar'
        },
        'This branch has been assigned to some store': {
            vi: 'Chi nhánh này có liên kết với một số phòng giao dịch',
            en: 'This branch has been assigned to some store',
            sp: 'Esta sucursal ha sido asignada a alguna tienda'
        },
        'This area has been assigned to some branch': {
            vi: 'Tỉnh/thành này có liên kết với một số chi nhánh',
            en: 'This area has been assigned to some branch',
            sp: 'Esta área ha sido asignada a alguna sucursal'
        },
        'This store has been assigned to some kiosk': {
            vi: 'Cửa hàng này có liên kết với một số kiosk',
            en: 'This store has been assigned to some kiosk',
            sp: 'Esta tienda ha sido asignada a algún quiosco'
        },
        'Good':{
            vi: 'Tốt',
            en: 'Good',
        },
        'Rather':{
            vi: 'Khá',
            en: 'Rather',
        },
        'Average':{
            vi: 'Trung Bình',
            en: 'Average',
        },
        'Poor':{
            vi: 'Kém',
            en: 'Poor',
        },
        'Finished':{
            vi: 'Hoàn thành',
            en: 'Finished',
        },
        'Unfinished':{
            vi: 'Chưa hoàn thành',
            en: 'Unfinished',
        }
    }

    translate(txt: string) {
        return this.translateData[txt] ? Localize(this.translateData[txt]) : txt;
    }
}