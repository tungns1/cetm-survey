import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of ,  Observable } from 'rxjs';
import { CrudApiService, HttpError } from '../../shared';

import { ITableAction } from './model';
import { convertToObservable } from './util';
import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '../../../../shared/util';
import { ShowLoading, HideLoading } from '../../../../../lib/backend/loading';
import { share, publishReplay, refCount, filter, first, switchMap, startWith, map } from 'rxjs/operators';

export abstract class BaseAdminComponent<T> {
    constructor(
        protected injector: Injector,
        protected service: CrudApiService<T>
    ) { }

    protected router = this.injector.get(Router);
    protected route = this.injector.get(ActivatedRoute);
    protected matSnackBar = this.injector.get(MatSnackBar);
    protected translateService = new TranslateService;

    private layoutTag: string;

    id$ = this.route.params.pipe(map(p => p['id']));
    showList$ = this.id$.pipe(map(id => this.isList(id)));
    isNew$ = this.id$.pipe(map(id => this.isNew(id)));
    data$ = this.service.RxListView;
    active$: Observable<T> = this.id$.pipe(switchMap(id => {
        if (this.isList(id) || this.isNew(id)) {
            return of(null);
        }
        return this.GetByID(id);
    }));

    form$: Observable<FormGroup> = this.id$.pipe(switchMap(id => {
        if (this.isList(id)) {
            return of(null);
        }
        if (this.isNew(id)) {
            return convertToObservable(this.makeForm(null));
        }
        return this.GetByID(id).pipe(switchMap(v => {
            return convertToObservable(this.makeForm(v));
        }));
    }),share(),publishReplay(1),refCount());

    formValue$: Observable<T> = this.form$
        .pipe(filter(form => form != null),
        switchMap(form => {
            // getRawValue will get all value regardless of disabled state
            return form.valueChanges.pipe(startWith(null)
                ,map(_ => form.getRawValue()));
        }),share(),publishReplay(1),refCount());


    private onActionRequest(e: ITableAction) {
        // console.log('request', e);
        if (e.action === 'add') {
            this.NavigateTo("new");
        } else if (e.action === 'remove-confirm') {
            const id = e.value['id'];
            //const value = this.NavigateTo(id);
            this.HandleMarkDelete(e.value);
            //console.log(".........",value);
        } else if (e.action === 'edit') {
            const id = e.value['id'];
            this.NavigateTo(id);
        }
    }

    protected onActionConfirm(action: string, v?: T) {
        this.form$.pipe(first()).subscribe(form => {
            if (!form) {
                console.log("request action for null form");
                return;
            }
            const value = form.getRawValue();
            if (action === 'add') {
                this.HandleNew(value);
            } else if (action === 'remove') {
                this.HandleMarkDelete(value);
            } else if (action === 'edit') {
                this.HandleUpdate(value);
            }
        });
    }

    protected HandleNew(value: T) {
        ShowLoading();
        this.service.Create(value).subscribe(_ => {
            this.NavigateTo();
            const ref = this.matSnackBar
                .open(this.translateService.translate('The data was created successfully'),
                this.translateService.translate('Close'), {
                    duration: 6000,
                    panelClass: ["success"]
                });
            HideLoading();
        }, (e: HttpError) => {
            HideLoading();
            const ref = this.matSnackBar.open(this.translateService.translate(e.Message()), '', { duration: 6000 });
        });
    }

    protected NavigateTo(view = 'list') {
        console.log('navigate to', view);
        this.route.params.pipe(first()).subscribe(p => {
            if (p.tag) this.layoutTag = p.tag;
        })
        this.router.navigate(['..', view, { tag: this.layoutTag }], {
            queryParamsHandling: 'preserve',
            relativeTo: this.route
        });
    }

    protected HandleUpdate(value: T) {
        ShowLoading();
        const id = value['id'];
        this.UpdateByID(id, value).pipe(first()).subscribe(_ => {
            this.NavigateTo();
            const ref = this.matSnackBar
                .open(this.translateService.translate('The data was saved successfully'),
                this.translateService.translate('Close'), {
                    duration: 6000,
                    panelClass: ["success"]
                });
            ref.onAction().subscribe(_ => {
                console.log("UNDO");
            });
            HideLoading();
        }, (e: HttpError) => {
            HideLoading();
            const ref = this.matSnackBar.open(this.translateService.translate(e.Message()), '', { duration: 6000 });
        });
    }

    protected HandleMarkDelete(value: T) {
        ShowLoading();
        const id = value['id'];
        this.MarkDeleteByID(id).pipe(first()).subscribe(_ => {
            this.NavigateTo();
            const ref = this.matSnackBar
                .open(this.translateService.translate('The data was deleted'),
                this.translateService.translate('Close'), {
                    duration: 6000,
                    panelClass: ["success"]
                });
            ref.onAction().subscribe(_ => {
                console.log("UNDO");
            });
            HideLoading();
        }, (e: HttpError) => {
            HideLoading();
            const ref = this.matSnackBar.open(this.translateService.translate(e.Message()), '', { duration: 6000 });
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

    protected abstract makeForm(value?: T): Observable<FormGroup> | FormGroup;
    protected form: FormGroup;



    private isList(id: string = '') {
        return id.length < 2 || id === 'list';
    }

    private isNew(id: string) {
        return id === 'new';
    }

    private action$ = this.id$.pipe(map(id => {
        if (this.isList(id)) {
            return 'list';
        }
        if (this.isNew(id)) {
            return 'new';
        }
        return 'edit';
    }))
}