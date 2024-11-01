import { Hotel } from "./hotels-response";

export interface DetailsResponse {
    data:   DataDetails;
    debug:  null;
    error:  null;
    status: string;
}

export interface DataDetails {
    address:                          string;
    amenity_groups:                   AmenityGroup[];
    check_in_time:                    string;
    check_out_time:                   string;
    description_struct:               Struct[];
    email:                            string;
    facts:                            Facts;
    front_desk_time_end:              string;
    front_desk_time_start:            string;
    hid:                              number;
    hotel_chain:                      string;
    id:                               string;
    images:                           string[];
    images_ext:                       ImagesEXT[];
    is_closed:                        boolean;
    is_gender_specification_required: boolean;
    keys_pickup:                      KeysPickup;
    kind:                             string;
    latitude:                         number;
    longitude:                        number;
    metapolicy_extra_info:            string;
    metapolicy_struct:                MetapolicyStruct;
    name:                             string;
    payment_methods:                  string[];
    phone:                            string;
    policy_struct:                    Struct[];
    postal_code:                      string;
    region:                           Region;
    room_groups:                      RoomGroup[];
    serp_filters:                     string[];
    star_certificate:                 null;
    star_rating:                      number;
}
export interface DataDetailsRooms  {
    DataDetails:DataDetails,
    RoomsCheck:Hotel
}

export interface AmenityGroup {
    amenities:          string[];
    group_name:         string;
    non_free_amenities: string[];
}

export interface Struct {
    paragraphs: string[];
    title:      string;
}

export interface Facts {
    electricity:    Electricity;
    floors_number:  null;
    rooms_number:   number;
    year_built:     null;
    year_renovated: null;
}

export interface Electricity {
    frequency: number[];
    sockets:   string[];
    voltage:   number[];
}

export interface ImagesEXT {
    category_slug: string;
    url:           string;
}

export interface KeysPickup {
    apartment_extra_information: string;
    apartment_office_address:    string;
    email:                       string;
    is_contactless:              boolean;
    phone:                       string;
    type:                        string;
}

export interface MetapolicyStruct {
    add_fee:            any[];
    check_in_check_out: any[];
    children:           any[];
    children_meal:      any[];
    cot:                any[];
    deposit:            any[];
    extra_bed:          any[];
    internet:           any[];
    meal:               any[];
    no_show:            NoShow;
    parking:            any[];
    pets:               any[];
    shuttle:            Shuttle[];
    visa:               Visa;
}

export interface NoShow {
    availability: string;
    day_period:   string;
    time:         string;
}

export interface Shuttle {
    currency:         string;
    destination_type: string;
    inclusion:        string;
    price:            string;
    shuttle_type:     string;
}

export interface Visa {
    visa_support: string;
}

export interface Region {
    country_code: string;
    iata:         string;
    id:           number;
    name:         string;
    type:         string;
}

export interface RoomGroup {
    images:         string[];
    images_ext:     ImagesEXT[];
    name:           string;
    name_struct:    NameStruct;
    rg_ext:         { [key: string]: number };
    room_amenities: string[];
    room_group_id:  number;
}

export interface NameStruct {
    bathroom:     string;
    bedding_type: BeddingType;
    main_name:    string;
}

export enum BeddingType {
    CamaDoble = "cama doble",
    Empty = "",
    The2CamasIndividuales = "2 camas individuales",
}
