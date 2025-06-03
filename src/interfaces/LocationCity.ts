export interface LocationCity {
    data:     Datum[];
    metadata: Metadata;
}

export interface Datum {
    id:          number;
    wikiDataId:  string;
    type:        string;
    city:        string;
    name:        string;
    country:     string;
    countryCode: string;
    region:      string;
    regionCode:  string;
    regionWdId:  string;
    latitude:    number;
    longitude:   number;
    population:  number;
}

export interface Metadata {
    currentOffset: number;
    totalCount:    number;
}
