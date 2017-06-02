import { Component } from '@angular/core';

const logoLink = "./assets/img/share/miraway.png"

@Component({
    selector: 'logo',
    template: `<img [src]="src" alt="Miraway" style="height: 28px;">`
})
export class LogoComponent {
    src = logoLink;
}