import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'branch-selector',
    template: `
    <div>
           <span translate>LABEL_SELECT_AREA</span> 
            <multi-branch-selector level="2"></multi-branch-selector>
        </div>
        <div>
           <span translate>LABEL_SELECT_BRACNH</span> 
            <multi-branch-selector level="1"></multi-branch-selector>
           <span translate>LABEL_SELECT_SUB_BRACNH</span>  
        </div>
        <div>
            <multi-branch-selector level="0"></multi-branch-selector>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchSelectorComponent {
    
}
