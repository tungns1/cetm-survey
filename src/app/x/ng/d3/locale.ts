import { timeFormatLocale, timeFormatDefaultLocale, TimeLocaleDefinition } from 'd3-time-format';
import { timeSecond, timeMinute, timeHour, timeDay, timeWeek, timeMonth, timeYear } from 'd3-time';


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

var locale = timeFormatLocale(vi);

timeFormatDefaultLocale(vi);

export const Format = {
  day: locale.format("%d/%m/%Y"),
  week: locale.format("Tuần %W-%Y"),
  month: locale.format("Tháng %m"),
  year: locale.format("Năm %Y")
}

export function autoFormatDate(date) {
  // current date is not start of the month
  return (timeMonth(date) < date ? Format.day
    : timeYear(date) < date ? Format.month 
      : Format.year)(date);
}