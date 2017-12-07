import { L10nText, Localize } from '../../util/i18n';
import { MemCache, ID } from '../../shared/';

interface IAttribute {
    key: string;
    value: string;
}

export interface IService extends ID {
    code: string;
    tform_normal: string;
    tform_vip: string;
    image: string;
    l10n: L10nText;
    attrs?: IAttribute[];
    name?: string; // on client side
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class cacheService extends MemCache<IService> {
    ServiceName(id: string) {
        return super.GetName(id, "name");
    }

    protected ToListView(arr: IService[]) {
        return arr.sort((a, b) => a.name < b.name ? -1 : 1);
    }
}

export const CacheService = new cacheService();

export function ServiceName(service_id: string): string {
    const s = CacheService.GetByID(service_id);
    return s ? s.name : 'n/a';
}
CacheService.beforeAdd = AddServiceName;

export function AddServiceName(s: IService) {
    s.name = Localize(s.l10n || {});
}

