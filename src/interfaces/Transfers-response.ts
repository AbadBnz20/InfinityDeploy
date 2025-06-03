export interface Car {
  carId: string;
  model: string;
  plate: string;
  ability: number;
  image: string;
  description: string;
  transferprice: number;
  state: boolean;
  type: string;
  brand: string;
  color: string;
  model_en: string;
  description_en: string;
  type_en: string;
  brand_en: string;
  color_en: string;
}

export interface Transfer {
  going: Car[];
  return: Car[] | null;
}

export interface Destination {
  origindestinationId: string;
  name: string;
}

export interface DetailsDestination {
  origin: string;
  origin_en: string;
  destination: string;
  destination_en: string;
  car: Car | null;
}
