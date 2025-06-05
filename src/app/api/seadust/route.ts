import { SeadustTemplate } from "@/components/sendEmail/SeadustTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const {
    start_date,
    end_date,
    firstName,
    lastName,
    email,
    phone,
    adult,
    children,
    Rooms,
    language,
  } = body;

  try {
    const { error } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: [email],
      subject:  language === 'es'? "Solicitud Seadust": "Seadust Request",
      react: SeadustTemplate({
        start_date,
        end_date,
        firstName,
        lastName,
        email,
        phone,
        adult,
        children,
        Rooms,
        language,
      }),
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    const { error: error2 } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: "infinityweeks@infinityluxurytravelclub.com",
      subject: "Solicitud Seadust",
      react: SeadustTemplate({
        start_date,
        end_date,
        firstName,
        lastName,
        email,
        phone,
        adult,
        children,
        Rooms,
        language,
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
