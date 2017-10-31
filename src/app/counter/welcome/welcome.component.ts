import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, CounterSettingService, SuperCounterSettingService } from '../shared';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private settingService: CounterSettingService,
    private superCounterSettingService: SuperCounterSettingService,
    private authService: AuthService
  ) {

  }

  settingURL: string = '';
  workingURL: string = '';
  waitingTime = 3000;
  // settingURL: string;

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.settingURL = '..' + p.setting;
      this.workingURL = '..' + p.redirect;
      let ok;

      if (p.redirect === '/superCounter') ok = this.superCounterSettingService.Check();
      else ok = this.settingService.Check();
      
      if (ok) {
        setTimeout(_ => this.Workspace(), this.waitingTime);
      } else {
        this.router.navigate([this.settingURL], {
          relativeTo: this.route
        });
      }
    });
  }

  Workspace() {
    this.router.navigate([this.workingURL], {
      relativeTo: this.route,
      queryParams: this.settingService.Data
    });
  }

}
