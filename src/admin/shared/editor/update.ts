import { Component, OnInit, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export class BaseUpdateComponent<T> {
    constructor(
        protected formMaker: (u?: T) => AbstractControl)
    { }

    protected form: AbstractControl = null;
    close = () => {}
    
    Init(u?: T) {
        this.form = this.formMaker(u);
    }

    Close() {
        this.close();
    }

    OnSubmit = (u: T) => { };
    Previous: T = null;

    protected submit() {
        this.OnSubmit(this.form.value);
    }

}

