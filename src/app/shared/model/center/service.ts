import { L10nText, Localize } from '../../util/i18n';
import { MemCache, ID } from '../../shared/';

export interface IService extends ID {
    code: string;
    tform_normal: string;
    tform_vip: string;
    image: string;
    priority?: number;
    l10n: L10nText;
    _checked?: boolean;

    name?: string; // on client side
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const CacheService = new MemCache<IService>();

export function ServiceName(service_id: string): string {
    const s = CacheService.GetByID(service_id);
    return s ? s.name : 'n/a';
}
CacheService.beforeAdd = AddServiceName;

export function AddServiceName(s: IService) {
    s.name = Localize(s.l10n || {});
}

