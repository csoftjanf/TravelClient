import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { mdlTrip, mdlTravelPoint, mdlTripResults } from "../Interfaces/Travel";
import { TravelService } from "../services/send-trip.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
  providers: [DatePipe],
})
export class Tab1Page {
  public myname: string;
  public myTrip: mdlTrip;
  public TripResults: mdlTripResults;
  public isLoaded: boolean;
  public isStarted: boolean;
  public isEnded: boolean;

  constructor(
    public travelService: TravelService,
    public datePipe: DatePipe,
    private geolocation: Geolocation
  ) {
    this.myname = "jan Fischer";
    this.InitData();
  }

  public StartTrip() {
    // start button to populate
    this.geolocation.getCurrentPosition().then((resp) => {
        const start = new mdlTravelPoint();
        start.latitude = resp.coords.latitude;
        start.longitude = resp.coords.longitude;
        start.tpDate = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm");

        this.myTrip.startPoint = start;
        this.isStarted = true;

      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  public LogTrip() {
    // end button get geo location and call save the trip with
    this.geolocation.getCurrentPosition().then((resp) => {
        const end = new mdlTravelPoint();
        end.latitude = resp.coords.latitude;
        end.longitude = resp.coords.longitude;
        end.tpDate = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm");
        this.myTrip.endPoint = end;

        // submit to server
        this.travelService.SaveTrip(this.myTrip).subscribe((data) => {
          this.TripResults = data;
          this.isLoaded = true;
          this.isEnded = true;
          this.isStarted = false;
        });
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  public NewTrip() {
    this.InitData();
  }

  private InitData() {
    // populate trip object
    this.myTrip = new mdlTrip();
    this.myTrip.userNumber = 1234;
    this.myTrip.userName = this.myname;
    this.myTrip.travelDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.myTrip.startPoint = new mdlTravelPoint();
    this.myTrip.endPoint = new mdlTravelPoint();

    // set flag to control visible components
    this.isLoaded = false;
    this.isStarted = false;
    this.isEnded = false;

    // init result class
    this.TripResults = new mdlTripResults();
  }
}
