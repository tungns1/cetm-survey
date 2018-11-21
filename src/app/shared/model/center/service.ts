import { L10nText, Localize } from '../../util/i18n';
import { MemCache, ID } from '../../shared/';

interface IAttribute {
    key: string;
    value: string;
}

export interface IServiceGroup extends ID {
    code: string;
    l10n: L10nText;
    attrs?: IAttribute[];
}

export interface IService extends IServiceGroup {
    tform_normal: string;
    tform_vip: string;
    image: string;
    desc?: L10nText;
    priority?: any;
    name?: string; // on client side
    group_id?: string;
    display_group?: string;
}

class cacheService extends MemCache<IService> {
    ServiceName(id: string) {
        return super.GetName(id, "name");
    }

    protected ToListView(arr: IService[]) {
        return arr.sort((a, b) => a.name < b.name ? -1 : 1);
    }
}
class cacheServiceGroup extends MemCache<IServiceGroup> {
    ServiceNameGroup(id: string) {
        return super.GetName(id, "code");
    }

    protected ToListView(arr: IServiceGroup[]) {
        return arr.sort((a, b) => a.code < b.code ? -1 : 1);
    }
}

export const CacheService = new cacheService();

export const CacheServiceGroup = new cacheServiceGroup();

export function ServiceName(service_id: string): string {
    const s = CacheService.GetByID(service_id);
    return s ? s.name : 'n/a';
}
CacheService.beforeAdd = AddServiceName;

export function AddServiceName(s: IService) {
    s.name = Localize(s.l10n || {});
}

