export interface Room {
  IdRoom: string;
  name: string;
  numberOfBeds: number;
  detail: string;
  numberOfGuests: number;
  typeOfBed: string;
  url: string;
  stateRoom: string;
  name_en: string;
  typeOfBed_en: string;
  detail_en: string;
  state: boolean;
  creationDate: string;
}

export interface RoomEmail {
  name: string;
  numberOfBeds: number;
  typeOfBed: string;
  amount: number;
}
