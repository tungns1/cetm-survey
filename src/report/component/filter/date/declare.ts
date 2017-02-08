
interface FlatPickrOptions {
    clickOpen?: boolean;
    allowInput?: boolean;
    dateFormat?: string;
    defaultDate?: string | Date;
    onChange?: (d: Date) => void;
}

declare class Flatpickr {
    constructor(el: HTMLElement, options?: FlatPickrOptions);
    open();
    setDate(d: Date);
    selectedDates: Date[];
    static localize(locales: any);
}
