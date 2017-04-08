import { L10nText } from '../../util/i18n';



export interface ITicketLayout {
    id?:string;
    name: string;
    l10n: L10nText;
    url_logo: string
    _checked?: boolean;
}
