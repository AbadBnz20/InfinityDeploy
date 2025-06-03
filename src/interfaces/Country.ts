export interface Country {
    data:     Datum[];
    metadata: Metadata;
}

export interface Datum {
    code:          string;
    currencyCodes?: string[];
    name:          string;
    wikiDataId?:    string;
}

export interface Metadata {
    currentOffset: number;
    totalCount:    number;
}
