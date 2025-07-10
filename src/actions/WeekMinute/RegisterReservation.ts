"use server";

import { createClient } from "@/utils/supabase/server";

export const RegisterReservation = async (
  destination: string,
  nameHotel: string,
  propertyId: string,
  address: string,
  phoneNumber: string,
  startDate: string,
  endDate: string,
  detail: string,
  price: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
) => {
  const supabase = await createClient();
  const {  error } = await supabase
    .from("lastMinuteWeek")
    .insert([
      {
        destination: destination,
        nameHotel: nameHotel,
        propertyId: propertyId,
        address: address,
        phoneNumber: phoneNumber,
        startDate: startDate,
        endDate: endDate,
        detail: detail,
        price: price,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
    


 

  return {
    status: true,
    message: "Guardado correctamente",
  };
};
