import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Backend, Platform } from '../../shared';
import { Auth } from '../../service';
import { I18nHttpError } from './errors';

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

  constructor(
    private authService: Auth.AuthService
  ) { }

  ngOnInit() {
    if (this.IsLogin()) {
      this.authService.OnLoginDone();
      return;
    }
    if (this.authService.autoLogin) {
      let user = Platform.CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login();
      }
    }
  }

  login() {
    this.authService.Login(this.loginForm.value).subscribe((v) => {
      this.authService.OnLoginDone();
    }, (e: Backend.HttpError) => {
      console.log(e);
      this.message = I18nHttpError(e);
    });
  }
  logout() {
    this.authService.Logout();
  }

  private IsLogin() {
    return this.authService.IsAuth();
  }
}

