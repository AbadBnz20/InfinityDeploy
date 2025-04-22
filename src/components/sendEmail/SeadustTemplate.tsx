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
}

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
}: Props) => {
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
          Solicitud de Habitación
        </h2>
      </div>

      <p>
        <strong>
          Apreciable {firstName} {lastName},
        </strong>
      </p>
      <p>
        Es para nosotros un placer servirle y brindarle la mejor experiencia.
      </p>
      <p>Detalles de su solicitud:</p>
      <table
        style={{ width: "100%", borderCollapse: "collapse", lineHeight: "1.6" }}
      >
        <tbody>
          {/* <tr>
        <td>
          <strong>Numero de contrato:</strong>
        </td>
        <td>{nrocontract}</td>
      </tr> */}
          <tr>
            <td>
              <strong>Email:</strong>
            </td>
            <td>
              <a href={email} style={{ color: "#007bff" }}>
                {email}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Numero:</strong>
            </td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>
              <strong>Fecha Inicio:</strong>
            </td>
            <td>{start_date}</td>
          </tr>
          <tr>
            <td>
              <strong>Fecha Final:</strong>
            </td>
            <td>{end_date}</td>
          </tr>
          <tr>
            <td>
              <strong>Adultos:</strong>
            </td>
            <td>{adult}</td>
          </tr>
          <tr>
            <td>
              <strong>Niños:</strong>
            </td>
            <td>{children}</td>
          </tr>
          <tr>
            <td>
              <strong>Habitaciones</strong>
            </td>
            <td></td>
          </tr>

          {Rooms.map((room, index) => (
            <>
              <tr key={index}>
                <td>
                  <strong>Nombre:</strong>
                </td>
                <td>{room.name}</td>
              </tr>
             
              <tr key={index}>
                <td>
                  <strong>Tipo de cama:</strong>
                </td>
                <td>
                  {room.numberOfBeds} {room.typeOfBed}
                </td>
              </tr>
              <tr></tr>
            </>
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
        Gracias por elegir Infinity Luxury Travel Club
      </p>
    </div>
  );
};
