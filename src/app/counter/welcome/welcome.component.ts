import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, CounterSettingService } from '../shared';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private counterService: CounterSettingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const ok = this.counterService.Check();
    if (ok) {
      setTimeout(_ => this.Workspace(), this.waitingTime);
    } else {
      this.router.navigate(["../setting"], {
        relativeTo: this.route
      });
    }
  }

  waitingTime = 3000;

  Workspace() {
    this.router.navigate(["../workspace"], {
      relativeTo: this.route,
      queryParams: this.counterService.Data
    });
  }

}
