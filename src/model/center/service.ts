import { L10nText, Localize } from '../../shared/l10n/model';

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

export function ServiceName(service_id: string): string {
    const s = Services.get(service_id);
    return s? s.name : 'n/a';
}

export function AddServiceName(s: IService) {
    s.name = Localize(s.l10n || {});
}


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxServices = new BehaviorSubject<IService[]>([]);
export const Services = new Map<string, IService>();
RxServices.subscribe(services => {
    services.forEach(s => {
        AddServiceName(s);
        Services.set(s.id, s);
    })
})