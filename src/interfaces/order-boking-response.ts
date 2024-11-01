export interface OrderBokingResponse {
    data:   Data;
    debug:  null;
    error:  null;
    status: string;
}

export interface Data {
    item_id:          number;
    order_id:         number;
    partner_order_id: string;
    payment_types:    PaymentType[];
}

export interface PaymentType {
    amount:                   string;
    currency_code:            string;
    is_need_credit_card_data: boolean;
    is_need_cvc:              boolean;
    type:                     Type;
}

export enum Type {
    Now = "now",
}
