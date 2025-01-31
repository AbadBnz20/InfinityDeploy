export interface Reservation {
  rom_reservation_id: string;
  destination: string;
  hotel_name: string;
  room_name:string;
  rooms_number: number;
  number_children: number;
  number_adults: number;
  start_date: string;
  end_date: string;
  profile_id: string;
}

export interface ReservationStatus extends Reservation{
    status: string | null;
    error: string | null;
}



export interface StatusReponse {
    data:   null;
    debug:  null;
    error:  string;
    status: string;
}
