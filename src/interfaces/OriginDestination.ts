export interface OriginDestination {
  categoryId: string;
  name: string;
  name_en: string;
  origin_destination: Items[];
}
interface Items {
  origindestinationId: string;
  name_en: string;
  name: string;
}

export interface OriginDestinationShip {
  origin_destination_ship_id: string;
  name: string;
}
