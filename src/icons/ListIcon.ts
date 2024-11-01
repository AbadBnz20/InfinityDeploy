import { IoAlbumsOutline, IoBusinessOutline, IoCarOutline, IoCashOutline, IoCloudDoneOutline, IoConstructOutline, IoDiceOutline, IoEarthOutline, IoHappyOutline, IoHeartHalfOutline, IoImagesOutline, IoShieldCheckmarkOutline, IoSnowOutline, IoStorefrontOutline, IoTennisballOutline, IoWalkOutline, IoWifiOutline } from "react-icons/io5";
import { PiDogLight, PiPersonSimpleSwimLight } from "react-icons/pi";
type AmenityIcon = {
    name: string;
    icon: React.ElementType; 
};


export const AmenitiesIcon: AmenityIcon[] = [
    {
        name: 'Internet',
        icon: IoWifiOutline 
    },
    {
        name: 'Niños',
        icon: IoHappyOutline
    },
    {
        name: 'Recreación',
        icon: IoDiceOutline
    },
    {
        name: 'Mascotas',
        icon: PiDogLight 
    },
    {
        name: 'Accesibilidad',
        icon: IoCloudDoneOutline 
    },
    {
        name: 'Negocios',
        icon: IoCashOutline 
    },
    {
        name: 'Idiomas disponibles',
        icon: IoEarthOutline
    },
    {
        name: 'Belleza y bienestar',
        icon: IoHeartHalfOutline 
    },
    {
        name: 'Servicios e instalaciones',
        icon: IoConstructOutline 
    },
    {
        name: 'Aparcamiento',
        icon: IoCarOutline 
    },
    {
        name: 'Comidas',
        icon: IoStorefrontOutline 
    },
    {
        name: 'Traslado',
        icon: IoWalkOutline 
    },
    {
        name: 'Habitaciones',
        icon: IoBusinessOutline 
    },
    {
        name: 'Piscina y playa',
        icon: PiPersonSimpleSwimLight  
    },
    {
        name: 'Deportes',
        icon: IoTennisballOutline  
    },
    {
        name: 'Servicios de turismo',
        icon: IoImagesOutline  
    },
    {
        name: 'Medidas de seguridad y salud',
        icon: IoShieldCheckmarkOutline  
    },
    {
        name: 'General',
        icon: IoAlbumsOutline  
    },
    {
        name: 'Deportes de invierno',
        icon: IoSnowOutline  
    },
];