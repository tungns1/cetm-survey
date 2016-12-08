import { Component } from '@angular/core';

@Component({
    selector: 'side-bar',
    template: `
    
    <button (click)="toggle()">
        <i class="fa fa-bars"></i>
    </button>
    <div *ngIf="shown">
        <ng-content></ng-content>
    </div>
    `
})
export class SideBarComponent {
    shown = true;
    toggle() {
        this.shown = !this.shown;
    }
}