import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { CrudApiService } from '../../shared';
import { ITableAction } from './model';
import { convertToObservable } from './util';
import { Injector } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/publishReplay';

export abstract class BaseAdminComponent<T> {
    constructor(
        protected injector: Injector,
        protected service: CrudApiService<T>
    ) { }

    protected router = this.injector.get(Router);
    protected route = this.injector.get(ActivatedRoute);
    private mdSnackBar = this.injector.get(MdSnackBar);

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

    form$: Observable<AbstractControl> = this.id$.switchMap(id => {
        if (this.isList(id)) {
            return of(null);
        }
        if (this.isNew(id)) {
            return convertToObservable(this.makeForm(null));
        }
        return this.GetByID(id).switchMap(v => {
            return convertToObservable(this.makeForm(v));
        });
    }).share();

    formValue$: Observable<T> = this.form$
        .filter(form => form != null)
        .switchMap(form => {
            return form.valueChanges.startWith(form.value);
        }).publishReplay(1).refCount();


    private onActionRequest(e: ITableAction) {
        console.log('request', e);
        if (e.action === 'add') {
            this.NavigateTo("new");
        } else if (e.action === 'remove-confirm') {
            const id = e.value['id'];
            //const value = this.NavigateTo(id);
            this.HandleMarkDelete(e.value);
            //console.log(".........",value);
        }  else if (e.action === 'edit') {
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
            const ref = this.mdSnackBar.open("The data was created successfully", "CLOSE", {
                duration: 2000,
                extraClasses: ["success"]
            });
            this.NavigateTo();
        })
    }

    protected NavigateTo(view = 'list') {
        console.log('navigate to', view);
        this.router.navigate(['..', view], {
            queryParamsHandling: 'preserve',
            relativeTo: this.route
        });
    }

    protected HandleUpdate(value: T) {
        const id = value['id'];
        this.UpdateByID(id, value).first().subscribe(_ => {
            const ref = this.mdSnackBar.open("The data was saved successfully", "UNDO", {
                duration: 2000,
                extraClasses: ["success"]
            });
            ref.onAction().subscribe(_ => {
                console.log("UNDO");
            });
            this.NavigateTo();
        });
    }

    protected HandleMarkDelete(value: T) {
        const id = value['id'];
        this.MarkDeleteByID(id).first().subscribe(_ => {
            const ref = this.mdSnackBar.open("The data was deleted", "UNDO", {
                duration: 6000,
                extraClasses: ["success"]
            });
            ref.onAction().subscribe(_ => {
                console.log("UNDO");
            });
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