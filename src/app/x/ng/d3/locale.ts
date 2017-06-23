import { timeFormatLocale, timeFormatDefaultLocale, TimeLocaleDefinition } from 'd3-time-format';
import { timeSecond, timeMinute, timeHour, timeDay, timeWeek, timeMonth, timeYear } from 'd3-time';
import { AppStorage } from '../../../shared';


const vi: TimeLocaleDefinition = {
  "dateTime": "%A, %e %B %Y г. %X",
  "date": "%d.%m.%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
  "shortDays": ["CN", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
  "months": ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
  "shortMonths": ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
}

const en: TimeLocaleDefinition = {
  "dateTime": "%A, %e %B %Y г. %X",
  "date": "%d.%m.%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  "shortDays": ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'ST'],
  "months": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  "shortMonths": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
}

const sp: TimeLocaleDefinition = {
  "dateTime": "%A, %e %B %Y г. %X",
  "date": "%d.%m.%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  "shortDays": ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
  "months": ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  "shortMonths": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
}

const Locales = {
    vi: vi,
    en: en,
    sp: sp
}

var locale = timeFormatLocale(Locales[AppStorage.Culture]);

timeFormatDefaultLocale(vi);

const formatEn = {
  day: locale.format("%d/%m/%Y"),
  week: locale.format("Week %W-%Y"),
  month: locale.format("Month %m"),
  year: locale.format("Year %Y")
}

const formatSp = {
  day: locale.format("%d/%m/%Y"),
  week: locale.format("Semana %W-%Y"),
  month: locale.format("Mes %m"),
  year: locale.format("Año %Y")
}

const formatVi = {
  day: locale.format("%d/%m/%Y"),
  week: locale.format("Tuần %W-%Y"),
  month: locale.format("Tháng %m"),
  year: locale.format("Năm %Y")
}

export const Format = AppStorage.Culture === 'vi' ? formatVi : AppStorage.Culture === 'sp' ? formatSp : formatEn;

export function autoFormatDate(date) {
  // current date is not start of the month
  return (timeMonth(date) < date ? Format.day
    : timeYear(date) < date ? Format.month 
      : Format.year)(date);
}