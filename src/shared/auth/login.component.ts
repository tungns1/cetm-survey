import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import * as Auth from './auth.service';
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

  constructor(public router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (Auth.IsLoggedIn()) {
      this.router.navigate(['']);
      return;
    }
    const auto = this.param('auto');
    if (auto) {
      let user = Platform.CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login(true);
      }
    }
  }

  login(auto?: boolean) {
    let form = this.loginForm.value;
    form['auto'] = auto;
    Auth.Login(form).subscribe((v) => {
      let redirect = this.route.snapshot.queryParams['redirect'];
      this.router.navigate(redirect);
    }, e => {
      this.message = e.error;
    });
  }

  logout() {
    Auth.Logout();
  }

  private param(key: string) {
    return this.route.snapshot.queryParams[key];
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/