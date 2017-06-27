import { L10nText, Localize } from './i18n'

export class TranslateService {
    constructor() {
    }

    translateData: { [index: string]: L10nText } = {
        'Code does not exist': {
            vi: 'Mã khách hàng không tồn tại',
            en: 'Code does not exist',
            sp: 'translating'
        },
        'The data was created successfully': {
            vi: 'Dữ liệu đã được tạo thành công',
            en: 'The data was created successfully',
            sp: 'translating'
        },
        'The data was saved successfully': {
            vi: 'Dữ liệu đã được lưu thành công',
            en: 'The data was saved successfully',
            sp: 'traslating'
        },
        'The data was deleted': {
            vi: 'Dữ liệu đã được xóa',
            en: 'The data was deleted',
            sp: 'traslating'
        },
        'Cant filter': {
            vi: 'Không thể lọc!',
            en: 'Cant filter!',
            sp: 'traslating'
        },
        'Update Successfully': {
            vi: 'Cập nhật thành công',
            en: 'Update Successfully',
            sp: 'traslating'
        },
        'Update Error': {
            vi: 'Cập nhật lỗi',
            en: 'Update Error',
            sp: 'traslating'
        },
        'Wrong Password': {
            vi: 'Sai mật khẩu',
            en: 'Wrong Password',
            sp: 'traslating'
        },
        'Wrong retype password!': {
            vi: 'Mật khẩu gõ lại sai!',
            en: 'Wrong retype password!',
            sp: 'traslating'
        },
        'Close': {
            vi: 'Đóng',
            en: 'Close',
            sp: 'Cerca'
        },
        'This branch has been assigned to some store': {
            vi: 'Chi nhánh này có liên kết với một số phòng giao dịch',
            en: 'This branch has been assigned to some store',
            sp: 'traslating'
        },
        'This area has been assigned to some branch': {
            vi: 'Tỉnh/thành này có liên kết với một số chi nhánh',
            en: 'This area has been assigned to some branch',
            sp: 'traslating'
        },
        'This store has been assigned to some kiosk': {
            vi: 'Cửa hàng này có liên kết với một số kiosk',
            en: 'This store has been assigned to some kiosk',
            sp: 'traslating'
        }
    }

    translate(txt: string) {
        return this.translateData[txt] ? Localize(this.translateData[txt]) : txt;
    }
}