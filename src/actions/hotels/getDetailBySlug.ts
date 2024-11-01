'use server';

import { HotelsApi } from "@/Api/Hotels";
import {  DetailsResponse } from "@/interfaces/details-response";

export const getDetailBySlug = async (slug: string)  =>{
    try {

        const hotel = await HotelsApi.post<DetailsResponse>('/hotel/info/',{
            id:slug,
            language: "es"
          });
          return hotel.data.data;

    } catch (error) {
      console.log(error)

        throw new Error('Error al obtener hotel por slug');
        
    }
}