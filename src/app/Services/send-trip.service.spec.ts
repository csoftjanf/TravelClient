import { HttpBackend, HttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";

import { mdlTrip, mdlTravelPoint, mdlTripResults } from "../Interfaces/Travel";
import { TravelService } from "./send-trip.service";

describe("TravelService", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let issTravelService: TravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TravelService],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    issTravelService = new TravelService(httpClient);
  });

  it("exists", inject([TravelService], (service: TravelService) => {
    expect(service).toBeTruthy();
  }));

  describe("savetrip", () => {
    // populate trip object
    const myTrip = new mdlTrip();
    myTrip.userNumber = 1234;
    myTrip.userName = "user";
    myTrip.travelDate = "2020-06-18";
    myTrip.startPoint = new mdlTravelPoint();
    myTrip.endPoint = new mdlTravelPoint();


    it("gets the location of the ISS now", () => {
      issTravelService.SaveTrip(myTrip).subscribe((x) => {
        expect(x).toEqual( new mdlTripResults());
      });
      const req = httpTestingController.expectOne(
        "http://api.open-notify.org/iss-now.json"
      );
      expect(req.request.method).toEqual("GET");
      req.flush({
        iss_position: { longitude: "-138.1719", latitude: "44.4423" },
        timestamp: 1525950644,
        message: "success",
      });
      httpTestingController.verify();
    });
  });
});
