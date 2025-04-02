
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
    ubication,
    typeOfExperience,
    motorYacht,
    note,
  } = body;

  try {
    const { error } = await resend.emails.send({
      from: "Advantage <onboarding@advantageinfinityclub.com>",
      to: [email],
      subject: "Solicitud Yates",
      react: YachtsTemplate({
        nrocontract,
        date,
        time,
        passengers,
        firstName,
        lastName,
        email,
        phone,
        ubication,
        typeOfExperience,
        motorYacht,
        note,
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
