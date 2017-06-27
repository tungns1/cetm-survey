import { Component, OnInit } from "@angular/core";
import { ListenToRouter } from '../lib/backend/loading';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private router: Router
  ) { }

  title = "app works!";
  ngOnInit(){
    ListenToRouter(this.router);
  }
}
