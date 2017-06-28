import { L10nText, Localize } from './i18n'

export class TranslateService {
    constructor() {
    }

    translateData: { [index: string]: L10nText } = {
        'Code does not exist': {
            vi: 'Mã khách hàng không tồn tại',
            en: 'Code does not exist'
        },
        'The data was created successfully': {
            vi: 'Dữ liệu đã được tạo thành công',
            en: 'The data was created successfully'
        },
        'The data was saved successfully': {
            vi: 'Dữ liệu đã được lưu thành công',
            en: 'The data was saved successfully'
        },
        'The data was deleted': {
            vi: 'Dữ liệu đã được xóa',
            en: 'The data was deleted'
        },
        'Cant filter': {
            vi: 'Không thể lọc!',
            en: 'Cant filter!'
        },
        'Update Successfully': {
            vi: 'Cập nhật thành công',
            en: 'Update Successfully'
        },
        'Update Error': {
            vi: 'Cập nhật lỗi',
            en: 'Update Error'
        },
        'Wrong Password': {
            vi: 'Sai mật khẩu',
            en: 'Wrong Password'
        },
        'Wrong retype password!': {
            vi: 'Mật khẩu gõ lại sai!',
            en: 'Wrong retype password!'
        },
        'Close': {
            vi: 'Đóng',
            en: 'Close',
            sp: 'Cerca'
        },
        'This branch has been assigned to some store': {
            vi: 'Chi nhánh này có liên kết với một số phòng giao dịch',
            en: 'This branch has been assigned to some store'
        },
        'This area has been assigned to some branch': {
            vi: 'Tỉnh/thành này có liên kết với một số chi nhánh',
            en: 'This area has been assigned to some branch'
        },
        'This store has been assigned to some kiosk': {
            vi: 'Cửa hàng này có liên kết với một số kiosk',
            en: 'This store has been assigned to some kiosk'
        }
    }

    translate(txt: string) {
        return this.translateData[txt] ? Localize(this.translateData[txt]) : txt;
    }
}