
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent {
    constructor(
        private authService: Auth.AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.username = this.authService.RxMySetting.map(d => d.me.fullname);
    }

    username = this.authService.RxMySetting.map(d => d.me.fullname)

    Logout() {
        this.authService.Logout();
    }
   onBLur() {
        
       document.getElementById("myMenudrop").style.visibility = "hidden"
   }
    hidden = true;

    Refresh() {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }


    //  myFunction() {
    //     document.getElementById("myDropdown").classList.toggle("show");
    // }

    // window.onclick = function(event) {
    //     if (!event.target.matches('.dropbtn')) {

    //         var dropdowns = document.getElementsByClassName("dropdown-content");
    //         var i;
    //         for (i = 0; i < dropdowns.length; i++) {
    //             var openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) {
    //                 openDropdown.classList.remove('show');
    //             }
    //         }
    //     }
    // }


}