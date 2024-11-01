export interface HotelsResponse {
    data:   Data;
    debug:  Debug;
    status: string;
    error:  null;
}

export interface Data {
    hotels:       Hotel[];
    total_hotels: number;
}

export interface Hotel {
    id:    string;
    hid:   number;
    rates: Rate[];
}

export interface Rate {
    match_hash:      string;
    daily_prices:    string[];
    meal:            string;
    payment_options: PaymentOptions;
    rg_ext:          { [key: string]: number };
    room_name:       string;
    room_name_info:  null;
    serp_filters:    string[];
    allotment:       number;
    amenities_data:  string[];
    any_residency:   boolean;
    deposit:         null;
    no_show:         null;
    room_data_trans: RoomDataTrans;
}

export interface PaymentOptions {
    payment_types: PaymentType[];
}

export interface PaymentType {
    amount:                   string;
    show_amount:              string;
    currency_code:            string;
    show_currency_code:       string;
    by:                       null;
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
    name:                 string;
    included_by_supplier: boolean;
    amount:               string;
    currency_code:        string;
}

export interface RoomDataTrans {
    main_room_type: string;
    main_name:      string;
    bathroom:       null;
    bedding_type:   null;
    misc_room_type: null;
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
    region_id: number;
    currency:  string;
}

export interface Guest {
    adults:   number;
    children: number[];
}
