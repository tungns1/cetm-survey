import { L10nText, Localize } from '../shared/l10n/model';

export interface IService {
    id?: string;
    code: string;
    tform_normal: string;
    tform_vip: string;
    image: string;
    priority?: number;
    l10n: L10nText;
    _checked?: boolean;

    name?: string; // on client side
}

export function ServiceName(s: IService): string {
    return Localize(s.l10n || {})
}

export function AddServiceName(s: IService) {
    s.name = ServiceName(s) || '';
}