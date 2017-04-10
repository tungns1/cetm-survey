import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUser } from '../../x/platform';
import { AuthService, HttpError } from '../shared';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }


  loginForm = (new FormBuilder()).group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.required]
  });

  message = '';

  ngOnInit() {
    const autoLogin = false;
    if (autoLogin) {
      let user = CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login();
      }
    }
  }

  login() {
    const query = this.route.snapshot.queryParamMap;
    const userInput = this.loginForm.value;
    const auto_login = query.get("auto_login") === "true" ? true : false;
    const data = {
      username: userInput.username,
      password: userInput.password,
      scope: query.get("scope"),
      auto_login,
      branch_code: query.get("branch_code"),
    }

    this.authService.Login(data).subscribe((v) => {
      const redirect = query.get("redirect") || "/";
      this.router.navigateByUrl(redirect);
    }, (e: HttpError) => {
      this.message = e.Message();
    });
  }
}
