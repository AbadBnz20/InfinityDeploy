export interface City {
  data: Datum[];
  metadata: Metadata;
}

export interface Datum {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  country: string;
  countryCode: string;
  region: string;
  regionWdId: string;
}

export interface Metadata {
  currentOffset: number;
  totalCount: number;
}
