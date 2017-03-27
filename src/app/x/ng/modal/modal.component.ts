import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'modal-header',
    template: `<ng-content></ng-content>`
})
export class ModalHeaderComponent {}

@Component({
    selector: 'modal-footer',
    template: `<ng-content></ng-content>`
})
export class ModalFooterComponent {}

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html'
})
export class ModalComponent {
    opened = false;
    Open() {
        this.opened = true;
    }
    Close() {
        this.opened = false;
    }
}