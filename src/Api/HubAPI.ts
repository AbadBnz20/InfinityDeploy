
'use server';
import axios from 'axios';

const GeoApi = axios.create({
  baseURL: `https://${process.env.RAPIDAPI_URL}/v1/geo`,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY || '', 
    'x-rapidapi-host': process.env.RAPIDAPI_URL || '',
  },
});

export { GeoApi };

