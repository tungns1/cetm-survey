import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CurrentUser } from '../../x/platform';
import { AuthService } from '../../shared/auth';

interface ILoginModel {
  username: string;
  password: string;
  auto: boolean;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = (new FormBuilder()).group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.required]
  })
  message = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.IsLogin()) {
      this.authService.OnLoginDone();
      return;
    }
    if (this.authService.autoLogin) {
      let user = CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login();
      }
    }
  }

  login() {
    this.authService.Login(this.loginForm.value).subscribe((v) => {
      this.authService.OnLoginDone();
    }, (e: string) => {
      this.message = e
    });
  }
  logout() {
    this.authService.Logout();
  }

  private IsLogin() {
    return this.authService.IsAuth();
  }

}
