import {Backend} from '../../shared';

const ViErrors = {

}

ViErrors['record not found'] = 'Sai tên đăng nhập';
ViErrors['wrong password'] = 'Sai mật khẩu';
ViErrors['unauthorize'] = 'Không đủ quyền truy cập ứng dụng';

export function FormatError(e: string) {
  if (typeof e !== 'string') {
    return '';
  }
  if (ViErrors[e]) {
    return ViErrors[e];
  }
  if (e.toLowerCase().startsWith("unauthorized")) {
    return ViErrors["unauthorize"]
  }
  return e;
}

export function I18nHttpError(err: Backend.HttpError) {
    return `Đã có lỗi: ${FormatError(err.Message())}`
}