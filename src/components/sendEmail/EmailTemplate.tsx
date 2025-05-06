interface Hotel {
  rating: number;
  service: string;
}
interface EmailTemplateProps {
  language: "es" | "en";
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

const translations = {
  es: {
    title: "Mi viaje perfecto",
    greeting: "Apreciable",
    message: "Es para nosotros un placer servirle y trabajar en las mejores opciones para usted.",
    contractNumber: "Número de contrato",
    phone: "Número de Teléfono",
    email: "Email",
    countryOrigin: "País de origen",
    cityOrigin: "Ciudad de origen",
    countryDestination: "País de destino",
    cityDestination: "Ciudad de destino",
    dateStart: "Fecha de salida",
    dateEnd: "Fecha de regreso",
    flights: "Vuelos",
    hotels: "Hoteles",
    cars: "Autos",
    attractions: "Atracciones",
    budget: "Presupuesto",
    currency: "Tipo de moneda",
    passengers: "Pasajeros",
    childrenAges: "Edades de los niños",
    footer: "Gracias por elegir Infinity Luxury Travel Club",
  },
  en: {
    title: "My Perfect Trip",
    greeting: "Dear",
    message: "It is our pleasure to serve you and work on the best options for you.",
    contractNumber: "Contract Number",
    phone: "Phone Number",
    email: "Email",
    countryOrigin: "Country of Origin",
    cityOrigin: "City of Origin",
    countryDestination: "Country of Destination",
    cityDestination: "City of Destination",
    dateStart: "Departure Date",
    dateEnd: "Return Date",
    flights: "Flights",
    hotels: "Hotels",
    cars: "Cars",
    attractions: "Attractions",
    budget: "Budget",
    currency: "Currency Type",
    passengers: "Passengers",
    childrenAges: "Children's Ages",
    footer: "Thank you for choosing Infinity Luxury Travel Club",
  },
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  language,
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
}) => {
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
          {t.greeting} {fullname},
        </strong>
      </p>
      <p>{t.message}</p>
      <p>You will soon receive an email with the quote for your request:</p>

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
              <strong>{t.phone}:</strong>
            </td>
            <td>{phone}</td>
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
              <strong>{t.countryOrigin}:</strong>
            </td>
            <td>{country_origin}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.cityOrigin}:</strong>
            </td>
            <td style={{ fontWeight: "bold" }}>{city_origin}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.countryDestination}:</strong>
            </td>
            <td>{contry_destination}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.cityDestination}:</strong>
            </td>
            <td style={{ fontWeight: "bold" }}>{city_destination}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.dateStart}:</strong>
            </td>
            <td>{date_start}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.dateEnd}:</strong>
            </td>
            <td>{date_end}</td>
          </tr>
          {flight && (
            <tr>
              <td>
                <strong>{t.flights}:</strong>
              </td>
              <td>{flight ? "Yes" : "No"}</td>
            </tr>
          )}
          {hotel && (
            <tr>
              <td>
                <strong>{t.hotels}:</strong>
              </td>
              <td>
                {hotel.service} {hotel.rating} Stars
              </td>
            </tr>
          )}
          {car && (
            <tr>
              <td>
                <strong>{t.cars}:</strong>
              </td>
              <td>{car}</td>
            </tr>
          )}
          {attractions && (
            <tr>
              <td>
                <strong>{t.attractions}:</strong>
              </td>
              <td>{attractions}</td>
            </tr>
          )}
          <tr>
            <td>
              <strong>{t.budget}:</strong>
            </td>
            <td>{budget}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.currency}:</strong>
            </td>
            <td>{currency}</td>
          </tr>
          <tr>
            <td>
              <strong>{t.passengers}:</strong>
            </td>
            <td>
              {adult} {+adult > 1 ? "Adults" : "Adult"}, {children.length}{" "}
              {children.length > 1 ? "Children" : "Child"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t.childrenAges}:</strong>
            </td>
            <td>{children.map((age) => `${age} ${language === "es" ? "Años" : "Years"}`).join(", ")}</td>
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