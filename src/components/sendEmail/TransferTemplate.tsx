import React from 'react'

interface Props {
    type: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    car: string;
    capacity: string;
    price: string;

    datereturn:string;
    timereturn:string;
    carreturn:string;
    capacityreturn:string;
    pricereturn:string;
    firstName:string;
    lastname:string;
    email:string;
    passengerAdult:string;
    passengerChildren:string;
  }
  

  export const TransferTemplate = ({
    type,
    origin,
    destination,
    date,
    time,
    car,
    capacity,
    
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
            Solicitud de Transportacion
          </h2>
        </div>
  
        <p>
          <strong>
            Apreciable {firstName} {lastname},
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
                <strong>Email:</strong>
              </td>
              <td>
                <a href={`mailto:${email}`} style={{ color: "#007bff" }}>
                  {email}
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tipo:</strong>
              </td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>
                <strong>Origen:</strong>
              </td>
              <td>{origin}</td>
            </tr>
            <tr>
              <td>
                <strong>Destino:</strong>
              </td>
              <td>{destination}</td>
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
                <strong>Vehículo:</strong>
              </td>
              <td>{car}</td>
            </tr>
            <tr>
              <td>
                <strong>Capacidad:</strong>
              </td>
              <td>{capacity}</td>
            </tr>
            {/* <tr>
              <td>
                <strong>Precio:</strong>
              </td>
              <td>{price}</td>
            </tr> */}
            {type === "Ida y vuelta" && (
              <>
                <tr>
                  <td>
                    <strong>Fecha de regreso:</strong>
                  </td>
                  <td>{datereturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hora de regreso:</strong>
                  </td>
                  <td>{timereturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Vehículo de regreso:</strong>
                  </td>
                  <td>{carreturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Capacidad de regreso:</strong>
                  </td>
                  <td>{capacityreturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Precio de regreso:</strong>
                  </td>
                  <td>{pricereturn}</td>
                </tr>
              </>
            )}
            <tr>
              <td>
                <strong>Pasajeros Adultos:</strong>
              </td>
              <td>{passengerAdult}</td>
            </tr>
            <tr>
              <td>
                <strong>Pasajeros Niños:</strong>
              </td>
              <td>{passengerChildren}</td>
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
          Gracias por elegir Infinity Luxury Travel Club
        </p>
      </div>
    );
  };