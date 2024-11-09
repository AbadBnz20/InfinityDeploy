import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="flex flex-col">
          <Image
            src="/login/01.jpg"
            alt="Luxury hotel exterior"
            width={400}
            height={300}
            className="object-cover w-full h-48 rounded-t-lg"
          />
          <CardHeader className="grid grid-cols-1">
            <h1 className="font-semibold text-2xl">Infinity Luxury Travel</h1>
            <p className="font-medium">Un club vacacional exclusivo</p>
          </CardHeader>
          <CardBody className="flex-grow">
            <p className="text-muted-foreground mb-4">
              Infinity Luxury Travel es un club vacacional exclusivo que ofrece a sus socios beneficios únicos y tarifas preferenciales, asegurando el máximo valor y una experiencia de viaje incomparable.
            </p>
            <p className="text-muted-foreground">
              Nos enorgullece poder brindar a nuestros socios acceso a tarifas exclusivas y experiencias inolvidables en el Hotel Seadust y en una amplia variedad de destinos alrededor del mundo, gracias a nuestras alianzas estratégicas.
            </p>
          </CardBody>
        </Card>

        <Card className="flex flex-col">
          <Image
            src="/login/03.jpg"
            alt="Luxury hotel room interior"
            width={400}
            height={300}
            className="object-cover w-full h-48 rounded-t-lg"
          />
          <CardHeader className="grid grid-cols-1">
            <h1 className="font-semibold text-2xl">Nuestro Compromiso</h1>
            <p  className="font-medium">Experiencias personalizadas y excepcionales</p>
          </CardHeader>
          <CardBody className="flex-grow">
            <p className="text-muted-foreground mb-4">
              Nos especializamos en diseñar experiencias de viaje personalizadas y excepcionales que no solo cumplen con las expectativas de nuestros socios, sino que las superan, convirtiéndonos en una parte esencial de sus aventuras.
            </p>
            <p className="text-muted-foreground">
              Nuestro compromiso es asegurar que cada viaje sea memorable, único y enriquecedor, creando momentos que atesorarán para siempre.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <div className="md:flex">
          <Image
            src="/login/05.jpg"
            alt="Luxury travel experience"
            width={600}
            height={400}
            className="object-cover w-full md:w-1/2 h-64 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
          <div className="flex flex-col flex-grow">
            <CardHeader className="grid grid-cols-1">
              <h1 className="font-semibold text-2xl">Experiencias</h1>
              <p  className="font-medium">Momentos inolvidables para nuestros socios</p>
            </CardHeader>
            <CardBody className="flex-grow">
              <p className="text-muted-foreground mb-4">
                Como socio de Infinity Luxury Travel, tendrás acceso a experiencias de viaje exclusivas, diseñadas para crear momentos inolvidables. Disfruta de hospedajes de lujo en todo el mundo, con beneficios preferenciales que incluyen mejoras en habitaciones, actividades personalizadas, y tarifas especiales en tours y excursiones.
              </p>
              <Divider className="my-4" />
              <p className="text-muted-foreground">
                Gracias a nuestras alianzas estratégicas, podrás explorar destinos de playa, montaña, ciudades cosmopolitas y centros culturales con un toque único y servicios a la medida. Nos dedicamos a adaptar cada experiencia a tus preferencias, asegurando que cada viaje sea un recuerdo que atesorarás para siempre.
              </p>
            </CardBody>
          </div>
        </div>
      </Card>
    </div>
  );
}