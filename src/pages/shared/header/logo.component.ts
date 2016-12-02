import { Component } from '@angular/core';

const logoLink = "../asset/img/share/miraway.png"
const logoWidth = "120px"

@Component({
    selector: 'logo',
    template: `<img src="${logoLink}" alt="Miraway" style="max-width:${logoWidth};height:auto">`
})
export class LogoComponent {

}