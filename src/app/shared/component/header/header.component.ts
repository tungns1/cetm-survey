import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RuntimeEnvironment } from '../../env/';
import { map } from 'rxjs/operators';

@Component({
    selector: "app-header",
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    constructor(
        private env: RuntimeEnvironment
    ) { }

    _isServing
    @Input() app: 'qapp' | 'counter' | 'superCounter' = 'qapp';
    @Input() set isServing(d: boolean) {
        this._isServing = d;
    };

    moduleName$ = this.env.Auth.Data$.pipe(map(a => a.module));
    subModuleName$ = this.env.Auth.Data$.pipe(map(a => a.sub_module));

}