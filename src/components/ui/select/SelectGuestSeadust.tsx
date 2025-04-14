import { DestinationSeadust } from '@/components/home/Seadust';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
    setValue:UseFormSetValue<DestinationSeadust>;
  }
export const SelectGuestSeadust = ({setValue}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("Filter");

  const [rooms, setRooms] = useState<{ adults: number; children: number[] }[]>([
    { adults: 1, children: [] },
  ]);
  // const addRoom = () => {
  //   setRooms([...rooms, { adults: 1, children: [] }]);
  // };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const newRooms = rooms.filter((_, i) => i !== index);
      setRooms(newRooms);
    }
  };
//   useEffect(() => {
//     if (value.length >0) {
//       setRooms(value);
//     }
//   }, [value])
  

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
    <div className="relative w-full ">
      <Button
        variant="solid"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between bg-[#f4f4f5]  dark:bg-[#27272a]"
        onPress={() => setIsOpen(!isOpen)}
      >
        {getSummary()}
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-4 bg-white border rounded-md shadow-lg z-5">
          {rooms.map((room, index) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-b-0 relative">
              <h3 className="font-semibold mb-2 text-gray-900">{t('room.subtitle')} {index + 1}</h3>
              {rooms.length > 1 && (
                <Button
                  size="sm"
                  isIconOnly
                  variant="light"
                  className="absolute top-0 right-0"
                  onClick={() => removeRoom(index)}
                >
                  <IoCloseOutline color='black' />
                </Button>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className='text-gray-900'>{t('room.option1')}</span>
                <div className="flex items-center text-black">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                    className='text-black'
                    onClick={() => updateRoom(index, 'adults', Math.max(1, room.adults - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-2 text-black">{room.adults}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                      className='text-black'
                    onClick={() => updateRoom(index, 'adults', room.adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className='text-gray-900'>{t('room.option2')}</span>
                <div className="flex items-center">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                      className='text-black'
                    onPress={() => updateRoom(index, 'children', Math.max(0, room.children.length - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-2 text-black">{room.children.length}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="bordered"
                      className='text-black'
                      onPress={() => updateRoom(index, 'children', room.children.length + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* <Button onPress={addRoom} className="w-full bg-gray-900 text-white">
          {t('room.button1')}
          </Button> */}
          <Button onPress={() => setIsOpen(false)} className="w-full mt-2 bg-gray-900 text-white">
          {t('room.button2')}

          </Button>
        </div>
      )}
    </div>
  );
}
