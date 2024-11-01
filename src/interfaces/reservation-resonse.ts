export interface ReservationResonse {
    data: Data;
    meta: any;
}

export interface Data {
    id:                  number;
    documentId:          string;
    Fecha_Inicio:        Date;
    Fecha_Final:         Date;
    Numero_Habitaciones: number;
    Numero_Ninos:        number;
    Numero_Adultos:      number;
    Destino:             string;
    Precio:              number;
    Sub_Total:           number;
    Descuento:           number;
    Total:               number;
    createdAt:           Date;
    updatedAt:           Date;
    publishedAt:         Date;
    locale:              null;
    nombre_habitacion:   string;
    hotel:               string;
}

