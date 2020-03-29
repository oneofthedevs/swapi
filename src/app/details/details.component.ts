import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public app: AppComponent
  ) {
    this.app.spinner = true;
  }

  ids;
  data;
  planet;
  species;
  spurl;
  ngOnInit() {
    this.ids = this.route.params.subscribe(v =>
      this.http
        .get("https://swapi.co/api/people/" + (Number(v["id"]) + 1))
        .subscribe((thisdata: any[]) => {
          this.data = thisdata;
          this.spurl = this.data["species"]["0"];
          this.http.get(this.data["homeworld"]).subscribe((home: any) => {
            this.planet = home;
          });
          this.http.get(this.spurl).subscribe((thespecies: any) => {
            this.species = thespecies;
          });
          this.app.spinner = false;
        })
    );
  }
}
