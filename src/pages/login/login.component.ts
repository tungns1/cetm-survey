import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { HttpError } from '../../x/backend/';
import { Login, Logout, IsAuth, AuthOptions } from '../../shared/auth/';
import * as Platform from '../../x/platform/index';

interface ILoginModel {
  username: string;
  password: string;
  auto: boolean;
}

const ViErrors = {

}

ViErrors['record not found'] = 'Sai tên đăng nhập';
ViErrors['wrong password'] = 'Sai mật khẩu';
ViErrors['unauthorize'] = 'Không đủ quyền truy cập ứng dụng';

function Format(e: string) {
  if (typeof e !== 'string') {
    return '';
  }
  if (ViErrors[e]) {
    return ViErrors[e];
  }
  if (e.toLowerCase().startsWith("unauthorized")) {
    return ViErrors["unauthorize"]
  }
  return e;
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
    if (AuthOptions.auto) {
      let user = Platform.CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login(true);
      }
    }
  }

  login(auto?: boolean) {
    this.loginForm.value.username.toLowerCase();
    Login(this.loginForm.value).subscribe((v) => {
      let redirect = AuthOptions.redirect;
      if (!redirect || redirect.length < 1) {
        redirect = '/';
      }
      this.router.navigateByUrl(redirect);
    }, (e: HttpError) => {
      console.log(e);
      this.message = `Đã có lỗi: ${Format(e.Message())}`;
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