"use server";
import axios from "axios";

export interface TokenizerCard {
  object_id: string;
  pay_uuid: string;
  init_uuid: string;
  user_last_name: string;
  cvc: string;
  is_cvc_required: boolean;
  credit_card_data_core: CreditCardDataCore;
  user_first_name: string;
}

export interface CreditCardDataCore {
  year: string;
  card_number: string;
  card_holder: string;
  month: string;
}

interface CreditResponse {
  status: 'ok' | 'error';
  error:string;
}

export const RegisterTokenizerCard = async (card: TokenizerCard) => {
  try {
    const resp = await axios.post<CreditResponse>(
      "https://api.payota.net/api/public/v1/manage/init_partners",
      card,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.user}:${process.env.password}`
          ).toString("base64")}`,
        },
      }
    );
    if (resp.data.status === 'ok') {
       return true;
    } else {
      return false;
    }


  } catch (error) {
    console.log(error);

    return false;
  }
};
