import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Backend } from '../../../shared/';
import { AbstractControl } from '@angular/forms';
import { BaseUpdateComponent } from './update';

function Error(message: string) {
    console.log(message);
}

function Success(message: string) {
    console.log(message);
}

import { Input, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

export class BaseEditorComponent<T> {
    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected viewContainerRef: ViewContainerRef,
        protected service: Backend.HttpApi<T>,
        protected updateComponent: typeof BaseUpdateComponent) { }

    dialog: ComponentRef<BaseUpdateComponent<T>>;
    err:string;

    editor(previous?: T) {
        
        this.dialog = this.createDialog();
        this.dialog.instance.Init(previous);
        this.dialog.instance.Previous = previous;

        this.dialog.instance.OnSubmit = (newValue: T) => {
            if (previous) {
                this.Update(newValue);
            } else {
                this.Create(newValue);
            }
        }

        this.dialog.instance.close = () => {
            this.dialog.destroy();
            this.dialog = null;
        }
    }

    createDialog() {
        let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.updateComponent);
        let ref = this.viewContainerRef.createComponent(dialogComponentFactory);
        return ref;
    }

    Refresh() {

    }

    private closeDialog() {
        this.viewContainerRef.clear();
    }

    Delete(id: string) {
        this.service.MarkDelete(id).subscribe(_ => {
            Success("Xóa thành công");
            this.Refresh();
        }, err => {
            this.err=err.error;
            Error(err.error);
        });
    }

    Create(u: T) {
        this.service.Create(u).subscribe(_ => {
            Success("Lưu thành công");
            this.Refresh();
            this.closeDialog();
        }, err => {
            this.err=err.error;
            Error(err.error);
        });
    }

    Update(u: T) {
        this.service.Update(u).subscribe(_ => {
            Success("Sửa thành công");
            this.Refresh();
            this.closeDialog();
        }, err => {
            this.err=err.error;
            Error(err.error);
        });
    }
}