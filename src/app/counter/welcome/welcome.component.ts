import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }

  settingURL$ = this.route.queryParams.pipe(map(q => q['setting']));
  workingURL: string = '';
  // ok: boolean = false;
  waitingTime = 3000;

  ngOnInit() {

    // this.route.queryParams.subscribe(p => {
    //   this.settingURL = p.setting;
    //   this.workingURL = p.redirect;
    //   this.ok = p.ok;

    //   // if (p.redirect === '/superCounter') ok = this.superCounterSettingService.Check();
    //   // else ok = this.settingService.Check();

    //   if (this.ok) {
    setTimeout(_ => this.Workspace(), this.waitingTime);
    //   } else {
    //     this.router.navigate([this.settingURL], {
    //       relativeTo: this.route
    //     });
    //   }
    // });
  }

  Workspace() {
    this.workingURL = this.route.snapshot.queryParams['redirect'];
    this.router.navigate([this.workingURL], {
      relativeTo: this.route
    });
  }

}
