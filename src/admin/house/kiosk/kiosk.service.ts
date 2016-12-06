
import {FormBuilder, Validators} from '@angular/forms';
import {IKiosk} from '../../../o/house/kiosk';

export {IKiosk} from '../../../o/house/kiosk';
import { SelectedBranchIDLevel0 } from '../../../o/branch/branch.module';

export function NewKioskForm(b?: IKiosk) {
    b = b || <any>{branch_id: SelectedBranchIDLevel0.value};
    return (new FormBuilder).group({
        id: [b.id],
        code: [b.code, Validators.required],
        name: [b.name, Validators.required],
        services: [b.services],
        branch_id: [b.branch_id, Validators.required],
        vcodes: [b.vcodes],
        layout_id: [b.layout_id],
        parent_id: [b.parent_id],
        inheritable: [b.inheritable]
    });
}

import {NewService} from '../../auth.service';

export const KioskService = NewService<IKiosk>("/api/admin/house/kiosk");

export function GetByBranch(branch_id: string) {
    return KioskService.Search({ branch_id: branch_id });
}
