
import { BranchFilterModule, BranchFilterService } from './filter';
import { BranchPickerModule } from './picker/picker.module';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    exports: [BranchFilterModule, BranchPickerModule]
})
export class BranchModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BranchFilterModule,
            providers: [BranchFilterService]
        }
    }
}

export { BranchFilterService, BranchFilter } from './filter';


