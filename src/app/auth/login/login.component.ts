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


  query = this.route.snapshot.queryParamMap;

  ngOnInit() {
    const autoLogin = this.query.get("auto_login") === "true" ? true : false;
    if (autoLogin) {
      let user = CurrentUser();
      if (user) {
        this.loginForm.controls['username'].setValue(user);
        this.login(true);
      }
    }
  }

  login(auto?: boolean) {
    const userInput = this.loginForm.value;
    const data = {
      username: userInput.username,
      password: userInput.password,
      scope: this.query.get("scope"),
      auto_login: auto,
      branch_code: this.query.get("branch_code"),
    }

    this.authService.Login(data).subscribe((v) => {
      if (v.user.role === 'media') {
        const redirect = '/admin/house/screen';
        this.router.navigateByUrl(redirect);
      }
      else {
        const redirect = this.query.get("redirect") || "/";
        this.router.navigateByUrl(redirect);
      }
    }, (e: HttpError) => {
      this.message = e.Message();
    });
  }
}
