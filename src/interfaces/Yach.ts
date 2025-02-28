export interface YachInterface {
  user: User;
  yachts: FormDateYachts;
}

interface User {
  firstname: string;
  lastname: string;
  email?: string;
  number?: string;
}

interface FormDateYachts {
  idLocation: string;
  idEngine: string;
  idExperience: string;
  date: string;
  passengers: string;
  price?: string;
  image?: string;
  yachtPackageId?: string;
  points?: string;
  time?: string;
}

export interface PackageYachts {
  yachtPackageId: string;
  image: string;
  time: string;
  name: string;
  passengers: string;
  price: number;
  points: number;
  state: boolean;
  ubicationId: string;
}

export interface PackageYachtsLocation extends PackageYachts {
  origin_destination_ship: Location;
}

interface Location {
  city: City;
  name:string;
}

interface City {
  name:string
}