export interface Region {
    data:     Datum[];
    metadata: Metadata;
}

export interface Datum {
    countryCode: string;
    fipsCode:    string;
    isoCode:     string;
    name:        string;
    wikiDataId:  string;
}

export interface Metadata {
    currentOffset: number;
    totalCount:    number;
}
