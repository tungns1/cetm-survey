import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemConfigComponent } from './system-config.component';
import { RouterModule } from '@angular/router';
import { SharedModule, EditorModule } from '../../shared';
import { MatTabsModule } from '@angular/material';

export const routing = RouterModule.forChild([
    {
        path: '',
        pathMatch: 'full',
        component: SystemConfigComponent
    }
]);

@NgModule({
  imports: [
    CommonModule, routing, SharedModule, EditorModule, MatTabsModule
  ],
  declarations: [SystemConfigComponent]
})
export class SystemConfigModule { }
