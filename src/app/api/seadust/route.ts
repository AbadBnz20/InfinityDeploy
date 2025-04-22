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
  } = body;

  try {
    const { error } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: [email],
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
      }),
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: "Email Enviado" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
