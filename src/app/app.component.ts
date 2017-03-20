import { Component } from "@angular/core";
import { I18nService } from "./shared";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private translate: I18nService) { }

  title = "app works!";
}
