import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'branch-selector',
    template: `
    <div>
            Chọn Tỉnh/Thành
            <multi-branch-selector level="2"></multi-branch-selector>
        </div>
        <div>
            Chọn chi nhánh
            <multi-branch-selector level="1"></multi-branch-selector>
            Chọn phòng giao dịch
        </div>
        <div>
            <multi-branch-selector level="0"></multi-branch-selector>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchSelectorComponent {
    
}
