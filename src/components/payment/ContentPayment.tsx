"use client";

import {  Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { IoBagCheckOutline, IoCardOutline } from "react-icons/io5";

export const ContentPayment = () => {
  return (
    <>
      <Card className="shadow-small ">
        <CardHeader>
          <IoCardOutline size={24} />
          Metodo de pago
        </CardHeader>
        <CardBody>
          <form className="mt-4 space-y-4">
            <div>
              <label htmlFor="cardNumber">Numero de tarjeta</label>
              <Input id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
            </div>
            <div>
              <label htmlFor="cardHolder">Nombre del propietario</label>
              <Input id="cardHolder" placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expirationDate">Fecha de expiracion</label>
                <Input id="expirationDate" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvv">CVV/CVC</label>
                <Input id="cvv" placeholder="***" type="password" />
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <IoBagCheckOutline className="h-4 w-4 mr-1" />
              Su transacción está segura con encriptación SSL
            </div>
            
          </form>
        </CardBody>
      </Card>
    </>
  );
};
