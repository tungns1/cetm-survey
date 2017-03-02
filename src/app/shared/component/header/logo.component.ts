import { Component } from '@angular/core';

const logoLink = "../assets/img/share/miraway.png"
const logoWidth = "120px"

@Component({
    selector: 'logo',
    template: `<img src="${logoLink}" alt="Miraway" style="max-width:${logoWidth};height:35px">`
})
export class LogoComponent {

}