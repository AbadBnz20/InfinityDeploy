import { Destination } from '@/interfaces/Destination';
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form';
interface Props {
  
    setValue:UseFormSetValue<Destination>;
  }
export const SelectGuest = ({setValue}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState<{ adults: number; children: number[] }[]>([
    { adults: 1, children: [] },
  ]);
  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: [] }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const newRooms = rooms.filter((_, i) => i !== index);
      setRooms(newRooms);
    }
  };

  const updateRoom = (index: number, field: 'adults' | 'children', value: number): void => {
    const newRooms = [...rooms];

    if (field === 'children') {
      // Actualiza el array de children
      if (value > newRooms[index].children.length) {
        // Agrega niños al array si value es mayor
        newRooms[index].children.push(...Array(value - newRooms[index].children.length).fill(1));
      } else if (value < newRooms[index].children.length) {
        // Elimina niños del array si value es menor
        newRooms[index].children = newRooms[index].children.slice(0, value);
      }
    } else {
      newRooms[index][field] = value; // Actualiza el número de adultos
    }

    setRooms(newRooms);
  };

  const getSummary = () => {
    setValue('guest',rooms);
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce((sum, room) => sum + room.children.length, 0);
    return `${totalRooms} Habitación${totalRooms > 1 ? 'es' : ''}, ${totalAdults} adulto${totalAdults > 1 ? 's' : ''}, ${totalChildren} niño${totalChildren > 1 ? 's' : ''}`;
  };

  return (
    <div className="relative w-full max-w-sm">
      <Button
        variant="solid"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between bg-white  dark:bg-[#27272a]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getSummary()}
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-4 bg-white border rounded-md shadow-lg z-10">
          {rooms.map((room, index) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-b-0 relative">
              <h3 className="font-semibold mb-2 text-gray-900">Habitación {index + 1}</h3>
              {rooms.length > 1 && (
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  className="absolute top-0 right-0"
                  onClick={() => removeRoom(index)}
                >
                  X
                </Button>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className='text-gray-900'>Adultos</span>
                <div className="flex items-center">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    onClick={() => updateRoom(index, 'adults', Math.max(1, room.adults - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-2">{room.adults}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    onClick={() => updateRoom(index, 'adults', room.adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className='text-gray-900'>Niños</span>
                <div className="flex items-center">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    onClick={() => updateRoom(index, 'children', Math.max(0, room.children.length - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-2">{room.children.length}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    onClick={() => updateRoom(index, 'children', room.children.length + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addRoom} className="w-full bg-gray-900 text-white">
            Añadir habitación
          </Button>
          <Button onClick={() => setIsOpen(false)} className="w-full mt-2 bg-gray-900 text-white">
            Aceptar
          </Button>
        </div>
      )}
    </div>
  );
};
