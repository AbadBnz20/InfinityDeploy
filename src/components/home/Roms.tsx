export const Roms = () => {

  const language = 'es';

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gold-500">
          Suite Presidencial
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name:
                language === "es" ? "Suite Presidencial" : "Presidential Suite",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              name: language === "es" ? "Villa Overwater" : "Overwater Villa",
              image: "/placeholder.svg?height=400&width=600",
            },
            {
              name:
                language === "es" ? "Penthouse Skyline" : "Skyline Penthouse",
              image: "/placeholder.svg?height=400&width=600",
            },
          ].map((room, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src='https://images.rosewoodhotels.com/is/image/rwhg/oceanview-king-junior-suite-ovk:WIDE-LARGE-16-9'
                alt={room.name}
                className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
              />
              <div className="p-6 bg-gray-900">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {room.name}
                </h3>
                <button
                //   variant="outline"
                  className="mt-4 text-gold-500 border-gold-500 hover:bg-gold-500 hover:text-black"
                >
                  Explorar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
