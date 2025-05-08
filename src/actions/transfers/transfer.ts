"use server";

import { createClient } from "@/utils/supabase/server";

export interface TransferFormRegister {
  type: string;
  arrival_date: string;
  arrival_time: string;
  return_date: string;
  return_time: string;
  passengers: { aduts: number; children: number };
  transfer_code?: string;
  description: string;
  total?: number;
  transport_arrival_Id: string;
  transport_return_Id: string | null;
  originId: string;
  destinationId: string;
  name: string;
  email: string;
  phone: string;
}

export const registerTransfer = async (transferData: TransferFormRegister) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("transfer")
    .insert([
      {
        type: transferData.type,
        arrival_date: transferData.arrival_date,
        arrival_time: transferData.arrival_time,
        return_date: transferData.return_date,
        return_time: transferData.return_time,
        passengers: transferData.passengers,
        transfer_code: transferData.transfer_code,
        description: transferData.description,
        total: transferData.total,
        transport_arrival_Id: transferData.transport_arrival_Id,
        transport_return_Id: transferData.transport_return_Id,
        originId: transferData.originId,
        destinationId: transferData.destinationId,
        name: transferData.name,
        email: transferData.email,
        phone: transferData.phone,
      },
    ])
    .select();


console.log(error)

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  return {
    status: true,
    message: "Datos enviado correctamente",
  };
};
