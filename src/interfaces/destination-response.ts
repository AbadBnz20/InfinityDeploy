export interface DestinationResponse {
    data:   Data;
    debug:  Debug;
    status: string;
    error:  null;
}

export interface Data {
    hotels:  Hotel[];
    regions: Region[];
}

export interface Hotel {
    id:        string;
    hid:       number;
    name:      string;
    region_id: number;
}

export interface Region {
    id:           number;
    name:         string;
    type:         string;
    country_code: string;
}

export interface Debug {
    request:          Request;
    key_id:           number;
    validation_error: null;
}

export interface Request {
    query:    string;
    language: string;
}
