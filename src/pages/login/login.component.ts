import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Login, Logout, IsAuth, AuthOptions } from '../../shared/auth/';
import * as Platform from '../../x/platform/index';

interface ILoginModel {
  username: string;
  password: string;
  auto: boolean;
}

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {

  loginForm = (new FormBuilder()).group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.required]
  })
  message = '';

  constructor(public router: Router) {

  }

  ngOnInit() {
    if (this.IsLogin()) {
      console.log('navigate');
      this.router.navigate(['/']);
      return;
    }
    if (AuthOptions.Auto) {
      let user = Platform.CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login(true);
      }
    }
  }

  login(auto?: boolean) {
    Login(this.loginForm.value).subscribe((v) => {
      let redirect = AuthOptions.Redirect;
      if (!redirect || redirect.length < 1) {
        redirect = ["/"];
      }
      this.router.navigate(redirect);
    }, e => {
      this.message = e.error;
    });
  }

  logout() {
    Logout();
  }

  private IsLogin() {
    return IsAuth();
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/