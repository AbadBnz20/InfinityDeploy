export interface OrderBooking {
    user:          User;
    supplier_data: SupplierData;
    partner:       Partner;
    language:      string;
    rooms:         Room[];
    payment_type:  PaymentType;
    return_path:   string;
}

export interface Partner {
    partner_order_id: string;
}

export interface PaymentType {
    type:          string;
    amount:        string;
    currency_code: string;
    init_uuid:     string;
    pay_uuid:      string;
}

export interface Room {
    guests: Guest[];
}

export interface Guest {
    first_name: string;
    last_name:  string;
}

export interface SupplierData {
    first_name_original: string;
    last_name_original:  string;
    phone:               string;
    email:               string;
}

export interface User {
    email:   string;
    comment: string;
    phone:   string;
}
