import React from "react";

interface Props {
  language: "es" | "en";
  nrocontract: string;
  date: string;
  time: string;
  passengers: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  typeOfExperience: string;
  motorYacht: string;
  note: string;
}


const translations = {
  es: {
    title: "Solicitud de Yates",
    greeting: "Apreciable",
    message: "Es para nosotros un placer servirle y brindarle la mejor experiencia.",
    detailsMessage: "En breve recibirá por correo los detalles referentes a su solicitud:",
    contractNumber: "Número de contrato",
    email: "Email",
    date: "Fecha",
    time: "Hora",
    passengers: "Pasajeros",
    phone: "Número de Teléfono",
    experienceType: "Tipo de Experiencia",
    motorYacht: "Yate a Motor",
    additionalNote: "Nota Adicional",
    footer: "Gracias por elegir Infinity Luxury Travel Club",
  },
  en: {
    title: "Yacht Request",
    greeting: "Dear",
    message: "It is our pleasure to serve you and provide the best experience.",
    detailsMessage: "You will soon receive an email with the details of your request:",
    contractNumber: "Contract Number",
    email: "Email",
    date: "Date",
    time: "Time",
    passengers: "Passengers",
    phone: "Phone Number",
    experienceType: "Type of Experience",
    motorYacht: "Motor Yacht",
    additionalNote: "Additional Note",
    footer: "Thank you for choosing Infinity Luxury Travel Club",
  },
};

export const YachtsTemplate = ({
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
}: Props) => {
  const t = translations[language]; 

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://res.cloudinary.com/devz7obre/image/upload/v1744321737/logo1_v9yswm.png"
          alt="Infinity Luxury Travel"
          style={{ width: "150px" }}
        />
        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          {t.title}
        </h2>
      </div>

      <p>
        <strong>
          {t.greeting} {firstName} {lastName},
        </strong>
      </p>
      <p>{t.message}</p>
      <p>{t.detailsMessage}</p>

      <table
        style={{ width: "100%", borderCollapse: "collapse", lineHeight: "1.6" }}
      >
        <tbody>
          <tr>
            <td>
              <strong>{t.contractNumber}:</strong>
            </td>
            <td>{nrocontract}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.email}:</strong>
            </td>
            <td>
              <a href={`mailto:${email}`} style={{ color: "#007bff" }}>
                {email}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t.date}:</strong>
            </td>
            <td>{date}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.time}:</strong>
            </td>
            <td>{time}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.passengers}:</strong>
            </td>
            <td>{passengers}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.phone}:</strong>
            </td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.experienceType}:</strong>
            </td>
            <td>{typeOfExperience}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.motorYacht}:</strong>
            </td>
            <td>{motorYacht}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.additionalNote}:</strong>
            </td>
            <td>{note}</td>
          </tr>
        </tbody>
      </table>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          paddingTop: "10px",
          borderTop: "1px solid #ccc",
        }}
      >
        {t.footer}
      </p>
    </div>
  );
};
