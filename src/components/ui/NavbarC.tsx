"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { UserContent } from "./user/UserContent";

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
    title:'Iniciar sesion'
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
    title:'Login'

  },
};

export const NavbarC = () => {
  const [language] = useState("es");

  //   const language = "es";

  const t = translations[language as keyof typeof translations];

  return (
    // <header className="fixed bg-gradient-to-r from-gray-900 to-black w-full z-20">
    <Navbar shouldHideOnScroll  className="p-2 bg-maincolor bg-opacity-80 backdrop-blur-md">
      <NavbarBrand>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eigb5La26zWW8G8xrkuVbJPlSSBNEC.png"
          alt="Infinity Luxury Travel Logo"
          className="h-16"
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#"  className="text-lg font-medium hover:text-gold-500 transition-colors ">
          {t.destinations}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page"  className="text-lg font-medium hover:text-gold-500 transition-colors ">
          {t.experiences}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#"  className="text-lg font-medium hover:text-gold-500 transition-colors ">
          {t.aboutUs}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#"  className="text-lg font-medium hover:text-gold-500 transition-colors ">
          {t.aboutUs}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        {/* <SelectLanguage/> */}
        </NavbarItem>
        <NavbarItem>
        <UserContent/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

    // </header>
  );
};


{/* <div className="container mx-auto px-4">
<div className="flex items-center justify-between py-4">
  <div className="flex items-center">
    <img
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eigb5La26zWW8G8xrkuVbJPlSSBNEC.png"
      alt="Infinity Luxury Travel Logo"
      className="h-16"
    />
  </div>
  <nav className="hidden md:flex space-x-10">
    <a
      href="#"
      className="text-lg font-medium hover:text-gold-500 transition-colors text-white"
    >
      {t.destinations}
    </a>
 
    <a
      href="#"
      className="text-lg font-medium hover:text-gold-500 transition-colors text-white "
    >
      {t.experiences}
    </a>
    <a
      href="#"
      className="text-lg font-medium hover:text-gold-500 transition-colors text-white"
    >
      {t.aboutUs}
    </a>
    <a
      href="#"
      className="text-lg font-medium hover:text-gold-500 transition-colors text-white"
    >
      {t.contact}
    </a>
  </nav>
  <div className="flex items-center">
    <SelectLanguage/>
  </div>
</div>
</div> */}