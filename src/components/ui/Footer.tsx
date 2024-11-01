const translations = {
  es: {
    destinations: "Destinos",
    experiences: "Experiencias",
    aboutUs: "Sobre Nosotros",
    contact: "Contacto",
    luxuryWithoutLimits: "Lujo Sin Límites",
    creatingMemories:
      "Creando recuerdos inolvidables en los destinos más exclusivos del mundo",
    destination: "Destino",
    whereTo: "¿A dónde deseas viajar?",
    checkIn: "Check-in",
    checkOut: "Check-out",
    selectDate: "Seleccionar fecha",
    rooms: "Habitaciones",
    adults: "Adultos",
    children: "Niños",
    search: "Buscar",
    exclusiveExperiences: "Experiencias Exclusivas",
    exoticDestinations: "Destinos Exóticos",
    exoticDescription: "Descubre paraísos inexplorados y lujosos retiros",
    gourmetCuisine: "Gastronomía de Autor",
    gourmetDescription:
      "Degusta creaciones culinarias de chefs estrella Michelin",
    premiumConnectivity: "Conectividad Premium",
    connectivityDescription:
      "Mantente conectado con Wi-Fi de alta velocidad en todo momento",
    personalizedWellness: "Bienestar Personalizado",
    wellnessDescription: "Programas de fitness y spa diseñados para ti",
    dreamSuites: "Suites y Villas de Ensueño",
    explore: "Explorar",
    phone: "Teléfono",
    followUs: "Síguenos",
  },
  en: {
    destinations: "Destinations",
    experiences: "Experiences",
    aboutUs: "About Us",
    contact: "Contact",
    luxuryWithoutLimits: "Luxury Without Limits",
    creatingMemories:
      "Creating unforgettable memories in the world's most exclusive destinations",
    destination: "Destination",
    whereTo: "Where do you want to travel?",
    checkIn: "Check-in",
    checkOut: "Check-out",
    selectDate: "Select date",
    rooms: "Rooms",
    adults: "Adults",
    children: "Children",
    search: "Search",
    exclusiveExperiences: "Exclusive Experiences",
    exoticDestinations: "Exotic Destinations",
    exoticDescription: "Discover unexplored paradises and luxurious retreats",
    gourmetCuisine: "Gourmet Cuisine",
    gourmetDescription: "Taste culinary creations from Michelin-starred chefs",
    premiumConnectivity: "Premium Connectivity",
    connectivityDescription:
      "Stay connected with high-speed Wi-Fi at all times",
    personalizedWellness: "Personalized Wellness",
    wellnessDescription: "Fitness and spa programs designed for you",
    dreamSuites: "Dream Suites and Villas",
    explore: "Explore",
    phone: "Phone",
    followUs: "Follow Us",
  },
};

export const Footer = () => {
  const language = "es";

  const t = translations[language as keyof typeof translations];

  return (
    <footer className="bg-maincolor  py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              Infinity Luxury Travel
            </h3>
            <p className="text-gray-400">Blvd. Kukulcán km 12.5, Zona Hotelera</p>
            <p className="text-gray-400">Cancún, Quintana Roo, México</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              {t.contact}
            </h3>
            <p className="text-gray-400">{t.phone}: +52 998 123 4567</p>
            <p className="text-gray-400">Email: info@infinityluxury.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-500">
              {t.followUs}
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-gold-500 transition-colors duration-300 text-gray-400"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
