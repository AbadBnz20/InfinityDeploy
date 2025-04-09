import React from "react";

interface Props {
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

export const YachtsTemplate = ({
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
          src="https://res.cloudinary.com/devz7obre/image/upload/v1742005463/ACT_350X55px-02_2_f9gxig.png"
          alt="Infinity Luxury Travel"
          style={{ width: "150px" }}
        />
        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          Solicitud de Yates
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
      <p>
        En breve recibirá por correo los detalles referentes a su solicitud:
      </p>

      <table
        style={{ width: "100%", borderCollapse: "collapse", lineHeight: "1.6" }}
      >
        <tbody>
          <tr>
            <td>
              <strong>Numero de contrato:</strong>
            </td>
            <td>{nrocontract}</td>
          </tr>
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
              <strong>Fecha:</strong>
            </td>
            <td>{date}</td>
          </tr>
          <tr>
            <td>
              <strong>Hora:</strong>
            </td>
            <td>{time}</td>
          </tr>
          <tr>
            <td>
              <strong>Pasajeros:</strong>
            </td>
            <td>{passengers}</td>
          </tr>

          <tr>
            <td>
              <strong>Número de Teléfono:</strong>
            </td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>
              <strong>Tipo de Experiencia:</strong>
            </td>
            <td>{typeOfExperience}</td>
          </tr>
          <tr>
            <td>
              <strong>Yate a Motor:</strong>
            </td>
            <td>{motorYacht}</td>
          </tr>
          
          <tr>
            <td>
              <strong>Nota Adicional:</strong>
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
        Gracias por elegir Advantage
      </p>
    </div>
  );
};
