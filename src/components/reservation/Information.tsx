"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { IoBagCheckOutline, IoCardOutline } from "react-icons/io5";

export const Information = () => {
  return (
    <div className="md:col-span-2 space-y-6">
     

      <div>
        <div>
          <div>
            <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
              1
            </span>
            Payment methods
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <label htmlFor="credit" className="flex items-center mt-2">
              <span className="mr-2 ">Credit / debit</span>
              <IoCardOutline className="h-6 w-6 text-blue-900" />
            </label>
          </div>
          <form className="mt-4 space-y-4">
            <div>
              <Input
                id="cardNumber"
                size="sm"
                label="Card number"
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </div>
            <div>
              <Input id="firstName" size='sm' label="Card holder"  placeholder="Enter your Card holder" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
               
                <Input id="firstName" size='sm' label="Expiration date"  placeholder="MM/YY" />
              </div>
              <div>
                <Input id="firstName" type="password" size='sm' label="CVV / CVC"  placeholder="***" />

              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <IoBagCheckOutline className="h-4 w-4 mr-1" />
              Your transaction is secured with SSL encryption
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
