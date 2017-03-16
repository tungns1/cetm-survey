import { Component } from '@angular/core';

const logoLink = "./assets/img/share/miraway.png"

@Component({
    selector: 'logo',
    template: `<img src="${logoLink}" alt="Miraway" style="height: 28px; margin-top: 3px;">`
})
export class LogoComponent {

}