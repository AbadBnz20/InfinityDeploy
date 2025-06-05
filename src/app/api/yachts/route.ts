
import { YachtsTemplate } from "@/components/sendEmail/YachtsTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const {
    nrocontract,
    date,
    time,
    passengers,
    firstName,
    lastName,
    email,
    phone,
    typeOfExperience,
    motorYacht,
    note,
    language
  } = body;

  try {
    const { error } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: [email],
      subject: language === 'es'? "Solicitud Yates": "Yachts Request",
      react: YachtsTemplate({
        language,
        nrocontract,
        date,
        time,
        passengers,
        firstName,
        lastName,
        email,
        phone,
        typeOfExperience,
        motorYacht,
        note,
      }),
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }
    const { error:error2 } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: "yates@infinityluxurytravelclub.com",
      subject: "Solicitud Yates",
      react: YachtsTemplate({
        language,
        nrocontract,
        date,
        time,
        passengers,
        firstName,
        lastName,
        email,
        phone,
        typeOfExperience,
        motorYacht,
        note,
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
