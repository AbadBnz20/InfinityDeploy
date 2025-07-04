export interface WeekMinuteResponse {
  title: string;
  url: string;
  background_image: string;
}

export interface Resort {
  background_image: string;
  resort_location: string;
  resort_name: string;
  price: string;
  see_resort_url: string;
}

export interface TraverRoom {
  resort_name: string;
  images: string[];
  starting_price: string;
  property_id: string;
  address: string;
  phone: string;
  overview: string;
  housekeepingFees: string[];
  availabilityList: {
    travelDates: { startDate: string; endDate: string };
    unitDetails: string[];
    price:string;
    pricePerNight: string;
  }[];
}
