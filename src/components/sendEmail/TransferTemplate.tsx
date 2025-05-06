import React from 'react'

interface Props {
  language: "es" | "en";
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
  
  const translations = {
    es: {
      title: "Solicitud de Transportación",
      greeting: "Apreciable",
      message: "Es para nosotros un placer servirle y brindarle la mejor experiencia.",
      detailsMessage: "En breve recibirá por correo los detalles referentes a su solicitud:",
      email: "Email",
      type: "Tipo",
      origin: "Origen",
      destination: "Destino",
      date: "Fecha",
      time: "Hora",
      car: "Vehículo",
      capacity: "Capacidad",
      returnDate: "Fecha de regreso",
      returnTime: "Hora de regreso",
      returnCar: "Vehículo de regreso",
      returnCapacity: "Capacidad de regreso",
      returnPrice: "Precio de regreso",
      adultPassengers: "Pasajeros Adultos",
      childPassengers: "Pasajeros Niños",
      footer: "Gracias por elegir Infinity Luxury Travel Club",
    },
    en: {
      title: "Transportation Request",
      greeting: "Dear",
      message: "It is our pleasure to serve you and provide the best experience.",
      detailsMessage: "You will soon receive an email with the details of your request:",
      email: "Email",
      type: "Type",
      origin: "Origin",
      destination: "Destination",
      date: "Date",
      time: "Time",
      car: "Vehicle",
      capacity: "Capacity",
      returnDate: "Return Date",
      returnTime: "Return Time",
      returnCar: "Return Vehicle",
      returnCapacity: "Return Capacity",
      returnPrice: "Return Price",
      adultPassengers: "Adult Passengers",
      childPassengers: "Child Passengers",
      footer: "Thank you for choosing Infinity Luxury Travel Club",
    },
  };
  

  export const TransferTemplate = ({
    language= "es",
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
    const t = translations[language]; // Traducciones dinámicas según el idioma
  
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
            {t.greeting} {firstName} {lastname},
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
                <strong>{t.type}:</strong>
              </td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>
                <strong>{t.origin}:</strong>
              </td>
              <td>{origin}</td>
            </tr>
            <tr>
              <td>
                <strong>{t.destination}:</strong>
              </td>
              <td>{destination}</td>
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
                <strong>{t.car}:</strong>
              </td>
              <td>{car}</td>
            </tr>
            <tr>
              <td>
                <strong>{t.capacity}:</strong>
              </td>
              <td>{capacity}</td>
            </tr>
            {type === "Ida y vuelta" && (
              <>
                <tr>
                  <td>
                    <strong>{t.returnDate}:</strong>
                  </td>
                  <td>{datereturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{t.returnTime}:</strong>
                  </td>
                  <td>{timereturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{t.returnCar}:</strong>
                  </td>
                  <td>{carreturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{t.returnCapacity}:</strong>
                  </td>
                  <td>{capacityreturn}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{t.returnPrice}:</strong>
                  </td>
                  <td>{pricereturn}</td>
                </tr>
              </>
            )}
            <tr>
              <td>
                <strong>{t.adultPassengers}:</strong>
              </td>
              <td>{passengerAdult}</td>
            </tr>
            <tr>
              <td>
                <strong>{t.childPassengers}:</strong>
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
          {t.footer}
        </p>
      </div>
    );
  };