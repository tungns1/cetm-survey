const vi = {
    weekdays: {
        shorthand: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        longhand: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
    },
    months: {
        shorthand: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
        longhand: ['Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng tư', 'Tháng năm', 'Tháng sáu', 'Tháng bảy', 'Tháng tám', 'Tháng chín', 'Tháng mười', 'Tháng 11', 'Tháng 12']
    }
}
const en = {
    weekdays: {
        shorthand: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'ST'],
        longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    months: {
        shorthand: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
}
const sp = {
    weekdays: {
        shorthand: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
        longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    },
    months: {
        shorthand: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }
}

export const Locales = {
    vi: vi,
    en: en,
    sp: sp
}