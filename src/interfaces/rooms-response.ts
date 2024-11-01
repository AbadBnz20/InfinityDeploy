export interface RoomsResponse {
    data:   Data;
    debug:  Debug;
    status: string;
    error:  null;
}

export interface Data {
    hotels: Hotel[];
}

export interface Hotel {
    id:    string;
    hid:   number;
    rates: Rate[];
}

export interface Rate {
    book_hash:       string;
    match_hash:      string;
    daily_prices:    string[];
    meal:            string;
    meal_data:       MealData;
    payment_options: PaymentOptions;
    rg_ext:          { [key: string]: number };
    room_name:       string;
    room_name_info:  null;
    serp_filters:    SerpFilter[];
    allotment:       number;
    amenities_data:  string[];
    any_residency:   boolean;
    deposit:         null;
    no_show:         NoShow;
    room_data_trans: RoomDataTrans;
}

export interface MealData {
    value:         string;
    has_breakfast: boolean;
    no_child_meal: boolean;
}

export interface NoShow {
    amount:        string;
    currency_code: Currency;
    from_time:     string;
}

export enum Currency {
    Hnl = "HNL",
    Usd = "USD",
}

export interface PaymentOptions {
    payment_types: PaymentType[];
}

export interface PaymentType {
    amount:                   string;
    show_amount:              string;
    currency_code:            Currency;
    show_currency_code:       Currency;
    by:                       null | string;
    is_need_credit_card_data: boolean;
    is_need_cvc:              boolean;
    type:                     string;
    tax_data:                 TaxData;
    cancellation_penalties:   CancellationPenalties;
}

export interface CancellationPenalties {
    policies:                 Policy[];
    free_cancellation_before: null;
}

export interface Policy {
    start_at:      null;
    end_at:        null;
    amount_charge: string;
    amount_show:   string;
}

export interface TaxData {
    taxes: Tax[];
}

export interface Tax {
    name:                 Name;
    included_by_supplier: boolean;
    amount:               string;
    currency_code:        Currency;
}

export enum Name {
    CityTax = "city_tax",
    ElectricityFee = "electricity_fee",
    ServiceFee = "service_fee",
    Vat = "vat",
}

export interface RoomDataTrans {
    main_room_type: string;
    main_name:      string;
    bathroom:       null | string;
    bedding_type:   null | string;
    misc_room_type: null;
}

export enum SerpFilter {
    HasBathroom = "has_bathroom",
    HasBreakfast = "has_breakfast",
    HasInternet = "has_internet",
}

export interface Debug {
    request:          Request;
    key_id:           number;
    validation_error: null;
}

export interface Request {
    checkin:   Date;
    checkout:  Date;
    residency: string;
    language:  string;
    guests:    Guest[];
    id:        string;
    currency:  Currency;
}

export interface Guest {
    adults:   number;
    children: any[];
}
