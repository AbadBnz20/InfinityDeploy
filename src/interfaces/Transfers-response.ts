export interface Car{
    carId: string,
    model:string,
    plate: string,
    ability: number,
    image: string,
    description: string,
    transferprice: number,
    state: boolean,
    type: string,
    brand: string,
    color: string,
  }


export interface Transfer {
    going: Car[],
    return: Car[] | null
}



export interface Destination {
  origindestinationId: string;
  name: string;
}




export interface DetailsDestination {
  origin:string;
  destination:string;
  car:Car | null;
}