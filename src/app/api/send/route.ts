import { EmailTemplate } from "@/components/sendEmail/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const {
    fullname,
    email,
    phone,
    country_origin,
    city_origin,
    contry_destination,
    city_destination,
    date_start,
    date_end,
    flight,
    hotel,
    car,
    attractions,
    adult,
    children,
    details,
    currency,
  } = body;

  try {
    const {  error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["benizabadchat@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({
        fullname: fullname,
        email: email,
        phone: phone,
        country_origin: country_origin,
        city_origin: city_origin,
        contry_destination: contry_destination,
        city_destination: city_destination,
        date_start: date_start,
        date_end: date_end,
        flight: flight,
        hotel: hotel,
        car: car,
        attractions: attractions,
        adult: adult,
        children: children,
        details: details,
        currency: currency,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({message: 'Email Enviado' });

  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
