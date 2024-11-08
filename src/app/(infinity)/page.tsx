import { Experiences, Reservation, Roms, Slider } from "@/components";


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



export default async function HomePage() {
  const language = "es";
  const t = translations[language as keyof typeof translations];
  const arraySlider = [
    {
      img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0001-c4FngqJGMvcds8oGrOkoicZtd5kjPk.jpg',
      title: t.exclusiveExperiences,  
      subtitle: t.exoticDescription, 
    },
    {
      img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0001-c4FngqJGMvcds8oGrOkoicZtd5kjPk.jpg',
      title: t.gourmetCuisine,        
      subtitle: t.gourmetDescription, 
    },
    {
      img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0001-c4FngqJGMvcds8oGrOkoicZtd5kjPk.jpg',
      title: t.personalizedWellness,  
      subtitle: t.wellnessDescription 
    }
  ];
  return (
    <div className="">
      <Slider array={arraySlider} />
      <Reservation />
      <Experiences />
      <Roms />
    </div>
  );
}
