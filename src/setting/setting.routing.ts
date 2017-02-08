import { Routes, RouterModule } from '@angular/router'
import { Auth } from '../shared/';
import { SettingComponent } from './setting.component';
import { TimeModule} from './time/time.module';
import { FileModule} from './file/file.module';

const children: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'time' },
    { path: 'time', loadChildren: () => TimeModule },
      { path: 'file', loadChildren: () => FileModule },
 
];

export const routing = RouterModule.forRoot([
    {
        path: '',
        canActivate: [Auth.AuthGuard],
        component: SettingComponent,
        children: children
    }
], { useHash: true });