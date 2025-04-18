interface Hotel {
  rating: number;
  service: string;
}
interface EmailTemplateProps {
  budget:string,
  nrocontract:string,
  fullname: string;
  email: string;
  phone: string;
  country_origin: string;
  city_origin: string;
  contry_destination: string;
  city_destination: string;
  date_start: string;
  date_end: string;
  flight?: boolean;
  hotel?: Hotel;
  car?: string;
  attractions?: string;
  adult: string;
  children: Array<string>;
  details: string;
  currency: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  nrocontract,
  budget,
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
  currency,
}) => (
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
      Mi viaje perfecto
      </h2>
    </div>

    <p>
      <strong>Apreciable {fullname},</strong>
    </p>
    <p>
      Es para nosotros un placer servirle y trabajar en las mejores opciones
      para usted.
    </p>
    <p>En breve recibirá por correo la cotización referente a su solicitud:</p>

    <table
      style={{ width: "100%", borderCollapse: "collapse", lineHeight: "1.6" }}
    >
      <tbody>
      <tr>
          <td>
            <strong>Numero de contrato:</strong>
          </td>
          <td>
              {nrocontract}
          </td>
        </tr>
        <tr>
          <td>
            <strong>Número de Teléfono:</strong>
          </td>
          <td>{phone}</td>
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
            <strong>País de origen:</strong>
          </td>
          <td>{country_origin}</td>
        </tr>
        <tr>
          <td>
            <strong>Ciudad de origen:</strong>
          </td>
          <td style={{ fontWeight: "bold" }}>{city_origin}</td>
        </tr>
        <tr>
          <td>
            <strong>País de destino:</strong>
          </td>
          <td>{contry_destination} </td>
        </tr>
        <tr>
          <td>
            <strong>Ciudad de destino:</strong>
          </td>
          <td style={{ fontWeight: "bold" }}>{city_destination} </td>
        </tr>
        <tr>
          <td>
            <strong>Fecha de salida:</strong>
          </td>
          <td>{date_start} </td>
        </tr>
        <tr>
          <td>
            <strong>Fecha de Regreso:</strong>
          </td>
          <td>{date_end} </td>
        </tr>
        {flight && (
          <tr>
            <td>
              <strong>Vuelos:</strong>
            </td>
            <td>{flight ? "Si" : "No"}</td>
          </tr>
        )}
        {hotel && (
          <tr>
            <td>
              <strong>Hoteles:</strong>
            </td>
            <td>
              {hotel.service} {hotel.rating} Stars
            </td>
          </tr>
        )}
        {car && (
          <tr>
            <td>
              <strong>Autos:</strong>
            </td>
            <td>{car}</td>
          </tr>
        )}
        {attractions && (
          <tr>
            <td>
              <strong>Atracciones:</strong>
            </td>
            <td>{attractions}</td>
          </tr>
        )}
        <tr>
          <td>
            <strong>Presupuesto:</strong>
          </td>
          <td>{budget}</td>
        </tr>
        <tr>
          <td>
            <strong>Tipo de moneda:</strong>
          </td>
          <td>{currency}</td>
        </tr>
        <tr>
          <td>
            <strong>Pasajeros:</strong>
          </td>
          <td>
            {adult} {+adult > 1 ? "Adulto" : "Adultos"}, {children.length} Niños
          </td>
        </tr>
        <tr>
          <td>
            <strong>Edades de los niños:</strong>
          </td>
          <td>{children.map((age) => `${age} Años`).join(", ")}</td>
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
