import { RoomEmail } from "@/interfaces/Room-responses";
import React from "react";

interface Props {
  start_date: string;
  end_date: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adult: number;
  children: string;
  Rooms: RoomEmail[];
  language: "es" | "en";
}

const translations = {
  es: {
    title: "Solicitud de Habitación",
    greeting: "Apreciable",
    message: "Es para nosotros un placer servirle y brindarle la mejor experiencia.",
    details: "Detalles de su solicitud:",
    email: "Email",
    phone: "Número",
    startDate: "Fecha Inicio",
    endDate: "Fecha Final",
    adults: "Adultos",
    children: "Niños",
    rooms: "Habitaciones",
    roomName: "Nombre",
    bedType: "Tipo de cama",
    amountType:"Cantidad",
    footer: "Gracias por elegir Infinity Luxury Travel Club",
  },
  en: {
    title: "Room Request",
    greeting: "Dear",
    message: "It is our pleasure to serve you and provide the best experience.",
    details: "Details of your request:",
    email: "Email",
    phone: "Phone",
    startDate: "Start Date",
    endDate: "End Date",
    adults: "Adults",
    children: "Children",
    rooms: "Rooms",
    roomName: "Name",
    bedType: "Bed Type",
    amountType:"Amount",
    footer: "Thank you for choosing Infinity Luxury Travel Club",
  },
};


export const SeadustTemplate = ({
  start_date,
  end_date,
  firstName,
  lastName,
  email,
  phone,
  adult,
  children,
  Rooms,
  language = "es",
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
      <p>{t.details}</p>
      <table
        style={{ width: "100%", borderCollapse: "collapse", lineHeight: "1.6" }}
      >
        <tbody>
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
              <strong>{t.phone}:</strong>
            </td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.startDate}:</strong>
            </td>
            <td>{start_date}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.endDate}:</strong>
            </td>
            <td>{end_date}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.adults}:</strong>
            </td>
            <td>{adult}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.children}:</strong>
            </td>
            <td>{children}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.rooms}:</strong>
            </td>
            <td></td>
          </tr>

          {Rooms.map((room, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>
                  <strong>{t.roomName}:</strong>
                </td>
                <td>{room.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>{t.bedType}:</strong>
                </td>
                <td>
                  {room.numberOfBeds} {room.typeOfBed}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>{t.amountType}:</strong>
                </td>
                <td>
                  {room.amount} 
                </td>
              </tr>
            </React.Fragment>
          ))}
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