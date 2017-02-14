import { Component, Input } from '@angular/core';

@Component({
    selector: 'table-view',
    template: `
    <table width="100%" style="border: 1px solid #dee0df; border-radius: 3px;">
        <thead class="hl-thr-editor">
            <td> STT </td>
            <td *ngFor="let fi of fields">{{fi.title}} </td>
            <td></td>
        </thead>
        <tr *ngFor="let da of data; let i = index">
            <td>{{i+1}}</td>
            <td *ngFor="let fi of fields">{{da[fi.name]}}</td>
            <td>
                <img src="assets/img/edit.png" alt="Edit" style="cursor: pointer;margin: 5px 10px;" (click)="editor(user)">
                <img src="assets/img/delete.png" alt="Delete" style="cursor: pointer; margin: 5px 10px;" (click)="Delete($event)">
            </td>
        </tr>
    </table>
    `
})
export class TableComponent {
    @Input() data: any[] = [];
    @Input() fields: { title: string, name: string }[] = [];
}