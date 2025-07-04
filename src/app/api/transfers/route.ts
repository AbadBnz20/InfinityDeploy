import { TransferTemplate } from "@/components/sendEmail/TransferTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  const {
    nrocontract,
    type,
    origin,
    destination,
    date,
    time,
    car,
    capacity,
    price,
    datereturn,
    timereturn,
    carreturn,
    capacityreturn,
    pricereturn,
    firstName,
    lastname,
    email,
    passengerAdult,
    passengerChildren,
    language,
  } = body;
  try {
    const { error } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: [email],
      subject:  language === 'es'?"Solicitud Transportacion": "Transportation Request",
      react: TransferTemplate({
        nrocontract,
        language,
        type,
        origin,
        destination,
        date,
        time,
        car,
        capacity,
        price,
        
        datereturn,
        timereturn,
        carreturn,
        capacityreturn,
        pricereturn,
        
    
        firstName,
        lastname,
        email,
        passengerAdult,
        passengerChildren,
      }),
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    const { error:error2 } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: "transportacion@infinityluxurytravelclub.com",
      subject: "Solicitud Transportacion",
      react: TransferTemplate({
        nrocontract,
        language,
        type,
        origin,
        destination,
        date,
        time,
        car,
        capacity,
        price,
        
        datereturn,
        timereturn,
        carreturn,
        capacityreturn,
        pricereturn,
        
    
        firstName,
        lastname,
        email,
        passengerAdult,
        passengerChildren,
      }),
    });

    if (error2) {
      console.log(error2);
      return Response.json({ error2 }, { status: 500 });
    }


    return Response.json({ message: "Email Enviado" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
