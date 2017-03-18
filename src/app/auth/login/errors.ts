import { HttpError } from '../../x/backend';

const ViErrors = {

}

ViErrors['record not found'] = 'Error Username';
ViErrors['wrong password'] = 'Error Password';
ViErrors['unauthorize'] = 'Cannot authorities connect application';

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

export function I18nHttpError(err: HttpError) {
  return `Error: ${FormatError(err.Message())}`
}