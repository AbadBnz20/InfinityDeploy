export interface OriginDestination {
  categoryId: string;
  name: string;
  origin_destination: Items[];
}
 interface Items {
  origindestinationId: string;
  name: string;
}



export interface OriginDestinationShip {
  origin_destination_ship_id: string;
  name: string;
}