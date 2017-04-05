import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { CrudApiService } from '../../shared';
import { ITableAction } from './model';
import { convertToObservable } from './util';

export abstract class BaseAdminComponent<T> {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: CrudApiService<T>
    ) { }


    id$ = this.route.params.map(p => p['id']);
    showList$ = this.id$.map(id => this.isList(id));
    isNew$ = this.id$.map(id => this.isNew(id));
    data$ = this.service.RxListView;
    active$: Observable<T> = this.id$.switchMap(id => {
        if (this.isList(id) || this.isNew(id)) {
            return of(null);
        }
        return this.GetByID(id);
    });

    form$ = this.id$.switchMap(id => {
        if (this.isList(id)) {
            return of(<T>null);
        }
        if (this.isNew(id)) {
            const form = this.makeForm(null);
            return convertToObservable<T>(form);
        }
        return this.GetByID(id).switchMap(v => {
            return convertToObservable<T>(this.makeForm(v));
        });
    });


    private onActionRequest(e: ITableAction) {
        console.log('request', e);
        if (e.action === 'add') {
            this.NavigateTo("new");
        } else if (e.action === 'remove') {
            const id = e.value['id'];
            this.NavigateTo(id);
        } else if (e.action === 'edit') {
            const id = e.value['id'];
            this.NavigateTo(id);
        }
    }

    protected onActionConfirm(action: string, value: T) {
        if (action === 'add') {
            this.HandleNew(value);
        } else if (action === 'remove') {
            this.HandleMarkDelete(value);
        } else if (action === 'edit') {
            this.HandleUpdate(value);
        }
    }

    protected HandleNew(value: T) {
        this.service.Create(value).subscribe(_ => {
            this.NavigateTo();
        })
    }

    protected NavigateTo(view = 'list') {
        console.log('navigate to', view);
        this.router.navigate(['..', view], {
            relativeTo: this.route
        });
    }

    protected HandleUpdate(value: T) {
        const id = value['id'];
        this.UpdateByID(id, value).first().subscribe(_ => {
            this.NavigateTo();
        });
    }

    protected HandleMarkDelete(value: T) {
        const id = value['id'];
        this.MarkDeleteByID(id).first().subscribe(_ => {
            this.NavigateTo();
        });
    }

    protected GetByID(id: string) {
        return this.service.GetByID(id);
    }

    protected MarkDeleteByID(id: string) {
        return this.service.MarkDelete(id);
    }

    protected UpdateByID(id: string, value: T) {
        return this.service.UpdateByID(id, value);
    }

    protected abstract makeForm(value?: T): Observable<AbstractControl> | AbstractControl;
    protected form: AbstractControl;



    private isList(id: string = '') {
        return id.length < 2 || id === 'list';
    }

    private isNew(id: string) {
        return id === 'new';
    }

    private action$ = this.id$.map(id => {
        if (this.isList(id)) {
            return 'list';
        }
        if (this.isNew(id)) {
            return 'new';
        }
        return 'edit';
    })
}