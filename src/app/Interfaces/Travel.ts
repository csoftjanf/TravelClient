
export class mdlTrip
{
    userNumber: number;
    userName: string;
    travelDate: string;
    travelDistance: number;
    travelTime: number;
    googleTravelTime: number;
    startPoint: mdlTravelPoint;
    endPoint: mdlTravelPoint;
}

export class mdlTravelPoint{
    address: string;
    latitude: number;
    longitude: number;
    tpDate: string;
}

export class mdlTripResults
{
    user: string;
    travelDate: string;
    travelDistance: number;
    travelTime: number;
    googleTravelTime: number;
    fromAddress: string;
    toAddress: string;
}

