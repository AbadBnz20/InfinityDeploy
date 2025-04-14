import { Car as CardProps } from "@/interfaces/Transfers-response";
import { TransfersStore } from "@/store/TransfersStore";
import { Button, Card, CardBody, Selection } from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";


interface Props{
  item:CardProps;
  selected:Dispatch<SetStateAction<Selection>>
  updatetId:(id:string)=>void;
  idSelected:string| null;
}
export const Car = ({item,selected,updatetId,idSelected}:Props) => {
  const {selected:select}=TransfersStore();
 
  const onChange = (id:string)=>{
    updatetId(id);
    if (select === "Ida y vuelta") {
      selected(new Set(["2"]))
    }
  
  }

  return (
    <Card  className={`overflow-hidden shadow-sm ${idSelected === item.carId ? "border-2 border-primary" : ""}`}>
      <div className="grid md:grid-cols-[300px,1fr,200px] gap-4">
        <div className="relative h-[100%] md:h-full">
         <img
            src={item.image}
            className="w-full max-h-[240px] object-cover"
          />
        </div>

        <CardBody className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{item.brand} {item.model}</h2>
              <p className="text-muted-foreground">{item.type}</p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              {/* <span>Tiempo máximo de espera: 20 minutos</span> */}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Espesificaciones del vehículo: 
              </p>
              <ul className="text-sm text-muted-foreground">
                <li>• Capacidad maxima: 1-{item.ability} pasajeros</li>
                <li>• Color: {item.color}</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                
              </p>
            </div>
            {/* <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
               Descripcion : {item.description}
              </p>
            </div> */}
          </div>
        </CardBody>

        <div className="p-6 flex flex-col justify-between border-t md:border-l md:border-t-0">
          <div className="text-center">
            {/* <div className="text-2xl font-bold">{item.transferprice} MXN</div> */}
            {/* <div className="text-sm text-primary">245 Puntos</div> */}
            {/* <div className="text-sm text-muted-foreground">Precio total</div> */}
          </div>
          <Button onPress={()=>onChange(item.carId)} className="w-full" size="lg">
            Seleccionar
          </Button>
        </div>
      </div>
    </Card>
  );
};
