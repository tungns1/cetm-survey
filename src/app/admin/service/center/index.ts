import { TFormService } from './tform';
import { ServiceService } from './service';
import { LayoutService } from './layout';
import { HttpApi, HttpServiceGenerator } from '../../shared';
import {} from '../shared';

export const centerServiceProviders = [
    TFormService,
    ServiceService,
    LayoutService
]

export class CenterService {
    constructor() {

    }
}

export { TFormService } from './tform';
export { ServiceService } from './service';
export { LayoutService } from './layout';
