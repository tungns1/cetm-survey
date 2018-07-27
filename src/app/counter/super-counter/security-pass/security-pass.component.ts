import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-security-pass',
  templateUrl: './security-pass.component.html',
  styleUrls: ['./security-pass.component.scss']
})
export class SecurityPassComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  @Input() nav = '';
  // click at least min_click within min_second to activate
  @Input() minClick = 1;
  @Input() minSecond = 8;
  @Input() password = "";

  askPassword = false;
  private pass = '';

  clicks: number[] = []; // record the time of the event

  private checkClicks() {
    const oldest = Date.now() - this.minSecond * 1000;
    this.clicks = this.clicks.filter(c => c >= oldest);
    return this.clicks.length >= this.minClick;
  }

  onClick() {
    this.clicks.push(Date.now());
    if (this.checkClicks()) {
      this.onActivate();
    }
  }

  onActivate() {
    if (this.checkPassword()) {
      this.router.navigate([this.nav], {
        queryParamsHandling: 'preserve',
        relativeTo: this.route
      });
    }
  }

  checkPassword() {
    if (!this.password || this.password.length < 1) {
      return true;
    }
    if (this.password == this.pass) {
      return true;
    }
    this.askPassword = true;
    // show password dialog
    return false;
  }

  add(i: number) {
    this.pass += i;
    if (this.pass == this.password) {
      this.onActivate();
      this.askPassword = false;
      this.pass = '';
    }
  }
  
  clear() {
    this.pass = '';
  }

  cancel() {
    this.pass = '';
    this.askPassword = false;
    this.clicks = [];
  }
}
