import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { mdlTrip, mdlTripResults } from "../Interfaces/Travel";

export interface IAdvertisingService {
  IAdvertisingService(keyword: string): Observable<mdlTrip>;
}

@Injectable({
  providedIn: "root",
})
export class TravelService {
  constructor(private http: HttpClient) {}

  SaveTrip(trip: mdlTrip): Observable<mdlTripResults> {
    var url: string;
    url = `${environment.baseURL}/SaveTrip`;
    return this.http
      .post<mdlTrip>(url,trip )
      .pipe(map((data) => this.TransformToDisplayResults(data)));
  }

  private TransformToDisplayResults(data: mdlTrip): mdlTripResults {
    //this.logresult(data);
    return {
      user: data.userName,
      travelDate: data.travelDate,
      travelDistance: data.travelDistance,
      travelTime: data.travelTime,
      googleTravelTime: data.googleTravelTime,
      fromAddress: data.startPoint.address,
      toAddress: data.endPoint.address,
      fromTime: data.startPoint.tpDate,
      toTime: data.endPoint.tpDate
    };
  }

  // private logresult(data: mdlTrip) {
  //   console.log("*********** raw data ***********");
  //   console.log(data);
  //   console.log("*********** raw data ***********");
  // }
}
