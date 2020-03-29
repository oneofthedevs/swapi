import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, public app: AppComponent) {
    this.app.spinner = true;
  }
  count;
  data;
  ngOnInit() {
    this.http
      .get("https://swapi.co/api/people/")
      .subscribe((thisdata: any[]) => {
        this.data = thisdata["results"];
        this.app.spinner = false;
      });
  }
}
